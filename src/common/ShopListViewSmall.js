import {StyleSheet, View} from 'react-native';
import React from 'react';
import MText, {extraSmall, interRegular, medium} from './MText';
import {CHAT_ICON_BG, ORDER_ID_GRAY} from '../utils/Color';
import {TouchableOpacity} from 'react-native';
import ImageBackgroundLazy from './ImageBackgroundLazy';
import RatingShow from './RatingShow';

const ShopListViewSmall = ({item}) => {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.container}>
      <ImageBackgroundLazy
        style={styles.image}
        resizeMethod={'scale'}
        imageStyle={{borderRadius: 7}}
        source={{uri: item?.shopBanner}}></ImageBackgroundLazy>

      <View
        style={{
          flex: 1,
          marginLeft: 12,
          justifyContent: 'space-around',
        }}>
        <View style={[styles.flex, {justifyContent: 'space-between'}]}>
          <View style={styles.flex}>
            <MText
              size={medium}
              fontType={interRegular}
              numberOfLines={1}
              style={{
                color: CHAT_ICON_BG,
                fontWeight: '500',
              }}>
              {item?.shopName}
            </MText>
          </View>

          <RatingShow rating={item?.rating} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FooterInfo = ({Image, value, fill, stroke}) => {
  return (
    <View style={styles.time}>
      <Image fill={fill} stroke={stroke} />
      <MText
        size={extraSmall}
        fontType={interRegular}
        color={ORDER_ID_GRAY}
        style={{
          fontWeight: '500',
          marginLeft: 6,
          lineHeight: 20,
        }}>
        {value}
      </MText>
    </View>
  );
};

export default ShopListViewSmall;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 15,
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
  },
  offer: {
    top: 8,
    left: 8,
    width: 158,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heart: {
    padding: 6,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 29,
    height: 29,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  content: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
