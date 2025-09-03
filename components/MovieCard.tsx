import { View, Text, Pressable, Image } from 'react-native';

export default function MovieCard() {
  return (
    <Pressable className="mt-4 rounded-2xl bg-zinc-900 p-4">
      <View className="flex-row gap-3">
        <Image source={{ uri: 'https://via.placeholder.com/100x150' }} className="h-40 w-28 rounded-lg" />
        <View className="flex-1">
          <Text className="text-white text-lg font-semibold">Sample Movie</Text>
          <Text className="text-zinc-400 mt-1">Action • 2h 10m</Text>
          <Pressable className="mt-auto rounded-full bg-brand-400 px-4 py-2 self-start">
            <Text className="text-black font-semibold">Book</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
