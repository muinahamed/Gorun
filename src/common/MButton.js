/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {moderateScale} from '../utils/scaling';
import {PRIMARY_COLOR, WHITE} from '../utils/Color';
import {interRegular} from './MText';

export const MButton = props => {
  const {
    title,
    onPress,
    paddingHorizontal,
    paddingVertical = 5,
    color = PRIMARY_COLOR,
    textColor = WHITE,
    borderRadius = 10,
    bottom = 0,
    marginTop = 0,
    fontSize = moderateScale(14),
    rightIcon,
    leftIcon,
    fontFamily = interRegular,
    marginBottom,
    style,
    width = windowWidth - 80,
    disabled,
    loading,
    fontWeight = '600',
    lineHeight = 24,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={disabled || loading}
      onPress={onPress}
      style={{
        ...style,
        marginTop: marginTop,
        alignSelf: 'center',
        marginBottom: marginBottom,
        width: width,
      }}>
      <View
        style={{
          paddingHorizontal: paddingHorizontal,
          backgroundColor: color,
          height: 44,
          borderRadius: borderRadius,
          bottom: bottom,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        }}>
        {isNaN(leftIcon) ? (
          leftIcon
        ) : (
          <Image
            source={leftIcon}
            style={{tintColor: WHITE, marginRight: 10}}
          />
        )}

        <Text
          style={{
            color: textColor,
            opacity: loading ? 0 : 1,
            fontFamily: fontFamily,
            textAlign: 'center',
            fontSize: fontSize,
            fontWeight: fontWeight,
            paddingVertical: paddingVertical,
            lineHeight: lineHeight,
          }}>
          {title}
        </Text>
        {rightIcon && <Image source={rightIcon} marginStart={10} />}
        {loading && (
          <ActivityIndicator style={{position: 'absolute'}} color={WHITE} />
        )}
      </View>
    </TouchableOpacity>
  );
};
