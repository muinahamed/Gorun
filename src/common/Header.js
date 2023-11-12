import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ARROW} from '../image/SvgPath';
import CROSS from '../image/svg/cross.svg';
import MText, {interRegular, large} from './MText';
import {LITE_BLACK} from '../utils/Color';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  back = true,
  title = 'Verify Number',
  cross,
  crossPress,
  HeaderRightIcon,
  onRightPress,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MText
        size={large}
        fontType={interRegular}
        color={LITE_BLACK}
        style={styles.title}>
        {title}
      </MText>

      <TouchableOpacity
        disabled={!back}
        onPress={() => {
          if (back && cross) {
            crossPress();
          } else {
            navigation.goBack();
          }
        }}
        style={[styles.button, {opacity: back ? 1 : 0}]}>
        {cross ? <CROSS /> : <ARROW />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onRightPress()}>
        {HeaderRightIcon}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    lineHeight: 34,
  },
  button: {
    padding: 10,
    paddingHorizontal: 15,
  },
});
