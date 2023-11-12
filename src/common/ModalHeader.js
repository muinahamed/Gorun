import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import MText, {interRegular, large, semiMedium} from './MText';
import {RED, WHITE} from '../utils/Color';
import {windowWidth} from '../utils/Measure';

const ModalHeader = ({
  title,
  Press,
  resetFilterData,
  cross,
  RightIcon,
  RightIconPress,
  arrow,
  hideModalTop,
  status,
}) => {
  return (
    <View style={styles.header}>
      {!hideModalTop && <View style={styles.modalTopLine} />}
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            alignItems: 'center',
            marginHorizontal: 50,
          }}>
          <MText
            size={large}
            fontType={interRegular}
            color={'#262626'}
            numberOfLines={1}
            style={{
              fontWeight: '600',
              lineHeight: 20,
            }}>
            {title}
          </MText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: windowWidth - 30,
          }}>
          {RightIcon && (
            <TouchableOpacity
              onPress={() => RightIconPress()}
              style={{padding: 6}}>
              <RightIcon />
            </TouchableOpacity>
          )}
          {resetFilterData && !status && (
            <TouchableOpacity
              style={{padding: 3}}
              onPress={() => {
                resetFilterData();
              }}>
              <MText
                size={semiMedium}
                fontType={interRegular}
                color={RED}
                style={{
                  fontWeight: '500',
                }}>
                Clear All
              </MText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  modalTopLine: {
    width: 51,
    height: 6,
    backgroundColor: '#E5E7E9',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 8,
  },
  header: {
    backgroundColor: WHITE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 12,
  },
});
