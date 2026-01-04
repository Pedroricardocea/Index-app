import './global.css'; // NativeWind
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckInCard } from './components/CheckInCard';
import { VelocityChart } from './components/VelocityChart';
import { fetchDailyLogs, fetchImpactEvents, calculateVelocity, saveCheckIn } from '@index/logic';
import { BlurView } from 'expo-blur';

// Initialize Supabase (Use your actual Expo Env Vars in production)
// For now we hardcode or grab from process.env if available in Metro
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default function App() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [velocityData, setVelocityData] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoadingData(true);
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
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingData(false);
    }
  };

  const handleRecordingComplete = async () => {
    setStatus("loading");
    try {
      await saveCheckIn(supabase, "Mobile Voice Check-in", "https://example.com/mobile-audio.mp3");
      setStatus("success");
      await loadAnalytics(); // Refresh chart
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      
      {/* Background Gradients */}
      <View className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-[100px]" />
      <View className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-[100px]" />

      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          
          <View className="mt-8 mb-4 items-center">
             <Text className="text-2xl font-bold text-white tracking-wider">INDEX</Text>
             <Text className="text-xs text-white/50 tracking-widest uppercase">Daily Sync</Text>
          </View>

          {/* Visualization */}
          {loadingData ? (
             <View className="h-64 items-center justify-center">
               <ActivityIndicator color="#60A5FA" />
             </View>
          ) : (
            <VelocityChart data={velocityData} />
          )}

          {/* Interactive Card */}
          <View className="mt-8 px-4">
            <CheckInCard 
              onRecordingComplete={handleRecordingComplete}
            />
          </View>

          {/* Status Feedback */}
          {status === 'loading' && (
            <Text className="mt-4 text-center text-blue-400">Syncing...</Text>
          )}
          {status === 'success' && (
            <Text className="mt-4 text-center text-green-400">Synced!</Text>
          )}

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

