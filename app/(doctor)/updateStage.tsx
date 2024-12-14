// import PatientDetails from '@/old/doctor/paitent/[id]';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from 'expo-router';
const updateStage = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>Update Stage</Text>
      <Button title="Go to Doctor" onPress={() => {navigation.navigate('dashboard')}} />
    </View>
  );
};

export default updateStage;
