import {Animated, StyleSheet, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import HeaderAnimatedChild from './HeaderAnimatedChild';
import {NativeModules} from 'react-native';
import {WHITE} from '../../utils/Color';
import {windowWidth} from '../../utils/Measure';
const {StatusBarManager} = NativeModules;
const height = StatusBarManager.HEIGHT;

const HeaderAnimated = ({
  array,
  categoryItems,
  width,
  setWidth,
  animObj,
  startAnim,
  horizontal,
  scrollY,
  horizotalRef,
  verticalRef,
}) => {
  return (
    <Animated.View
      style={{
        backgroundColor: WHITE,
        position: 'absolute',
        top: horizontal,
        width: windowWidth,
        zIndex: 1,
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [
                -1,
                0,
                horizontal - height - 47,
                horizontal - height - 47 + 10,
              ],
              outputRange: [0, 0, 0, 10],
            }),
          },
        ],
      }}>
      <FlatList
        ref={horizotalRef}
        data={[1]}
        listKey={'1233470th'}
        horizontal
        contentContainerStyle={{
          minWidth: windowWidth,
          zindex: 1,
        }}
        renderItem={() => {
          return categoryItems.map((item, index) => {
            return (
              <View
                key={
                  `${item.category?.index}` +
                  'nonFilterdata' +
                  categoryItems?.length
                }>
                <HeaderAnimatedChild
                  item={item}
                  index={index}
                  startAnim={startAnim}
                  animObj={animObj}
                  setWidth={setWidth}
                  length={categoryItems?.length}
                  array={array}
                  widths={width}
                  horizontal={horizontal}
                  verticalRef={verticalRef}
                  categoryItems={categoryItems}
                />
              </View>
            );
          });
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={_ => 5489 + 'MuinAHamed1234'}
      />
    </Animated.View>
  );
};

export default HeaderAnimated;

const styles = StyleSheet.create({});
