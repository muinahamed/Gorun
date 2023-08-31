import Toast from 'react-native-root-toast';
import {windowWidth} from './Measure';
import {RED} from './Color';

export const showErrorMessage = message => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: windowWidth / 6,
    textColor: RED,
    animation: true,
    hideOnPress: true,
    shadow: false,
    opacity: 1,
  });
};

export const showSuccessMessage = message => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: windowWidth / 6,
    animation: true,
    hideOnPress: true,
    shadow: false,
    opacity: 1,
  });
};
