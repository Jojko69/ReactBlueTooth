import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import BluetoothMethodHelper from './BluetoothMethodHelper';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

function LoginScreen({onLoginSuccess}: LoginScreenProps) {
  const [pin, setPin] = useState('');

  const verifyPin = () => {
    // Tutaj dodaj kod do weryfikacji PINu z Arduino
    // Na razie zakładamy, że wpisany PIN jest poprawny
    if (pin === '1234') {
      onLoginSuccess();
    } else {
      Alert.alert('Błąd', 'Niepoprawny PIN');
    }
  };

  return (
    <ImageBackground
      source={require('./assets/smart-home.png')} // Ścieżka do pliku graficznego
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Smart Home</Text>
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.pinInputContainer}>
          <TextInput
            value={pin}
            onChangeText={setPin}
            placeholder="Wpisz PIN"
            keyboardType="numeric"
            secureTextEntry={true}
            style={styles.pinInput}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#595959'}]}
            onPress={() => {}}>
            <Text style={styles.buttonText}>Wyjdź</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#00BFFF'}]}
            onPress={verifyPin}>
            <Text style={styles.buttonText}>Wejdź</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Pozycjonuj napis od góry
    marginTop: 20, // Dodaj margines od góry
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    color: '#000080', // Kolor granatowy
    fontSize: 36, // Zwiększ rozmiar o 50%
    marginBottom: 20,
    textAlign: 'center',
  },
  loginContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    height: '17%',
  },
  pinInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00BFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  pinInput: {
    flex: 1,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 1,
  },
  button: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 1,
  },
  buttonText: {
    color: 'white',
  },
});

export default LoginScreen;
