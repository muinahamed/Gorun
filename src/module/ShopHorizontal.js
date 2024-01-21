import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MText, {interRegular, large, semiSmall, small} from '../common/MText';

import {useNavigation} from '@react-navigation/native';
import {CYAN_GRAY, LITE_BLACK} from '../utils/Color';
import ShopHorizontalListChild from '../common/ShopHorizontalListChild';
import ARROW from '../image/svg/arrow.svg';

const ShopHorizontalList = ({title, data, type, shopTypeId}) => {
  const navigation = useNavigation();
  const renderItem = ({item, index}) => (
    <ShopHorizontalListChild item={item} index={index} />
  );

  return (
    <View>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate('viewAll', {type, shopTypeId})}>
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
        <View style={styles.flex}>
          <MText
            size={semiSmall}
            fontType={interRegular}
            color={CYAN_GRAY}
            style={{
              fontWeight: '700',
            }}>
            See All{`  `}
          </MText>
          <ARROW style={styles.rotate} stroke={CYAN_GRAY} />
        </View>
      </TouchableOpacity>

      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item, index) => index}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingRight: 5}}
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
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rotate: {
    transform: [{rotate: '180deg'}],
  },
});
