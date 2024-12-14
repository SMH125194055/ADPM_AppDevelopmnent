// import PatientDetails from '@/old/doctor/paitent/[id]';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from 'expo-router';
const dashboard = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>Patient Details</Text>
      <Button title="Go to Patients" onPress={() => {navigation.navigate('patients')}} />
      <Button title="Go to Patients Details" onPress={() => {navigation.navigate('patientsDetail')}} />  
    </View>
  );
};

export default dashboard;
