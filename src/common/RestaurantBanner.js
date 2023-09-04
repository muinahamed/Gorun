import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {windowWidth} from '../../utils/Const';

const RestaurantBanner = ({scrollY, banner}) => {
  return (
    <Image
      source={{uri: banner}}
      style={{
        width: windowWidth,
        height: 212,
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [-100, -50, -1, 0],
              outputRange: [-100, -50, 0, 0],
            }),
          },
          {
            scale: scrollY.interpolate({
              inputRange: [-100, -50, -1, 0],
              outputRange: [1.5, 1.2066, 1, 1],
            }),
          },
        ],
      }}
    />
  );
};

export default RestaurantBanner;

const styles = StyleSheet.create({});
