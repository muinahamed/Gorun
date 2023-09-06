import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MText, {extraSmall, interRegular} from './MText';
import STAR from '../image/svg/star.svg';
import {RATTING_GREEN, RATTING_RED, YELLOW} from '../utils/Color';

const RatingShow = ({rating}) => {
  let color =
    rating == 0
      ? RATTING_GREEN
      : rating < 3
      ? RATTING_RED
      : rating < 4
      ? YELLOW
      : RATTING_GREEN;

  return (
    <View style={styles.flex}>
      <STAR fill={color} width={8.5} height={8.5} />
      <MText
        size={extraSmall}
        fontType={interRegular}
        style={{
          color: color,
          fontWeight: '500',
          marginLeft: 3,
        }}>
        {rating > 0 ? rating : 'New'}
      </MText>
    </View>
  );
};

export default RatingShow;

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
