import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {LITE_BLACK, ORDER_ID_GRAY, RATTING_GREEN, WHITE} from '../utils/Color';
import EXCLAMATORY from '../image/svg/exclamatorysign.svg';
import MText, {extraSmall, interRegular, semiXLarge} from './MText';
import START from '../image/svg/star.svg';

import {useNavigation} from '@react-navigation/native';
import {FOOD_DATA, banner} from '../utils/Dummy';
import {windowWidth} from '../utils/Measure';

const RestaurantDetailsCart = () => {
  const navigation = useNavigation();

  const [cardHeight, setCardHeight] = useState(121);

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 212 - cardHeight + 60,
      }}>
      <View style={styles.container}>
        <View style={styles.flex}>
          <Image source={FOOD_DATA[0].image} style={styles.logo} />

          <View style={{marginLeft: 10}}>
            <TouchableOpacity onPress={() => {}} style={[styles.flex]}>
              <MText
                size={semiXLarge}
                fontType={interRegular}
                color={LITE_BLACK}
                numberOfLines={1}
                style={{
                  fontWeight: '600',
                  marginRight: 5,
                }}>
                Kfc Shop
              </MText>
              <EXCLAMATORY />
            </TouchableOpacity>

            <View style={[styles.flex, {marginTop: 4}]}>
              <TouchableOpacity onPress={() => {}} style={[styles.flex]}>
                <START fill={RATTING_GREEN} width={8.5} height={8.5} />

                <MText
                  size={extraSmall}
                  fontType={interRegular}
                  style={{
                    color: RATTING_GREEN,
                    fontWeight: '600',
                    marginLeft: 3,
                  }}>
                  {'New'}

                  <MText
                    size={extraSmall}
                    fontType={interRegular}
                    style={{
                      color: ORDER_ID_GRAY,
                      fontWeight: '500',
                      textDecorationLine: 'underline',
                    }}>
                    {` (${10}+ Ratings)`}
                  </MText>
                </MText>
              </TouchableOpacity>

              <MText
                size={extraSmall}
                fontType={interRegular}
                style={{
                  color: ORDER_ID_GRAY,
                  fontWeight: '400',
                }}>
                $100
              </MText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RestaurantDetailsCart;

const styles = StyleSheet.create({
  banner: {
    width: windowWidth,
    height: 212,
  },
  container: {
    backgroundColor: WHITE,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: WHITE,
  },
  gradient: {
    padding: 2,
    borderRadius: 52,
  },
});
