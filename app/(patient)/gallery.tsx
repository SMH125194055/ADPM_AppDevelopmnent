import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const history = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploaded Image History</Text>
      <Text>Here you can see the history of your foot ulcer images.</Text>
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

export default history;
