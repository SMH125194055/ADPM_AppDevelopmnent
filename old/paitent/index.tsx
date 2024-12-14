import { useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function PatientDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Dashboard</Text>
      {/* <Button title="Upload Image" onPress={() => router.push('/patient/upload')} /> */}
      {/* <Button title="View History" onPress={() => router.push('/patient/history')} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
