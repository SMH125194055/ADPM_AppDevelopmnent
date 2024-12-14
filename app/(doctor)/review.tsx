// import PatientDetails from '@/old/doctor/paitent/[id]';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from 'expo-router';
const Review = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>Review</Text>
      <Button title="Go to Doctor" onPress={() => {navigation.navigate('dashboard')}} />
    </View>
  );
};

export default Review;
