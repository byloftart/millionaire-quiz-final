import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

function initAnalytics() {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID as
    | string
    | undefined;

  if (!endpoint || !websiteId) return;

  const existing = document.querySelector('script[data-website-id]');
  if (existing) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = `${endpoint.replace(/\/$/, "")}/umami`;
  script.dataset.websiteId = websiteId;
  document.head.appendChild(script);
}

initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
