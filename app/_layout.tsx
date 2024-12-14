import React from 'react';
import {Stack} from 'expo-router';
import { SessionContextProvider,useSessionContext } from '@/components/sessionContext'; // Adjust the path accordingly
import { supabase } from '@/lib/supabase'; // Path to your supabase client
import { ActivityIndicator, View,Text } from 'react-native';

export default function RootLayout() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
    <Stack
      initialRouteName="index"
    >
    <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(doctor)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(patient)"
        options={{ headerShown: false }}
      />
    </Stack>
    </SessionContextProvider>
  );
}
