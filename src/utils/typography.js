import {StyleSheet} from 'react-native';
import {moderateScale} from './scaling';

// default font style used in project

export const styleFontSize = StyleSheet.create({
  mini8: {
    fontSize: moderateScale(8),
  },
  mini: {
    fontSize: moderateScale(9),
  },
  extraSmall: {
    fontSize: moderateScale(10),
  },
  semiSmall: {
    fontSize: moderateScale(11),
  },
  small: {
    fontSize: moderateScale(12),
  },
  semiMedium: {
    fontSize: moderateScale(13),
  },
  medium: {
    fontSize: moderateScale(14),
  },

  SemiLarge: {
    fontSize: moderateScale(15),
  },
  large: {
    fontSize: moderateScale(16),
  },
  semiXLarge: {
    fontSize: moderateScale(18),
  },
  xLarge: {
    fontSize: moderateScale(19),
  },
  xLarge20: {
    fontSize: moderateScale(20),
  },
  xLarge50: {
    fontSize: moderateScale(50),
  },

  larger: {
    fontSize: moderateScale(17),
  },
  xxLarge: {
    fontSize: moderateScale(25),
  },
  max: {
    fontSize: moderateScale(28),
  },
});
