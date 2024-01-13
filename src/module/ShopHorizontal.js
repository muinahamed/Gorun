import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MText, {interRegular, large} from '../common/MText';

import {useNavigation} from '@react-navigation/native';
import {LITE_BLACK} from '../utils/Color';
import ShopHorizontalListChild from '../common/ShopHorizontalListChild';

const ShopHorizontalList = ({title, data, type, category}) => {
  const renderItem = ({item, index}) => (
    <ShopHorizontalListChild item={item} index={index} />
  );

  return (
    <View>
      <TouchableOpacity style={styles.header} onPress={() => {}}>
        <MText
          size={large}
          fontType={interRegular}
          color={LITE_BLACK}
          style={{
            fontWeight: '700',
            lineHeight: 19,
            paddingTop: 5,
          }}>
          {title}
        </MText>
      </TouchableOpacity>

      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item, index) => index}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ShopHorizontalList;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 25,
    paddingVertical: 3,
  },
  rotate: {
    transform: [{rotate: '-90deg'}],
  },
});
