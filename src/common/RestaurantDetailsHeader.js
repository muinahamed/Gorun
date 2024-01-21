import {Animated, StyleSheet, View, TouchableOpacity} from 'react-native';
import {NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;
const height = StatusBarManager.HEIGHT;
import React from 'react';
import ARROW from '../image/svg/arrow.svg';
import {LITE_BLACK, RED, WHITE} from '../utils/Color';
import MText, {interRegular, semiMedium} from './MText';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MakeLove from './MakeLove';

const RestaurantDetailsHeader = ({scrollY, details}) => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.app);

  let Item = ({Image, marginLeft}) => {
    return (
      <TouchableOpacity
        onPress={() => !user?.shopType && navigation.navigate('home')}
        style={[styles.round, {marginLeft, opacity: user?.shopType ? 0 : 1}]}>
        {Image}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.flex(height, scrollY)}>
      <Item Image={<ARROW stroke={LITE_BLACK} />} />

      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.flex(height),
          {
            backgroundColor: WHITE,
            alignItems: 'flex-end',
            opacity: scrollY.interpolate({
              inputRange: [0, 100, 120],
              outputRange: [0, 0.2, 1],
            }),
          },
        ]}>
        <View style={styles.childFlex}>
          <Item Image={<ARROW stroke={RED} />} />
          <Animated.View
            style={{
              marginLeft: 10,
              justifyContent: 'center',
              opacity: scrollY.interpolate({
                inputRange: [0, 110, 120],
                outputRange: [0, 0, 1],
              }),
            }}>
            <MText
              size={semiMedium}
              color={LITE_BLACK}
              fontType={interRegular}
              style={{
                fontWeight: '500',
              }}>
              Delivery
            </MText>
          </Animated.View>
        </View>
        <View>
          <MakeLove
            baseStyleDisbale={true}
            redHeart={true}
            item={details}
            style={[styles.round, {opacity: user?.shopType ? 0 : 1}]}
          />
        </View>
      </Animated.View>

      <MakeLove
        baseStyleDisbale={true}
        item={details}
        style={[styles.round, {opacity: user?.shopType ? 0 : 1}]}
      />
    </View>
  );
};

export default RestaurantDetailsHeader;

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
