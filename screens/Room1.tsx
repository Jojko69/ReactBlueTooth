import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NativeModules} from 'react-native';

const {BluetoothMethodHelper} = NativeModules;

function Room3() {
  const handleDeviceControl = (index: string) => {
    BluetoothMethodHelper.controlDevice(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>POKÓJ 1</Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleDeviceControl('13D')}
          style={styles.button}>
          <Text style={styles.buttonText}>13D</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeviceControl('13U')}
          style={styles.button}>
          <Text style={styles.buttonText}>13U</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleDeviceControl('09D')}
          style={styles.button}>
          <Text style={styles.buttonText}>09D</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeviceControl('09U')}
          style={styles.button}>
          <Text style={styles.buttonText}>09U</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleDeviceControl('10D')}
          style={styles.button}>
          <Text style={styles.buttonText}>10D</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeviceControl('10U')}
          style={styles.button}>
          <Text style={styles.buttonText}>10U</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: '#007BFF',
    fontSize: 36, // 100% większy
    textAlign: 'center',
    marginTop: 10, // margines 10px
    marginBottom: 30, // margines 20px
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    height: 40,
    width: 80,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    margin: 20, // mały margines, żeby przyciski nie były zbyt blisko siebie
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Room3;
