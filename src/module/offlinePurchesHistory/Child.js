import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MText, {extraSmall, interRegular, medium} from '../../common/MText';
import {parseDate, parseTime} from '../../utils/BaseUtils';
import {CYAN_GRAY, LITE_BLACK} from '../../utils/Color';

const Child = ({item}) => {
  return (
    <View style={styles.conatiner}>
      <Image source={{uri: item?.shop?.image}} style={styles.icon} />
      <View style={{flex: 1, marginLeft: 10}}>
        <MText
          size={extraSmall}
          fontType={interRegular}
          color={CYAN_GRAY}
          style={{fontWeight: '400', lineHeight: 20}}>
          {parseDate(new Date(item.updatedAt))} |{' '}
          {parseTime(new Date(item.updatedAt))}
        </MText>
        <MText
          size={medium}
          fontType={interRegular}
          color={LITE_BLACK}
          style={{fontWeight: '400', lineHeight: 16}}>
          {item?.shop?.name}
        </MText>
      </View>
      <View>
        <MText
          size={medium}
          fontType={interRegular}
          color={LITE_BLACK}
          style={{fontWeight: '400', lineHeight: 16, textAlign: 'right'}}>
          BDT {item?.amount}
        </MText>
        <MText
          size={medium}
          fontType={interRegular}
          color={LITE_BLACK}
          style={{fontWeight: '400', lineHeight: 16}}>
          {item?.status}
        </MText>
      </View>
    </View>
  );
};

export default Child;

const styles = StyleSheet.create({
  conatiner: {
    marginTop: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});
