import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BlogPosts from './components/BlogPosts';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Posts">
          <Stack.Screen name="Posts" component={BlogPosts} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}






