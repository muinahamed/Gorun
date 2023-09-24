import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {LITE_BLACK, ORDER_ID_GRAY, RATTING_GREEN, WHITE} from '../utils/Color';
import EXCLAMATORY from '../image/svg/exclamatorysign.svg';
import MText, {extraSmall, interRegular, semiXLarge} from './MText';
import START from '../image/svg/star.svg';
import {windowWidth} from '../utils/Measure';
import {useSelector} from 'react-redux';

const RestaurantDetailsCart = ({details, setModalVisible}) => {
  const {user} = useSelector(state => state.app);
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 212 - 121 + 60,
      }}>
      <View style={styles.container}>
        <View style={styles.flex}>
          <Image source={{uri: details?.image}} style={styles.logo} />

          <View style={{marginLeft: 10}}>
            <TouchableOpacity
              disabled={!user?.shopType}
              onPress={() => setModalVisible(true)}
              style={[styles.flex]}>
              <MText
                size={semiXLarge}
                fontType={interRegular}
                color={LITE_BLACK}
                numberOfLines={1}
                style={{
                  fontWeight: '600',
                  marginRight: 5,
                }}>
                {details?.name}
              </MText>
              <EXCLAMATORY />
            </TouchableOpacity>

            <View style={[styles.flex]}>
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
                    {` ${details?.phoneNumber}`}
                  </MText>
                </MText>
              </TouchableOpacity>
            </View>
            <MText
              size={extraSmall}
              fontType={interRegular}
              style={{
                color: ORDER_ID_GRAY,
                fontWeight: '400',
              }}>
              {details?.shopOwnerName}
            </MText>
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
