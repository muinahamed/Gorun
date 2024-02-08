import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  BORDER_COLOR,
  LITE_BLACK,
  ORDER_ID_GRAY,
  PRIMARY_COLOR,
  RATTING_GREEN,
  WHITE,
} from '../utils/Color';
import EXCLAMATORY from '../image/svg/exclamatorysign.svg';
import MText, {
  extraSmall,
  interRegular,
  medium,
  semiXLarge,
  small,
} from './MText';
import START from '../image/svg/star.svg';
import {windowWidth} from '../utils/Measure';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import OfflinePurchesRequest from './OfflinePurchesRequest';
const physicalShop = ['both', 'offline'];

const RestaurantDetailsCart = ({details, setModalVisible}) => {
  const {user} = useSelector(state => state.app);
  const [dialog, setDialog] = useState(false);
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 212 - 121 + 60,
      }}>
      <OfflinePurchesRequest props={{dialog, setDialog, details}} />
      <View style={styles.container}>
        <View style={styles.flex}>
          <TouchableOpacity
            disabled={!user?.shopType}
            onPress={() => navigation.navigate('more')}>
            <Image source={{uri: details?.image}} style={styles.logo} />
          </TouchableOpacity>

          <View style={{marginLeft: 10, flex: 1}}>
            <View disabled={!user?.shopType} style={[styles.flex]}>
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
              <TouchableOpacity
                style={{flex: 1, alignItems: 'flex-end'}}
                onPress={() => {
                  if (user?.shopType) setModalVisible(true);
                  else setDialog(true);
                }}>
                <MText
                  size={small}
                  fontType={interRegular}
                  color={PRIMARY_COLOR}
                  style={styles.button}>
                  {user?.shopType ? `Add Product` : `Offline Points`}
                </MText>
              </TouchableOpacity>
            </View>

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
  button: {
    borderWidth: 1,
    fontWeight: '500',
    borderColor: BORDER_COLOR,
    borderRadius: 5,
    padding: 2,
  },
});
