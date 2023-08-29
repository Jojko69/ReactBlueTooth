import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BluetoothMethodHelper from './BluetoothMethodHelper';
import LoginScreen from './LoginScreen';

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  const onLedOn = () => {
    BluetoothMethodHelper.ledOn();
  };
  const onLedOff = () => {
    BluetoothMethodHelper.ledOff();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Witaj w domu</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.buttonContainer}>
        <TouchableOpacity onPress={onLedOn} style={styles.button}>
          <Text style={styles.buttonText}>Pokój 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLedOff} style={styles.button}>
          <Text style={styles.buttonText}>Pokój 2</Text>
        </TouchableOpacity>
        {/* Dodaj kolejne przyciski na wybór odpowiednich komponentów */}
      </ScrollView>
      <Text style={styles.subtitle}>Strona główna</Text>
      <View style={styles.nextSection}>
        {/* Tutaj możesz dodać komponenty sterujące */}
      </View>
      <TouchableOpacity
        onPress={() => setIsLoggedIn(false)}
        style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Wyjdź</Text>
      </TouchableOpacity>
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
  buttonContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#841584',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    color: '#053B52',
  },
  nextSection: {
    height: '40%',
    backgroundColor: 'lightgray',
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#1E90FF', // Nowy kolor przycisku
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'center', // Przesunięcie przycisku do środka
    marginBottom: 20,
  },
  logoutButtonText: {
    color: 'white',
  },
});

export default App;
