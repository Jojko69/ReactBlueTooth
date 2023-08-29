import {NativeModules} from 'react-native';
const {BluetoothMethodHelper} = NativeModules;

interface BluetoothMethodHelperInterface {
  ledOn(): void;
  ledOff(): void;
  paOn(): void;
  duOff(): void;
  verifyPin(pin: string, callback: (isCorrect: boolean) => void): void;
}
export default BluetoothMethodHelper as BluetoothMethodHelperInterface;
