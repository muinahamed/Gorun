import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MText, {interRegular, medium, small} from '../../common/MText';
import {LITE_BLACK, LITE_PRIMARY_COLOR, PRIMARY_COLOR} from '../../utils/Color';
import LineBreak from '../../common/LineBreak';

const ShopTypeList = ({shopCategory, setShopType, shopType, setShopModal}) => {
  let renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          setShopType(item);
          setShopModal({status: true, anim: true});
        }}>
        <MText
          size={medium}
          fontType={interRegular}
          color={LITE_BLACK}
          style={{
            fontWeight: '500',
            lineHeight: 20,
          }}>
          {item?.name}
        </MText>
        <MText
          size={small}
          fontType={interRegular}
          color={LITE_BLACK}
          style={{
            fontWeight: '400',
          }}>
          {item?.activeStatus}
        </MText>
        {item?._id == shopType?._id && <View style={styles.select} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={shopCategory?.shopTypes}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <LineBreak />}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default ShopTypeList;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    paddingHorizontal: 15,
  },
  select: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderLeftWidth: 4,
    backgroundColor: LITE_PRIMARY_COLOR,
    borderLeftColor: PRIMARY_COLOR,
  },
});
