/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text} from 'react-native';
import {styleFontSize} from '../utils/typography';
import {BLACK} from '../utils/Color';

export const interRegular = 'Inter-Regular';

export const mini8 = 'mini8';

export const mini = 'mini';

export const extraSmall = 'extraSmall';
export const semiSmall = 'semiSmall';

export const small = 'small';
export const semiMedium = 'semiMedium';
export const medium = 'medium';
export const max = 'max';

export const SemiLarge = 'SemiLarge';

export const large = 'large';
export const semiXLarge = 'semiXLarge';

export const xLarge = 'xLarge';
export const xxLarge = 'xxLarge';

export const larger = 'larger';
export const xLarge20 = 'xLarge20';
export const xLarge50 = 'xLarge50';

const MText = props => {
  const {children, color, style, numberOfLines, fontType} = props;

  const getSize = () => {
    const {size} = props;
    switch (size) {
      case 'mini8':
        return styleFontSize.mini8;
      case 'mini':
        return styleFontSize.mini;
      case 'extraSmall':
        return styleFontSize.extraSmall;
      case 'semiSmall':
        return styleFontSize.semiSmall;
      case 'small':
        return styleFontSize.small;
      case 'semiMedium':
        return styleFontSize.semiMedium;
      case 'SemiLarge':
        return styleFontSize.SemiLarge;
      case 'large':
        return styleFontSize.large;
      case 'semiXLarge':
        return styleFontSize.semiXLarge;
      case 'xLarge':
        return styleFontSize.xLarge;
      case 'xLarge20':
        return styleFontSize.xLarge20;
      case 'xLarge50':
        return styleFontSize.xLarge50;
      case 'xxLarge':
        return styleFontSize.xxLarge;
      case 'max':
        return styleFontSize.max;
      case 'medium':
        return styleFontSize.medium;
      case 'larger':
        return styleFontSize.larger;
      default:
        return styleFontSize.medium;
    }
  };
  // console.log(darkMode,'hello')
  return (
    <Text
      numberOfLines={numberOfLines}
      {...props}
      style={[
        {
          color: color == null ? BLACK : color,
          fontFamily: fontType,
          flexWrap: 'wrap',
          includeFontPadding: false,
          ...getSize(),
          ...style,
        },
      ]}>
      {children}
    </Text>
  );
};

export default MText;
