import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import MText, {interRegular, medium, semiMedium} from './MText';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LITE_BLACK, RED} from '../utils/Color';

const ShopHorizontalListChild = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('shopDetails')}
      style={styles.container}>
      <Image
        style={styles.image}
        resizeMethod={'scale'}
        imageStyle={{borderRadius: 7}}
        source={item?.image}></Image>

      <View style={styles.content}>
        <MText
          size={medium}
          fontType={interRegular}
          numberOfLines={1}
          color={LITE_BLACK}
          style={{
            fontWeight: '500',
            flex: 1,
          }}>
          {item?.name}
        </MText>
        <MText
          size={semiMedium}
          fontType={interRegular}
          numberOfLines={1}
          color={'#323736'}
          style={{
            fontWeight: '400',
            flex: 1,
          }}>
          {item?.price}
        </MText>
      </View>
      {/* --------------------------------- */}
    </TouchableOpacity>
  );
};

export default ShopHorizontalListChild;

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginTop: 13,
  },
  image: {
    width: 243,
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
    width: 243,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
