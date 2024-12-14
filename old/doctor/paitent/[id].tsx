import { useRouter, SearchParams } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function PatientDetails() {
  const router = useRouter();
  const { id } = useSearchParams() as SearchParams;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Details for ID: {id}</Text>
      {/* <Button title="Back to Dashboard" onPress={() => router.push('/doctor')} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
