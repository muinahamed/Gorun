import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ARROW from '../../image/svg/arrow.svg';
import {WHITE} from '../../utils/Color';
import {windowWidth} from '../../utils/Measure';

const MoreHeader = () => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.flex,
        {
          marginHorizontal: 15,
          marginTop: 10,
          justifyContent: 'space-between',
          paddingBottom: 10,
        },
      ]}>
      <TouchableOpacity
        style={{padding: 10, paddingHorizontal: 14}}
        onPress={() => navigation.goBack()}>
        <ARROW stroke={WHITE} />
      </TouchableOpacity>
    </View>
  );
};

export default MoreHeader;

const styles = StyleSheet.create({
  pts: {
    borderWidth: 1.25,
    borderColor: WHITE,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 7,
    marginRight: (22 / 375) * windowWidth,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trsnform: {},
});
