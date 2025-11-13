//App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ManageMenuScreen from './screens/ManageMenuScreen';
import GuestMenuScreen from './screens/GuestMenuScreen';
import { MenuProvider } from './context/MenuContext'; // <-- ADD THIS

const Stack = createStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Christoffel’s Menu" }} />
          <Stack.Screen name="ManageMenu" component={ManageMenuScreen} options={{ title: "Manage Menu" }} />
          <Stack.Screen name="GuestView" component={GuestMenuScreen} options={{ title: "Guest Menu" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}