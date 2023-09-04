import {Image, StyleSheet} from 'react-native';
import React from 'react';

import {banner} from '../utils/Dummy';
import {windowWidth} from '../utils/Measure';

const RestaurantBanner = ({scrollY}) => {
  return (
    <Image
      source={banner[0]?.image}
      style={{
        width: windowWidth,
        height: 212,
      }}
    />
  );
};

export default RestaurantBanner;

const styles = StyleSheet.create({});
