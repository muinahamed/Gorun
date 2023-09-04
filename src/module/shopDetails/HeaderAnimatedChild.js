import {StyleSheet, View, Animated, Pressable} from 'react-native';
import React, {useCallback, useRef} from 'react';
import MText, {interRegular, small} from '../../common/MText';
import {LITE_BLACK, RED} from '../../utils/Color';
import {NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;
const height = StatusBarManager.HEIGHT;

const HeaderAnimatedChild = ({
  length,
  item,
  setWidth,
  startAnim,
  animObj,
  verticalRef,
  array,
  widths,
  horizontal,
  index,
  categoryItems,
}) => {
  const scale = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(scale, {
      toValue: 1,
      delay: 50,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  let temp = 0;

  const onComponentLayout = useCallback(
    ({nativeEvent: {layout}}) => {
      let {width} = layout;
      array[item?.category?.index] = width;
      let obj = Object.keys(array);
      if (obj.length === length) {
        obj.length === 1
          ? setWidth({...array, 1: width + 0.1})
          : setWidth({...array});
      }
      if (item?.category?.index == 0) {
        startAnimation();
      }
    },
    [length, categoryItems],
  );

  return (
    <Pressable
      style={{height: 44, alignItems: 'center', justifyContent: 'center'}}
      onPress={() => {
        verticalRef?.current?.scrollToOffset({
          offset: horizontal - height - 47 + animObj[index] + 2,
        });
      }}>
      <View
        onLayout={onComponentLayout}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 12,
        }}>
        <MText
          size={small}
          fontType={interRegular}
          color={LITE_BLACK}
          style={{fontWeight: '600'}}>
          {item?.category?.name}
        </MText>
      </View>
      <Animated.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 12,
          position: 'absolute',

          opacity: startAnim.interpolate({
            inputRange: [index - 0.1, index, index + 0.1],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          }),
        }}>
        <MText
          size={small}
          fontType={interRegular}
          style={{color: RED, fontWeight: '600'}}>
          {item?.category?.name}
        </MText>
      </Animated.View>

      {index === 0 && widths !== null && (
        <Animated.View
          style={{
            width: widths[0],
            height: 3.5,
            borderRadius: 10,
            zIndex: 1,
            position: 'absolute',
            bottom: 0,
            backgroundColor: RED,
            transform: [
              {
                translateX: startAnim.interpolate({
                  inputRange: Object.keys(widths).map((i, index) => {
                    return index;
                  }),
                  outputRange: Object.keys(widths).map((i, index) => {
                    if (index !== 0) {
                      temp = widths[index - 1] + temp + 24;
                    } else {
                      temp = 0;
                    }

                    return temp - (widths[0] - widths[index]) / 2;
                  }),
                }),
              },
              {
                scaleX: startAnim.interpolate({
                  inputRange: Object.keys(widths).map((i, index) => {
                    return index;
                  }),
                  outputRange: Object.keys(widths).map((i, index) => {
                    if (index !== 0) {
                      temp = (1 / widths[0]) * widths[index];
                    } else {
                      temp = 1;
                    }

                    return temp;
                  }),
                }),
              },
              {
                scaleX: scale,
              },
            ],
          }}></Animated.View>
      )}
    </Pressable>
  );
};

export default HeaderAnimatedChild;

const styles = StyleSheet.create({});
