import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BusinessDetailScreen from '../Screens/BusinessDetailScreen/BusinessDetailScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';

const Stack = createStackNavigator();
export default function BookingScreenNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Color.PRIMARY,
            }}
        >
          <Stack.Screen name="booking" component={BookingScreen} />
          <Stack.Screen name="business-detail" component={BusinessDetailScreen} />
        </Stack.Navigator>
      );
}