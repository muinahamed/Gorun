import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import USER from '../../image/svg/user.svg';
import LOCATION from '../../image/svg/location.svg';
import ARROW from '../../image/svg/arrowDown.svg';
import MText, {interRegular, large, small} from '../../common/MText';
import {RED, WHITE} from '../../utils/Color';

const HomeHeader = ({}) => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={[styles.flex, {flex: 1}]}>
        <LOCATION fill={RED} />
        <View style={{marginHorizontal: 6, flex: 1}}>
          <View style={styles.flex}>
            <MText
              size={large}
              fontType={interRegular}
              color={'#363636'}
              numberOfLines={1}
              style={{
                fontWeight: '700',
                marginRight: 6,
              }}>
              {'Current Location'}
            </MText>
            <ARROW stroke={'#262626'} />
          </View>
          <MText
            size={small}
            fontType={interRegular}
            color={'#696969'}
            numberOfLines={1}
            style={{
              fontWeight: '500',
              lineHeight: 19,
            }}>
            {`Gulshan, Niketan road 6`}
          </MText>
        </View>
      </TouchableOpacity>

      <View style={styles.flex}>
        <TouchableOpacity>
          <USER fill={RED} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  mother: {
    zIndex: 1,
    backgroundColor: WHITE,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 4,
  },

  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  border: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: RED,
    borderRadius: 7,
    marginRight: 13,
  },
});
