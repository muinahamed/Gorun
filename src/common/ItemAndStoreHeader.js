import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MText, {interRegular, medium} from './MText';
import {LITE_BLACK, SECOND_PRIMARY} from '../utils/Color';

import LineBreak from './LineBreak';
import {windowWidth} from '../utils/Measure';

const ItemAndStoreHeader = props => {
  const {
    selectItemOrStores,
    setSelectItemOrStores,
    listRef,
    scrollX,
    stableStatus,
    itemLength,
    storeLength,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <TouchableOpacity
          onPress={() => {
            setSelectItemOrStores('Items');
            if (!stableStatus) {
              scrollX.setValue(0);
            } else {
              listRef?.current?.scrollToIndex({index: 0});
            }
          }}
          style={{flex: 1, alignItems: 'center'}}>
          <MText
            size={medium}
            fontType={interRegular}
            color={LITE_BLACK}
            style={{
              fontWeight: selectItemOrStores === 'Items' ? '600' : '400',
            }}>
            Items {stableStatus && `(${itemLength})`}
          </MText>
          <Animated.View
            style={{
              width: '80%',
              marginTop: 13,
              height: 3,
              backgroundColor: SECOND_PRIMARY,
              transform: [
                {
                  translateX: scrollX.interpolate({
                    inputRange: [0, windowWidth],
                    outputRange: [0, (windowWidth - 60) / 2 + 12], // 0 : 150, 0.5 : 75, 1 : 0
                  }),
                },
              ],
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectItemOrStores('Stores');
            if (!stableStatus) {
              scrollX.setValue(windowWidth);
            } else {
              listRef?.current?.scrollToIndex({index: 1});
            }
          }}
          style={{marginLeft: 12, flex: 1, alignItems: 'center'}}>
          <MText
            size={medium}
            fontType={interRegular}
            color={'#404040'}
            style={{
              fontWeight: selectItemOrStores === 'Items' ? '400' : '600',
            }}>
            Stores {stableStatus && `(${storeLength})`}
          </MText>
        </TouchableOpacity>
      </View>
      <LineBreak />
    </View>
  );
};

export default ItemAndStoreHeader;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    zIndex: 10,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
