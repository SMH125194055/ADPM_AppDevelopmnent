import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Modal,Button,Alert } from 'react-native';
import { Tabs } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter,useNavigation } from 'expo-router'; // For navigation to Settings page
import {supabase} from '@/lib/supabase';

// Custom Header Component with Three-Dot Menu
const CustomHeader = ({ onMenuPress }: { onMenuPress: () => void }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Patient Dashboard</Text>
    <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
    <FontAwesome6 name="ellipsis-vertical" size={24} color="black" />
    </TouchableOpacity>
  </View>
);


export default function PatientLayout() {
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
      <Tabs initialRouteName="upload">
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
          name="gallery"
          options={{
            tabBarLabel: 'Gallery',
            tabBarIcon: () => <FontAwesome5 name="images" size={24} color="black" />,
            tabBarStyle: { display: 'flex' },
            headerShown: false, // Hide default header
          }}
        />

        <Tabs.Screen
          name="progress"
          options={{
            tabBarLabel: 'Progress',
            tabBarIcon: () => <Octicons name="graph" size={24} color="black" />,
            tabBarStyle: { display: 'flex' },
            headerShown: false, // Hide default header
          }}
        />

        <Tabs.Screen
          name="report"
          options={{
            tabBarLabel: 'Reports',
            tabBarIcon: () => <Ionicons name="documents" size={24} color="black" />,
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
