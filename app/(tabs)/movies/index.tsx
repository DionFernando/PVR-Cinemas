import { View, Text, ScrollView } from 'react-native';

export default function MoviesScreen() {
  return (
    <ScrollView className="flex-1 bg-black">
      <View className="p-4">
        <Text className="text-2xl font-bold text-brand-400">Now Showing</Text>
        {/* TODO: <MovieCard /> list here */}
      </View>
    </ScrollView>
  );
}
