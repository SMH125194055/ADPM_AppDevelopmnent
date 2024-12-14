import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
const upload = () => {
    const navigation = useNavigation();
  const handleUpload = () => {
    // Logic to handle image upload
    navigation.navigate('history'); // Navigate to history screen after upload
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Foot Ulcer Image</Text>
      <Button title="Upload Image" onPress={handleUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default upload;
