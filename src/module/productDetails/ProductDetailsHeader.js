import {StyleSheet, View} from 'react-native';
import {NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;
const height = StatusBarManager.HEIGHT;
import React from 'react';
import ARROW from '../../image/svg/arrow.svg';
import SHARE from '../../image/svg/share.svg';
import HEART from '../../image/svg/heart.svg';
import {LITE_BLACK, WHITE} from '../../utils/Color';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ProductDetailsHeader = () => {
  const navigation = useNavigation();
  let Item = ({Image, marginLeft, onPress}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={() => onPress()}
        style={[styles.round, {marginLeft}]}>
        {Image}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.flex(height)}>
      <Item
        onPress={() => navigation.goBack()}
        Image={<ARROW stroke={LITE_BLACK} />}
      />
      <View style={styles.childFlex}>
        <Item
          onPress={() => {}}
          Image={<SHARE stroke={LITE_BLACK} />}
          marginLeft={10}
        />
        <Item
          onPress={() => {}}
          Image={<HEART stroke={LITE_BLACK} fill={WHITE} />}
          marginLeft={10}
        />
      </View>
    </View>
  );
};

export default ProductDetailsHeader;

const styles = StyleSheet.create({
  round: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: height => ({
    flexDirection: 'row',
    paddingTop: height + 6,
    paddingBottom: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  }),
  childFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
