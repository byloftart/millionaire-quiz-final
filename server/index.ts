import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer, type WebSocket } from "ws";
import { Pool } from "pg";
import { ExpressAuth, getSession } from "@auth/express";
import Google from "@auth/core/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_SSL === "true"
      ? { rejectUnauthorized: false }
      : undefined,
});

const authConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  adapter: PostgresAdapter(pool),
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    session: async ({ session, user }: any) => {
      if (session?.user && user?.id) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

async function resolveUserId(user?: SessionUser | null) {
  if (!user) return null;
  if (user.id) return user.id;
  if (user.email) {
    const { rows } = await pool.query(`SELECT id FROM users WHERE email = $1`, [
      user.email,
    ]);
    return rows[0]?.id ?? null;
  }
  return null;
}

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      "emailVerified" TIMESTAMPTZ,
      image TEXT
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type TEXT NOT NULL,
      provider TEXT NOT NULL,
      "providerAccountId" TEXT NOT NULL,
      refresh_token TEXT,
      access_token TEXT,
      expires_at INTEGER,
      token_type TEXT,
      scope TEXT,
      id_token TEXT,
      session_state TEXT
    );
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS accounts_user_id_idx ON accounts("userId");
  `);
  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS accounts_provider_idx
      ON accounts(provider, "providerAccountId");
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      "sessionToken" TEXT NOT NULL UNIQUE,
      "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires TIMESTAMPTZ NOT NULL
    );
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions("userId");
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS verification_tokens (
      identifier TEXT NOT NULL,
      token TEXT NOT NULL,
      expires TIMESTAMPTZ NOT NULL,
      PRIMARY KEY (identifier, token)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS game_results (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      score INTEGER NOT NULL,
      correct_answers INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      percentage INTEGER NOT NULL,
      max_streak INTEGER NOT NULL,
      mode VARCHAR(2) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS game_results_score_idx
      ON game_results(score DESC, created_at DESC);
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS game_results_user_idx
      ON game_results(user_id, created_at DESC);
  `);
}

async function getLeaderboard(limit: number) {
  const { rows } = await pool.query(
    `
    SELECT
      gr.id,
      gr.user_id AS "userId",
      gr.score,
      gr.correct_answers AS "correctAnswers",
      gr.total_questions AS "totalQuestions",
      gr.percentage,
      gr.max_streak AS "maxStreak",
      gr.mode,
      gr.created_at AS "createdAt",
      u.name AS "playerName",
      u.image AS "avatarUrl"
    FROM game_results gr
    JOIN users u ON u.id = gr.user_id
    ORDER BY gr.score DESC, gr.created_at DESC
    LIMIT $1
  `,
    [limit]
  );
  return rows;
}

async function getHistory(userId: string, limit: number) {
  const { rows } = await pool.query(
    `
    SELECT
      gr.id,
      gr.user_id AS "userId",
      gr.score,
      gr.correct_answers AS "correctAnswers",
      gr.total_questions AS "totalQuestions",
      gr.percentage,
      gr.max_streak AS "maxStreak",
      gr.mode,
      gr.created_at AS "createdAt",
      u.name AS "playerName",
      u.image AS "avatarUrl"
    FROM game_results gr
    JOIN users u ON u.id = gr.user_id
    WHERE gr.user_id = $1
    ORDER BY gr.created_at DESC
    LIMIT $2
  `,
    [userId, limit]
  );
  return rows;
}

async function getRank(score: number) {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int + 1 AS rank FROM game_results WHERE score > $1`,
    [score]
  );
  return rows[0]?.rank ?? 1;
}

async function startServer() {
  await ensureSchema();

  const app = express();
  const server = createServer(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.post("/api/auth/login", (req, res) => {
    res.json({ url: "/api/auth/signin/google" });
  });

  app.get("/api/auth/callback", (req, res) => {
    res.redirect("/api/auth/callback/google");
  });

  app.use("/api/auth", ExpressAuth(authConfig));

  app.get("/api/me", async (req, res) => {
    const session = await getSession(req as any, authConfig as any);
    if (!session?.user) {
      res.status(401).json({ user: null });
      return;
    }
    const user = session.user as SessionUser;
    const userId = await resolveUserId(user);
    res.json({ user: { ...user, id: userId } });
  });

  app.get("/api/leaderboard", async (req, res) => {
    const limit = Number(req.query.limit) || 50;
    const results = await getLeaderboard(Math.min(limit, 50));
    res.json({ results });
  });

  app.get("/api/history", async (req, res) => {
    const session = await getSession(req as any, authConfig as any);
    const userId = await resolveUserId(session?.user as SessionUser);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const results = await getHistory(userId, 50);
    res.json({ results });
  });

  app.post("/api/results", async (req, res) => {
    const session = await getSession(req as any, authConfig as any);
    const userId = await resolveUserId(session?.user as SessionUser);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const {
      score,
      correctAnswers,
      totalQuestions,
      percentage,
      maxStreak,
      mode,
    } = req.body ?? {};

    if (
      typeof score !== "number" ||
      typeof correctAnswers !== "number" ||
      typeof totalQuestions !== "number" ||
      typeof maxStreak !== "number" ||
      (mode !== "25" && mode !== "50")
    ) {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }

    const computedPercentage =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : percentage ?? 0;

    const id = crypto.randomUUID();
    await pool.query(
      `
      INSERT INTO game_results (
        id,
        user_id,
        score,
        correct_answers,
        total_questions,
        percentage,
        max_streak,
        mode
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
      [
        id,
        userId,
        score,
        correctAnswers,
        totalQuestions,
        computedPercentage,
        maxStreak,
        mode,
      ]
    );

    const rank = await getRank(score);
    const leaderboard = await getLeaderboard(50);
    broadcastLeaderboard(leaderboard);

    res.json({ id, rank });
  });

  const wss = new WebSocketServer({ server, path: "/ws/leaderboard" });

  const broadcastLeaderboard = (results: any[]) => {
    const payload = JSON.stringify({ type: "leaderboard", results });
    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === 1) {
        client.send(payload);
      }
    });
  };

  wss.on("connection", async (socket: WebSocket) => {
    const results = await getLeaderboard(50);
    socket.send(JSON.stringify({ type: "leaderboard", results }));
  });

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port =
    process.env.PORT ||
    (process.env.NODE_ENV === "production" ? 3000 : 3001);

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
