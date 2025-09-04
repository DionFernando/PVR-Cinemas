import { View, Text, Pressable } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function Dashboard() {
  return (
    <View className="flex-1 bg-black items-center justify-center px-6">
      <Text className="text-white text-2xl font-bold">Welcome to PVR Cinemas 🎬</Text>
      <Text className="text-zinc-400 mt-2">You are signed in.</Text>

      <Pressable
        className="mt-8 rounded-full bg-brand-400 px-5 py-3"
        onPress={() => signOut(auth)}
      >
        <Text className="text-black font-semibold">Sign out</Text>
      </Pressable>
    </View>
  );
}
