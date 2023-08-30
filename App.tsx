import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import Room1 from './screens/Room1';
import Room2 from './screens/Room2';
import Room3 from './screens/Room3';
import Kitchen from './screens/Kitchen';
import Bathroom from './screens/Bathroom';
import Taras from './screens/Taras';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<
    null | 'Room1' | 'Room2' | 'Room3' | 'Kitchen' | 'Bathroom' | 'Taras'
  >(null);

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  const renderSelectedRoom = () => {
    if (selectedRoom === 'Room1') {
      return <Room1 />;
    } else if (selectedRoom === 'Room2') {
      return <Room2 />;
    } else if (selectedRoom === 'Room3') {
      return <Room3 />;
    } else if (selectedRoom === 'Kitchen') {
      return <Kitchen />;
    } else if (selectedRoom === 'Bathroom') {
      return <Bathroom />;
    } else if (selectedRoom === 'Taras') {
      return <Taras />;
    } else {
      return <View />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Witaj w domu</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setSelectedRoom('Room1')}
          style={styles.button}>
          <Text style={styles.buttonText}>Pokój 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedRoom('Room2')}
          style={styles.button}>
          <Text style={styles.buttonText}>Pokój 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedRoom('Room3')}
          style={styles.button}>
          <Text style={styles.buttonText}>Pokój 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedRoom('Kitchen')}
          style={styles.button}>
          <Text style={styles.buttonText}>Kuchnia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedRoom('Bathroom')}
          style={styles.button}>
          <Text style={styles.buttonText}>Łazienka</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedRoom('Taras')}
          style={styles.button}>
          <Text style={styles.buttonText}>Taras</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.mainContent}>{renderSelectedRoom()}</View>
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
    backgroundColor: '#f1f1f1',
    padding: 20,
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    marginTop: 20,
    color: '#053B52',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    height: 35,
    backgroundColor: '#076481',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
  },
  mainContent: {
    flex: 12,
    backgroundColor: 'lightgray',
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#076481',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'center',
    height: 35,
    width: 80,
  },
  logoutButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
