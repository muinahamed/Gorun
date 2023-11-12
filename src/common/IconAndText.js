import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BLACK, PRIMARY_COLOR, RED} from '../utils/Color';
import MText, {interRegular, SemiLarge, semiSmall} from './MText';
import {windowWidth} from '../utils/Measure';

const IconAndText = ({
  title,
  item,
  select,
  setSelect,
  address,
  index,
  onPress,
  exitAble,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelect({...item, index: index});

        onPress && onPress();
      }}
      style={[
        style,
        {
          height: 56,
          justifyContent: 'center',
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 15,
          width: windowWidth - 30,
        }}>
        <View style={{marginLeft: 14}}>
          <MText
            size={SemiLarge}
            fontType={interRegular}
            color={BLACK}
            style={{
              fontWeight: '400',
              maxWidth: windowWidth - 60,
              lineHeight: 24,
            }}>
            {title}
          </MText>
          {address && (
            <MText
              size={semiSmall}
              fontType={interRegular}
              numberOfLines={1}
              color={'rgba(133,133,133,1)'}
              style={{
                fontWeight: '400',
                maxWidth: windowWidth - 60,
                lineHeight: 20,
              }}>
              {address}
            </MText>
          )}
        </View>
      </View>

      {select?._id == item?._id && (
        <>
          <View style={styles.select} />
          <View style={styles.selectShadow} />
        </>
      )}
    </TouchableOpacity>
  );
};

export default IconAndText;

const styles = StyleSheet.create({
  select: {
    position: 'absolute',
    height: 55,
    width: 4,
    backgroundColor: PRIMARY_COLOR,
  },
  selectShadow: {
    position: 'absolute',
    width: windowWidth,
    height: 55,
    backgroundColor: 'rgba(231, 57, 65, 0.05)',
  },
});
