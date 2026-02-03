import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export interface GameResult {
  id: string;
  userId?: string;
  playerName: string;
  avatarUrl?: string | null;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  maxStreak: number;
  mode: "25" | "50";
  date: string;
  timestamp: number;
  isGuest?: boolean;
}

export interface SaveResultInput {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  maxStreak: number;
  mode: "25" | "50";
}

export interface SaveResultResponse {
  saved: boolean;
  isGuest?: boolean;
  rank?: number;
}

const MAX_LEADERBOARD_ENTRIES = 50;

function normalizeResult(
  raw: any,
  locale: string,
  fallbackName: string
): GameResult {
  const createdAt = raw.createdAt ? new Date(raw.createdAt) : new Date();
  return {
    id: raw.id,
    userId: raw.userId,
    playerName: raw.playerName || fallbackName,
    avatarUrl: raw.avatarUrl,
    score: raw.score,
    correctAnswers: raw.correctAnswers,
    totalQuestions: raw.totalQuestions,
    percentage: raw.percentage,
    maxStreak: raw.maxStreak,
    mode: raw.mode,
    date: createdAt.toLocaleDateString(locale),
    timestamp: createdAt.getTime(),
  };
}

export function useLeaderboard() {
  const { user, status } = useAuth();
  const { language, t } = useLanguage();
  const locale = language === "az" ? "az-AZ" : "ru-RU";

  const [leaderboard, setLeaderboard] = useState<GameResult[]>([]);
  const [serverHistory, setServerHistory] = useState<GameResult[]>([]);
  const [guestResults, setGuestResults] = useLocalStorage<GameResult[]>(
    "guest_results",
    []
  );
  const [playerName, setPlayerName] = useLocalStorage<string>("player_name", "");

  const wsRef = useRef<WebSocket | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    const res = await fetch("/api/leaderboard?limit=50");
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data?.results)) {
      setLeaderboard(
        data.results.map((result: any) =>
          normalizeResult(result, locale, t.authGuest)
        )
      );
    }
  }, [locale, t.authGuest]);

  const fetchHistory = useCallback(async () => {
    if (!user) return;
    const res = await fetch("/api/history");
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data?.results)) {
      setServerHistory(
        data.results.map((result: any) =>
          normalizeResult(result, locale, t.authGuest)
        )
      );
    }
  }, [user, locale, t.authGuest]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchHistory();
    } else {
      setServerHistory([]);
    }
  }, [status, fetchHistory]);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(
      `${protocol}://${window.location.host}/ws/leaderboard`
    );
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message?.type === "leaderboard" && Array.isArray(message.results)) {
          setLeaderboard(
            message.results.map((result: any) =>
              normalizeResult(result, locale, t.authGuest)
            )
          );
        }
      } catch {
        // ignore malformed messages
      }
    };

    return () => {
      ws.close();
    };
  }, [locale, t.authGuest]);

  const getTopResults = useCallback(
    (count: number = 10): GameResult[] => leaderboard.slice(0, count),
    [leaderboard]
  );

  const getPlayerHistory = useCallback((): GameResult[] => {
    if (status === "authenticated") {
      return serverHistory;
    }
    return guestResults;
  }, [status, serverHistory, guestResults]);

  const saveResult = useCallback(
    async (result: SaveResultInput): Promise<SaveResultResponse> => {
      if (status === "authenticated" && user) {
        const res = await fetch("/api/results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
        });
        if (!res.ok) {
          return { saved: false };
        }
        const data = await res.json();
        await fetchHistory();
        return { saved: true, rank: data?.rank };
      }

      const newResult: GameResult = {
        id: crypto.randomUUID(),
        playerName: playerName || t.authGuest,
        score: result.score,
        correctAnswers: result.correctAnswers,
        totalQuestions: result.totalQuestions,
        percentage: result.percentage,
        maxStreak: result.maxStreak,
        mode: result.mode,
        date: new Date().toLocaleDateString(locale),
        timestamp: Date.now(),
        isGuest: true,
      };

      setGuestResults((prev) => {
        const updated = [newResult, ...prev]
          .sort((a, b) => b.score - a.score)
          .slice(0, MAX_LEADERBOARD_ENTRIES);
        return updated;
      });

      return { saved: true, isGuest: true };
    },
    [status, user, fetchHistory, playerName, t.authGuest, locale, setGuestResults]
  );

  const clearGuestHistory = useCallback(() => {
    setGuestResults([]);
  }, [setGuestResults]);

  const getRank = useCallback(
    (score: number): number => {
      const position = leaderboard.findIndex((r) => r.score < score);
      return position === -1 ? leaderboard.length + 1 : position + 1;
    },
    [leaderboard]
  );

  const updatePlayerName = useCallback(
    (name: string) => {
      setPlayerName(name.trim() || t.authGuest);
    },
    [setPlayerName, t.authGuest]
  );

  return {
    leaderboard,
    playerName,
    addResult: saveResult,
    saveResult,
    getTopResults,
    getPlayerHistory,
    clearGuestHistory,
    getRank,
    updatePlayerName,
  };
}
