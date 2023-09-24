import React, {Component, useRef} from 'react';
import {Animated, StyleSheet, Text, View, I18nManager} from 'react-native';

import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {PRIMARY_COLOR} from '../utils/Color';

const AppleStyleSwipeableRow = props => {
  const {children} = props;
  const onPress = children?.props?.onPress;
  const swipeableRow = useRef();
  const renderRightAction = (text, color, x, progress) => {
    return (
      <Animated.View style={{flex: 1, transform: [{translateX: 0}]}}>
        <RectButton
          style={[styles.rightAction, {backgroundColor: color}]}
          onPress={() => {
            swipeableRow?.current?.close();
            setTimeout(() => onPress(), 200);
          }}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };
  const renderRightActions = progress => (
    <View
      style={{
        width: 70,
        flexDirection: 'row',
      }}>
      {renderRightAction('Delete', PRIMARY_COLOR, 64, progress)}
    </View>
  );

  return (
    <Swipeable
      ref={swipeableRow}
      friction={3}
      rightThreshold={40}
      renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
};

export default AppleStyleSwipeableRow;

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
