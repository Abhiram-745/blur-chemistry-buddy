import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Environment check - helps debug if env vars aren't loaded after revert
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
  console.error("⚠️ Supabase environment variables not loaded. Rebuild in progress...");
}

createRoot(document.getElementById("root")!).render(<App />);
