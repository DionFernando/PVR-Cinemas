import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#ffcc00',
        headerTitleStyle: { fontWeight: '700' },
      }}
    />
  );
}
