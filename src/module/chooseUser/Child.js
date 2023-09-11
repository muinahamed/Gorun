import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {deg} from 'react-native-linear-gradient-degree';
import MText, {interRegular, medium, semiSmall} from '../../common/MText';
import {useNavigation} from '@react-navigation/native';
import ARROW_RIGHT from '../../image/svg/arrow.svg';
import {windowWidth} from '../../utils/Measure';
import {BLACK} from '../../utils/Color';

const Child = ({item, index, onPress}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => onPress(index)}>
      <LinearGradient
        style={styles.gradient}
        colors={['rgba(39, 197, 207, 0.03)', 'rgba(39, 197, 207, 0.01)']}
        {...deg(90)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
            paddingVertical: 10,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <MText
              size={medium}
              fontType={interRegular}
              color={BLACK}
              style={{
                fontWeight: '500',
                marginBottom: 8,
                textAlign: 'justify',
              }}>
              {item?.title}
            </MText>
            <MText
              size={semiSmall}
              fontType={interRegular}
              color={'#737373'}
              style={{
                fontWeight: '400',
              }}>
              {item?.des}
            </MText>
          </View>

          <ARROW_RIGHT
            width={12}
            height={12}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Child;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  gradient: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.05)',
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  child: {
    width: 75,
    height: 75,
    marginLeft: (20 / 375) * windowWidth,
    resizeMode: 'contain',
  },
  arrow: darkMode => ({
    tintColor: BLACK,
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginRight: (14 / 375) * windowWidth,
    marginLeft: (11 / 375) * windowWidth,
    tintColor: darkMode ? WHITE : '',
  }),
});
