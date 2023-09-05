/**
 * @format
 */

import 'react-native-reanimated';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

AppRegistry.registerComponent(appName, () => App);
