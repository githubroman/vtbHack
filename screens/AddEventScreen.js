import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { createEvent } from '../actions.js';

export default function AddEventScreen(props) {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    if (type === BarCodeScanner.Constants.BarCodeType.qr) {
      setScanned(true);
      const json = JSON.parse(data);
      createEvent(json.id, json.place, json.products, (err, _id) => {
        props.navigation.navigate('Event', { _id })
      })
    }
  };

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === 'granted')
  };
  getPermissionsAsync();

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#5759FF' }}>
      <BarCodeScanner
        onBarCodeScanned={ scanned ? undefined : handleBarCodeScanned }
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
