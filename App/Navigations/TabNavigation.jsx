import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Color from "../Utils/Color";
import HomeScreenNavigation from "./HomeScreenNavigation";
import BookingScreenNavigation from "./BookingScreenNavigation";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Color.PRIMARY,
      }}
    >
      <Tab.Screen
        name="home-nav"
        component={HomeScreenNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{color : color, fontSize: 14, marginTop: -9 }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="booking-nav"
        component={BookingScreenNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 14, marginTop: -9 }}>
              Booking
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile-nav"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 14, marginTop: -9 }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
