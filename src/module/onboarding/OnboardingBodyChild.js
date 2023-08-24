import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../utils/Measure';
import MText, {interRegular, medium, semiXLarge} from '../../common/MText';
import {GRAY, LITE_BLACK} from '../../utils/Color';

const OnboardingBodyChild = ({item, index}) => {
  return (
    <View style={styles.container}>
      <Image source={item?.image} style={styles.image} />
      <View style={{flex: 1}} />
      <MText
        size={semiXLarge}
        fontType={interRegular}
        color={LITE_BLACK}
        style={{
          lineHeight: 20,
          fontWeight: '700',
          textAlign: 'center',
          marginTop: '10%',
        }}>
        {item?.title}
      </MText>
      <MText
        size={medium}
        fontType={interRegular}
        color={GRAY}
        style={{
          lineHeight: 20,
          fontWeight: '400',
          textAlign: 'center',
          paddingHorizontal: 15,
          marginTop: 8,
        }}>
        {item?.des}
      </MText>
    </View>
  );
};

export default OnboardingBodyChild;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
  image: {
    width: windowWidth,
    height: windowHeight / 2,
    resizeMode: 'cover',
    marginTop: '20%',
  },
});
