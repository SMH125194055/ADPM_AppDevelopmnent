import { supabase } from '@/lib/supabase';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs, useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Custom Header Component with Three-Dot Menu
const CustomHeader = ({ onMenuPress }: { onMenuPress: () => void }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Doctor Dashboard</Text>
    <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
      <FontAwesome6 name="ellipsis-vertical" size={24} color="black" />
    </TouchableOpacity>
  </View>
);

export default function DoctorLayout() {
  const router = useRouter(); // For navigation
  const navigation = useNavigation(); // For navigation
  const [modalVisible, setModalVisible] = useState(false);

  const handleMenuPress = () => {
    setModalVisible(true); // Show the menu when the three-dot button is pressed
  };

  const handleSignOut = async () => {
    try {
      // Add your sign-out logic here (e.g., using Supabase, Firebase, etc.)
      // For now, we simulate it by simply navigating to the login page
      // router.push('/login');
      
            const { error } = await supabase.auth.signOut();
            if (error) {
              console.error('Error signing out:', error.message);
              Alert.alert('Error', 'Failed to log out. Please try again.');
            } else {
              Alert.alert('Success', 'You have been logged out.');
              navigation.navigate('index'); // Redirect to the login screen or index page
            }
      setModalVisible(false); // Close the modal after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSettingsPress = () => {
    router.push('/settings'); // Navigate to the settings page
    setModalVisible(false); // Close the modal after navigating to settings
  };

  return (
    <>
      <CustomHeader onMenuPress={handleMenuPress} />
      <Tabs initialRouteName="dashboard">
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: () => <FontAwesome6 name="user-pen" size={24} color="black" />,
            tabBarStyle: { display: 'flex' },
            headerShown: false, // Hide default header
          }}
        />

        <Tabs.Screen
          name="upload"
          options={{
            tabBarLabel: 'Upload',
            tabBarIcon: () => <Entypo name="camera" size={24} color="black" />,
            tabBarStyle: { display: 'flex' },
            headerShown: false, // Hide default header
          }}
        />

        <Tabs.Screen
          name="review"
          options={{
            tabBarLabel: 'Review',
            tabBarIcon: () => <Entypo name="eye" size={30} color="black" />,
            tabBarStyle: { display: 'flex' },
            headerShown: false, // Hide default header
          }}
        />

        <Tabs.Screen
          name="aiComparision"
          options={{
            tabBarLabel: 'AI Comparison',
            tabBarIcon: () => <MaterialCommunityIcons name="robot" size={24} color="black" />,
            tabBarStyle: { display: 'flex' },
            headerShown: false, // Hide default header
          }}
        />

        <Tabs.Screen
          name="dashboard"
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: () => <MaterialCommunityIcons name="desktop-mac-dashboard" size={24} color="black" />,
            tabBarStyle: { display: 'flex' },
            headerShown: false, // Hide default header
          }}
        />

        <Tabs.Screen
          name="updateStage"
          options={{
            tabBarLabel: 'Update Stage',
            tabBarIcon: () => <FontAwesome name="pencil" size={24} color="black" />,
            tabBarStyle: { display: 'flex' },
            headerShown: false, // Hide default header
          }}
        />
      </Tabs>

      {/* Modal for the menu options */}
      <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Button title="Settings" onPress={handleSettingsPress} />
            <Button title="Sign Out" onPress={handleSignOut} color="red" />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
}

// Custom header styles
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  menuButton: {
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 250,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});
