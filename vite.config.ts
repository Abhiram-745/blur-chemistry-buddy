import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

  // https://vitejs.dev/config/
  export default defineConfig(({ mode }) => ({
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Ensure env vars exist even after history reverts or cache issues
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || 'https://nmoswypnhnidfrqduyfd.supabase.co'),
      'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify(process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tb3N3eXBuaG5pZGZycWR1eWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MzYyNzIsImV4cCI6MjA3NjMxMjI3Mn0.WHzhfZyYjyCSlQz4FJAHh5_13Io93qPCqM-Ot-8cdpU'),
    }
  }));
