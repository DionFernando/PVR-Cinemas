import { Tabs } from 'expo-router';
import { Film, TicketCheck, User2 } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffcc00',
        tabBarStyle: { backgroundColor: '#111' },
      }}
    >
      <Tabs.Screen
        name="movies/index"
        options={{
          title: 'Movies',
          tabBarIcon: ({ color, size }) => <Film color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="bookings/index"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color, size }) => <TicketCheck color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User2 color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
