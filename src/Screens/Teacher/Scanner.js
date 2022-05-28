import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Vibration,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const Scanner = ({ navigation, data }) => {
  const dataLogged = data;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    Vibration.vibrate();
    setScanned(true);
    navigation.push("Attendance", { numS: data, numT: dataLogged.number });
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <TouchableOpacity onPress={() => setScanned(false)}>
        <Text>Tap to scan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Scanner;
