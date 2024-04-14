import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BusinessByCategoryScreen from '../Screens/BusinessByCategoryScreen/BusinessByCategoryScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BusinessDetailScreen from '../Screens/BusinessDetailScreen/BusinessDetailScreen';

const Stack = createStackNavigator();
export default function HomeScreenNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Color.PRIMARY,
            }}
        >
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="business-by-category" component={BusinessByCategoryScreen} />
          <Stack.Screen name="business-detail" component={BusinessDetailScreen} />
        </Stack.Navigator>
      );
}