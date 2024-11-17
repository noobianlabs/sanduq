import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import SanduqDetailsScreen from './src/screens/SanduqDetailsScreen';
import CreateSanduqScreen from './src/screens/CreateSanduqScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Sanduq App' }} />
          <Stack.Screen name="SanduqDetails" component={SanduqDetailsScreen} options={{ title: 'Sanduq Details' }} />
          <Stack.Screen name="CreateSanduq" component={CreateSanduqScreen} options={{ title: 'Create New Sanduq' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}