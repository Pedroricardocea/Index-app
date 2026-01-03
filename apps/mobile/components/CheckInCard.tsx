import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { Mic } from "lucide-react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence 
} from "react-native-reanimated";

interface CheckInCardProps {
  onRecordingComplete: () => void;
}

export const CheckInCard: React.FC<CheckInCardProps> = ({ onRecordingComplete }) => {
  // Animation for the "Ping" effect
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 1000 }),
        withTiming(1, { duration: 0 })
      ),
      -1,
      false
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1000 }),
        withTiming(0.5, { duration: 0 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View className="relative mx-4 overflow-hidden rounded-3xl bg-white/5 shadow-2xl">
      {/* Glassmorphism Background */}
      <BlurView intensity={20} tint="light" className="absolute inset-0" />

      {/* Dynamic Background Glow (Simulated with View) */}
      <View className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl" />
      <View className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-purple-500/20 blur-2xl" />

      <View className="relative z-10 flex flex-col items-center justify-center p-8 space-y-8">
        <View className="items-center space-y-2">
          <Text className="text-3xl font-bold tracking-tight text-white shadow-sm">
            Morning Check-In
          </Text>
          <Text className="text-base text-white/60">
            What's your main focus today?
          </Text>
        </View>

        <TouchableOpacity
          onPress={onRecordingComplete}
          activeOpacity={0.8}
          className="relative flex h-24 w-24 items-center justify-center"
        >
          {/* Animated Ping Ring */}
          <Animated.View 
            className="absolute inset-0 rounded-full bg-blue-500"
            style={animatedStyle}
          />
          
          {/* Main Button Circle */}
          <View className="flex h-full w-full items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-500/50">
            <Mic size={40} color="white" />
          </View>
        </TouchableOpacity>
        
        <Text className="text-sm font-medium text-white/40 pt-4">Tap to Record</Text>
      </View>
    </View>
  );
};
