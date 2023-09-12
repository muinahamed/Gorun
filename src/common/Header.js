import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ARROW} from '../image/SvgPath';
import MText, {interRegular, large} from './MText';
import {LITE_BLACK} from '../utils/Color';
import {useNavigation} from '@react-navigation/native';

const Header = ({back = true, title = 'Verify Number'}) => {
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
        onPress={() => navigation.goBack()}
        style={[styles.button, {opacity: back ? 1 : 0}]}>
        <ARROW />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
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
