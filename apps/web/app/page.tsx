"use client";

import { useState, useEffect } from "react";
import { CheckInCard } from "@index/ui-shared";
import { VelocityChart } from "@/components/VelocityChart";
import { createBrowserClient } from "@supabase/ssr";
import { saveCheckIn, fetchDailyLogs, fetchImpactEvents, calculateVelocity } from "@index/logic";

export default function Home() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [velocityData, setVelocityData] = useState<any[]>([]);

  // Initialize Supabase Client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const [logs, events] = await Promise.all([
          fetchDailyLogs(supabase),
          fetchImpactEvents(supabase)
        ]);

        const chartData = logs.map(log => {
          const logEvents = events.filter(e => e.log_id === log.id);
          const velocity = calculateVelocity(log, logEvents);
          return {
            date: log.date,
            velocity,
            sentiment: log.sentiment_score,
          };
        });

        setVelocityData(chartData);
      } catch (err) {
        console.error("Failed to load analytics data:", err);
      }
    };

    loadData();
  }, [supabase]);

  const handleRecordingComplete = async () => {
    setStatus("loading");
    setErrorMessage("");
    try {
      // Logic from `packages/logic`
      // Note: This requires the user to be authenticated.
      // If no user is logged in, saveCheckIn will throw "User not authenticated".
      await saveCheckIn(supabase, "Check-in via Voice UI", "https://example.com/audio.mp3");
      setStatus("success");
      
      // Refresh chart
      const [logs, events] = await Promise.all([
          fetchDailyLogs(supabase),
          fetchImpactEvents(supabase)
      ]);
      const chartData = logs.map(log => {
          const logEvents = events.filter(e => e.log_id === log.id);
          const velocity = calculateVelocity(log, logEvents);
          return {
            date: log.date,
            velocity,
            sentiment: log.sentiment_score,
          };
      });
      setVelocityData(chartData);

    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Failed to save check-in.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 space-y-8">
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-[100px]" />
      </div>

      <div className="z-10 w-full max-w-4xl space-y-8 flex flex-col items-center">
        {/* Analytics Section */}
        <div className="w-full">
          <VelocityChart data={velocityData} />
        </div>

        {/* Check-In Section */}
        <div className="w-full max-w-md space-y-4">
          <CheckInCard 
            onRecordingComplete={handleRecordingComplete} 
            className={status === "loading" ? "opacity-50 pointer-events-none transition-opacity" : ""}
          />

          {/* Status Feedback */}
          {status === "loading" && (
            <p className="text-center text-blue-400 animate-pulse">Syncing with Neural Core...</p>
          )}
          {status === "success" && (
            <p className="text-center text-green-400">Check-in logged successfully!</p>
          )}
          {status === "error" && (
            <div className="rounded-lg bg-red-900/20 p-4 text-center border border-red-500/50">
              <p className="text-red-400 font-semibold">Connection Error</p>
              <p className="text-red-300/80 text-sm">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
