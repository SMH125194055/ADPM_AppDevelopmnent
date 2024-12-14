import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { supabase } from '@/lib/supabase';
import { Button } from '@rneui/themed';
import { useNavigation } from 'expo-router';

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error.message);
        Alert.alert('Error', 'Failed to log out. Please try again.');
      } else {
        Alert.alert('Success', 'You have been logged out.');
        navigation.navigate('index'); // Redirect to the login screen or index page
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>
      {/* Add other settings options here */}
      <Button 
        title="Logout" 
        onPress={handleLogout} 
        buttonStyle={styles.logoutButton} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  logoutButton: { backgroundColor: '#d9534f', paddingHorizontal: 20 },
});
