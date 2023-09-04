import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LineBreak = ({margin, height, marginTop, backgroundColor}) => {
  return (
    <View
      style={[
        {
          width: '100%',
          height: height ? height : 1,
          backgroundColor: backgroundColor ? backgroundColor : '#F6F8FA',
          marginVertical: margin,
        },
        marginTop && styles.top(marginTop),
      ]}
    />
  );
};

export default LineBreak;

const styles = StyleSheet.create({
  top: marginTop => ({
    marginTop: marginTop,
  }),
});
