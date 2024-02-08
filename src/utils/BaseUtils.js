import Toast from 'react-native-root-toast';
import {windowWidth} from './Measure';
import {RED} from './Color';
const moment = require('moment');

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

export var parseDate = date => {
  if (date === null) return moment(new Date()).format('DD MMM YYYY');
  var m = moment(date).format('DD MMM YYYY');
  return m;
};

export var parseTime = date => {
  var m = moment(date, 'HH:mm').format('hh:mm A');
  return m;
};
