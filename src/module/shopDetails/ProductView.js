import {StyleSheet, View} from 'react-native';
import React from 'react';
import MText, {interRegular, medium, small} from '../../common/MText';
import {LITE_BLACK, RED, TEXT_GRAY, WHITE} from '../../utils/Color';
import {TouchableOpacity} from 'react-native';
import LazyImage from '../../common/LazyImage';

const ProductView = ({item, shopId, shopMaxDiscount}) => {
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={[styles.flex, {marginHorizontal: 15, overflow: 'hidden'}]}>
      <View style={{flex: 1, marginRight: 20, maxHeight: 85}}>
        <MText
          size={medium}
          numberOfLines={1}
          fontType={interRegular}
          color={LITE_BLACK}
          style={{fontWeight: '500', lineHeight: 22}}>
          {item?.name}
        </MText>
        <MText
          size={small}
          fontType={interRegular}
          color={TEXT_GRAY}
          numberOfLines={1}
          style={{
            fontWeight: '400',
            lineHeight: 20,
          }}>
          {item?.seoDescription}
        </MText>
        <View style={styles.flex}>
          <MText
            numberOfLines={1}
            size={small}
            fontType={interRegular}
            color={LITE_BLACK}
            style={{
              fontWeight: '600',
            }}>
            $100
          </MText>
        </View>
      </View>
      <LazyImage
        source={{uri: item.images[0]}}
        imageStyle={{borderRadius: 7}}
        style={{
          width: 96,
          height: 85,
          alignItems: 'flex-end',
        }}></LazyImage>
    </TouchableOpacity>
  );
};

export default ProductView;

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    backgroundColor: WHITE,
    borderColor: RED,
    bottom: 2,
    width: 92,
    right: 2,
    borderWidth: 0.5,
    borderRadius: 7,
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
  },
  plus: {
    height: 28,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  Show: {
    position: 'absolute',
    backgroundColor: WHITE,
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: RED,
    right: 2,
    bottom: 2,
    left: 0,
  },
});
