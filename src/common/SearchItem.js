/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MText, {interRegular, medium, small} from './MText';
import {LITE_BLACK} from '../utils/Color';
import {useDispatch} from 'react-redux';
import {Image} from 'react-native';

const SearchItem = ({item, from}) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <View>
        <Image
          source={{uri: item.images[0]}}
          resizeMode={'cover'}
          style={styles.Image}
        />
      </View>
      <View style={{marginStart: 10, flex: 1}}>
        <MText
          size={medium}
          fontType={interRegular}
          numberOfLines={1}
          color={LITE_BLACK}
          style={{fontWeight: '500', marginRight: 10}}>
          {item.name}
        </MText>
        <MText
          size={small}
          numberOfLines={1}
          fontType={interRegular}
          color={LITE_BLACK}
          style={{fontWeight: '400', lineHeight: 18, marginRight: 10}}>
          {item?.shop?.shopName}
        </MText>
      </View>
      <View style={[]}>
        <MText
          numberOfLines={1}
          size={small}
          fontType={interRegular}
          color={LITE_BLACK}
          style={{fontWeight: '600'}}>
          {Math.round(item?.discountPrice * 100) / 100}
        </MText>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  Image: {
    width: 65,
    height: 65,
    borderRadius: 7,
    resizeMode: 'cover',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});