import {StyleSheet, View} from 'react-native';
import React from 'react';
import MText, {interRegular, semiSmall, semiXLarge} from '../../common/MText';
import {LITE_BLACK, ORDER_ID_GRAY} from '../../utils/Color';
import LazyImage from '../../common/LazyImage';

const NewProductDetailsInfo = ({productDetails}) => {
  const imageData = productDetails?.images?.length
    ? productDetails?.images[0]
    : '';
  return (
    <View style={styles.container}>
      <LazyImage
        thumbnailSource={{
          uri: imageData,
        }}
        source={{
          uri: imageData,
        }}
        style={{
          width: '100%',
          resizeMode: 'cover',
          height: 250,
        }}
        resizeMode="cover"
      />
      <View
        style={[
          styles.flex,
          {alignItems: 'flex-start', marginHorizontal: 15, marginTop: 15},
        ]}>
        <View style={{flex: 1}}>
          <MText
            fontType={interRegular}
            color={LITE_BLACK}
            size={semiXLarge}
            style={{fontWeight: '600', flex: 1}}>
            {productDetails?.name}
          </MText>
          <MText
            fontType={interRegular}
            color={ORDER_ID_GRAY}
            size={semiSmall}
            style={{
              fontWeight: '400',
              flex: 1,
              marginRight: 20,
            }}>
            {productDetails?.description}
          </MText>
        </View>

        <View style={[styles.flex, {justifyContent: 'flex-end'}]}>
          <MText
            fontType={interRegular}
            color={LITE_BLACK}
            size={semiXLarge}
            style={{fontWeight: '500'}}>
            ${productDetails?.price}
          </MText>
        </View>
      </View>
    </View>
  );
};

export default NewProductDetailsInfo;

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  save: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(231,57,65,.08)',
    borderRadius: 6,
  },
});
