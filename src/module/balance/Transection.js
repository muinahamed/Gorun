import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
  CYAN_GRAY,
  GRAY_200,
  LITE_BLACK,
  PRIMARY_COLOR,
  RATTING_GREEN,
  RED,
} from '../../utils/Color';
import MText, {interRegular, medium, small} from '../../common/MText';
import {parseDate, parseTime} from '../../utils/BaseUtils';

const Transection = ({item}) => {
  return (
    <View style={[styles.flex, styles.container]}>
      <View style={{flex: 1}}>
        <MText
          size={small}
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
          {item?.userNote}
        </MText>
      </View>

      <MText
        size={medium}
        fontType={interRegular}
        color={PRIMARY_COLOR}
        style={{
          fontWeight: '400',
          lineHeight: 16,
        }}>
        {`+ BDT ${item?.amount}`}
      </MText>
    </View>
  );
};

export default Transection;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  round: {
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: GRAY_200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
