/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

if (__DEV__) {
  require('react-native-performance-flipper-reporter').setupDefaultFlipperReporter();
}

AppRegistry.registerComponent(appName, () => App);
