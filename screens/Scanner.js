import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getAuthToken } from './AuthenticationService';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;

const Button = styled.TouchableOpacity`
  margin-vertical: 15px;
  padding-vertical: 15px;
  paddingHorizontal: 30px;
  borderRadius: 10px;
  alignItems: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  fontSize: 18px;
`;

const ScannedDataContainer = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  padding: 20px;
  borderWidth: 1px;
  borderColor: #3498db;
  borderRadius: 10px;
  backgroundColor: #e6f7ff;
  zIndex: 1;
`;

const ScannedDataLabel = styled.Text`
  fontWeight: bold;
  marginBottom: 5px;
  color: #3498db;
`;

const ScannedDataText = styled.Text`
  color: #000;
`;

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [isWifi, setIsWifi] = useState(false);
  const [wifiCredentials, setWifiCredentials] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const authToken = await getAuthToken();
    // if (!authToken) {
    //   // Redirect to the login screen or perform any other authentication logic
    //   // For now, let's just alert the user
    //   alert('Authentication required. Redirecting to login.');
    // }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data); // Store the scanned data

    // Check if the scanned data represents a WiFi QR code
    if (data.startsWith('WIFI:')) {
      setIsWifi(true);
      const credentials = data.substring(5); // Remove 'WIFI:'
      setWifiCredentials(parseWifiCredentials(credentials));
    }
  };

  const parseWifiCredentials = (credentials) => {
    const parts = credentials.split(';');
    const result = {};
    parts.forEach(part => {
      const [key, value] = part.split(':');
      result[key] = value;
    });
    return result;
  };

  const openUrlInBrowser = async () => {
    if (scannedData) {
      await Linking.openURL(scannedData);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Container>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View>
          <Button
            onPress={openUrlInBrowser}
            style={{
              backgroundColor: isWifi ? '#3498db' : '#3498db',
            }}
          >
            <ButtonText>Open URL in Browser</ButtonText>
          </Button>
          <Button
            onPress={() => {
              setScanned(false);
              setScannedData(null);
              setIsWifi(false);
            }}
            style={{
              backgroundColor: isWifi ? '#3498db' : '#e74c3c',
            }}
          >
            <ButtonText>Tap to Scan Again</ButtonText>
          </Button>
        </View>
      )}
      {scanned && (
        <ScannedDataContainer>
          <ScannedDataLabel>Scanned Data:</ScannedDataLabel>
          <ScannedDataText>{scannedData}</ScannedDataText>
          {isWifi && (
            <View>
              <ScannedDataLabel>Username:</ScannedDataLabel>
              <ScannedDataText>{wifiCredentials?.S}</ScannedDataText>
              <ScannedDataLabel>Password:</ScannedDataLabel>
              <ScannedDataText>{wifiCredentials?.P}</ScannedDataText>
            </View>
          )}
        </ScannedDataContainer>
      )}
    </Container>
  );
}
