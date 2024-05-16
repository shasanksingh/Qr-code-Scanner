// ScannerScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ScannerScreen = ({ navigation }) => {
  const handleScan = () => {
    // Implement your scanning logic here
    alert('Scanning...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scan Screen</Text>
      <Button title="Scan" onPress={handleScan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ScannerScreen;
