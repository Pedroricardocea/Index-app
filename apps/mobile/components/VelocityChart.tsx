import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { BlurView } from 'expo-blur';
import { cssInterop } from 'nativewind';

cssInterop(BlurView, {
  className: 'style',
});

interface VelocityDataPoint {
  date: string;
  velocity: number;
  sentiment: number;
}

interface VelocityChartProps {
  data: VelocityDataPoint[];
}

export const VelocityChart: React.FC<VelocityChartProps> = ({ data }) => {
  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: '#1E293B',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#1E293B',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(96, 165, 250, ${opacity})`, // blue-400
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: '4',
      strokeWidth: '0',
      stroke: '#60A5FA',
    },
    decimalPlaces: 0,
  };

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;

    // Take last 7 days or all data if less
    const recentData = data.slice(-7);

    return {
      labels: recentData.map((d) => {
        const date = new Date(d.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }),
      datasets: [
        {
          data: recentData.map((d) => d.velocity),
          color: (opacity = 1) => `rgba(96, 165, 250, ${opacity})`, // blue-400
        },
      ],
    };
  }, [data]);

  if (!chartData) {
    return (
      <View className="mx-4 mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 items-center justify-center h-64">
        <Text className="text-white/40">Not enough data</Text>
      </View>
    );
  }

  return (
    <View className="mx-4 mt-8 overflow-hidden rounded-3xl border border-white/10">
      <BlurView intensity={20} tint="dark" className="p-4">
        <View className="mb-4 px-2">
          <Text className="text-lg font-semibold text-white/90">Velocity Field</Text>
          <Text className="text-xs text-white/50">Momentum over time</Text>
        </View>

        <LineChart
          data={chartData}
          width={screenWidth - 64} // Full width minus margins/padding
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={true}
          yAxisInterval={1}
        />
      </BlurView>
    </View>
  );
};
