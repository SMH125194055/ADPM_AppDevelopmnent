import { useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Button title="Go to Signup" onPress={() => router.push('/signup')} />
      <Button title="Patient Dashboard" onPress={() => router.push('/paitent')} />
      <Button title="Doctor Dashboard" onPress={() => router.push('/doctor')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
