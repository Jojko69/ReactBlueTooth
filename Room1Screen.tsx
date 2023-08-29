import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function Room1Screen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokój 1</Text>
      {/* Tutaj dodaj treść dla pokoju */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    marginTop: 20,
    color: '#053B52',
  },
});

export default Room1Screen;
