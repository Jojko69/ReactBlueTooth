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
      <Text style={styles.title}>Pokój 1</Text>
      <Text style={styles.roomStering}>Oświetlenie główne</Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleDeviceControl('11D')}
          style={styles.buttonOff}>
          <Text style={styles.buttonText}>OFF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeviceControl('11U')}
          style={styles.buttonOn}>
          <Text style={styles.buttonText}>ON</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.roomStering}>Oświetlenie boczne</Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleDeviceControl('09D')}
          style={styles.buttonOff}>
          <Text style={styles.buttonText}>Off</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeviceControl('09U')}
          style={styles.buttonOn}>
          <Text style={styles.buttonText}>On</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.roomStering}>Gniazdo 230V</Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleDeviceControl('10D')}
          style={styles.buttonOff}>
          <Text style={styles.buttonText}>Off</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeviceControl('10U')}
          style={styles.buttonOn}>
          <Text style={styles.buttonText}>On</Text>
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
    borderWidth: 2,
    borderColor: '#076481',
  },
  title: {
    color: '#076481',
    fontSize: 36, // 100% większy
    textAlign: 'center',
    marginTop: 10, // margines 10px
    marginBottom: 20, // margines 20px
  },
  roomStering: {
    color: '#076481',
    fontSize: 16, // 100% większy
    textAlign: 'center',
    //marginTop: 5, // margines 10px
    //marginBottom: 30, // margines 20px
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonOn: {
    height: 40,
    width: 80,
    padding: 10,
    backgroundColor: '#08B948',
    borderRadius: 5,
    margin: 20, // mały margines, żeby przyciski nie były zbyt blisko siebie
  },
  buttonOff: {
    height: 40,
    width: 80,
    padding: 10,
    backgroundColor: '#E22613',
    borderRadius: 5,
    margin: 20, // mały margines, żeby przyciski nie były zbyt blisko siebie
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Room3;
