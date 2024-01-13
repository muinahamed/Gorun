import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import MText, {
  extraSmall,
  interRegular,
  medium,
  semiMedium,
  small,
} from './MText';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LITE_BLACK, RED} from '../utils/Color';
import {windowWidth} from '../utils/Measure';

const ShopHorizontalListChild = ({item, index}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('shopDetails', {shopDetails: item});
      }}
      style={styles.container(index)}>
      <Image
        style={styles.image}
        resizeMethod={'scale'}
        imageStyle={{borderRadius: 7}}
        source={{uri: item?.image}}
      />

      <View style={styles.content}>
        <MText
          size={medium}
          fontType={interRegular}
          numberOfLines={1}
          color={LITE_BLACK}
          style={{
            fontWeight: '700',
            flex: 1,
          }}>
          {item?.name}
          {index}
        </MText>
        <MText
          size={extraSmall}
          fontType={interRegular}
          numberOfLines={1}
          color={'#323736'}
          style={{
            fontWeight: '400',
            flex: 1,
          }}>
          {item?.shopAddress?.address}
        </MText>
        <MText
          size={extraSmall}
          fontType={interRegular}
          numberOfLines={1}
          color={'#323736'}
          style={{
            fontWeight: '400',
            flex: 1,
          }}>
          $20
        </MText>
      </View>
    </TouchableOpacity>
  );
};

export default ShopHorizontalListChild;

const styles = StyleSheet.create({
  container: index => ({
    marginLeft: 15,
    marginRight: index % 2 == 1 ? 15 : 0,
    marginTop: 10,
  }),
  image: {
    width: (windowWidth - 45) / 1.5,
    height: 137,
    borderRadius: 7,
    resizeMode: 'cover',
  },
  bannerContent: {
    backgroundColor: RED,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 7,
    paddingRight: 16,
    top: 5,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 2,
    marginTop: 2,
  },

  content: {
    marginTop: 12,
    width: (windowWidth - 45) / 2,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
