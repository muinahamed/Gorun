import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {RED, WHITE} from '../utils/Color';
import TRASH from '../image/svg/trashWhite.svg';

const SwipeAbleDeleteWithIcon = props => {
  const {children} = props;
  const onPress = children?.props?.onPress;
  const swipeableRow = useRef();
  const renderRightAction = (text, color, x, progress) => {
    return (
      <Animated.View style={{flex: 1, transform: [{translateX: 0}]}}>
        <RectButton
          style={[
            styles.rightAction,
            {
              backgroundColor: color,
            },
          ]}
          onPress={() => {
            swipeableRow?.current?.close();
            setTimeout(() => onPress(), 200);
          }}>
          <TRASH stroke={WHITE} />
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
      {renderRightAction('Delete', RED, 64, progress)}
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

export default SwipeAbleDeleteWithIcon;

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
