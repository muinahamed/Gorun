import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {windowHeight} from '../utils/Measure';

let tapOnBlack = 0;
const HEADER_HEIGHT = 50;

const PastOrderCommonModal = props => {
  const insets = useSafeAreaInsets();

  const {
    onRefresh,
    pointerEvents,
    backgroundColor,
    header,
    Body,
    setVisible,
    visible,
    setShopType,
  } = props;

  const [openHeight, setOpenHeight] = useState(300);
  const totalHeight = windowHeight - insets?.top - insets?.bottom;
  let lastScrollYValue = useRef(0).current;
  let lastScrollY = useRef(new Animated.Value(0)).current;
  let dragY = useRef(new Animated.Value(0)).current;
  let translateYOffset = useRef(new Animated.Value(totalHeight)).current;
  const SNAP_POINTS_FROM_TOP = useRef([0, totalHeight - openHeight]).current;
  const masterdrawer = React.createRef();
  const drawer = React.createRef();
  const longPress = React.createRef();
  const scroll = React.createRef();

  const START = SNAP_POINTS_FROM_TOP[0];
  const END = SNAP_POINTS_FROM_TOP[SNAP_POINTS_FROM_TOP.length - 1];
  const [state, setState] = useState({
    lastSnap: END,
    refreshing: false,
    longPress: true,
  });

  const onRegisterLastScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: lastScrollY}}}],
    {useNativeDriver: true},
  );

  lastScrollY.addListener(({value}) => {
    lastScrollYValue = value;
  });

  // lastScrollYValue;

  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: dragY}}],
    {useNativeDriver: true},
  );

  const reverseLastScrollY = Animated.multiply(
    new Animated.Value(-1),
    lastScrollY,
  );

  const translateY = Animated.add(
    translateYOffset,
    Animated.add(dragY, reverseLastScrollY),
  ).interpolate({
    inputRange: [-1, 0, 10],
    outputRange: [0, 0, 10],
    // extrapolate: 'clamp',
  });
  // console.log(state, SNAP_POINTS_FROM_TOP);
  const onHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent?.state == 2) {
      tapOnBlackBackground(-1);
    }

    if (nativeEvent.oldState === State.ACTIVE) {
      let {velocityY, translationY} = nativeEvent;
      translationY -= lastScrollYValue;
      const dragToss = 0.05;
      const endOffsetY = state.lastSnap + translationY + dragToss * velocityY;

      let destSnapPoint = SNAP_POINTS_FROM_TOP[0];
      for (let i = 0; i < SNAP_POINTS_FROM_TOP.length; i++) {
        const snapPoint = SNAP_POINTS_FROM_TOP[i];
        const distFromSnap = Math.abs(snapPoint - endOffsetY);
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint;
        }
      }
      // console.log(destSnapPoint);

      translateYOffset.extractOffset();
      translateYOffset.setValue(translationY);
      translateYOffset.flattenOffset();
      dragY.setValue(0);
      setState(state => ({...state, lastSnap: destSnapPoint}));

      if (
        destSnapPoint == SNAP_POINTS_FROM_TOP[1] &&
        endOffsetY - destSnapPoint > 200
      ) {
        setVisible && setVisible({status: true, anim: true});
      }

      Animated.spring(translateYOffset, {
        velocity: velocityY,
        tension: 68,
        friction: 12,
        toValue: destSnapPoint,
        useNativeDriver: true,
      }).start();
    }
  };

  const onRefreshCall = () => {
    setState(state => ({...state, refreshing: true}));
    onRefresh();
    setState(state => ({...state, refreshing: false}));
  };

  const LongPressStateChange = ({nativeEvent}) => {
    if (nativeEvent.state === State.ACTIVE) {
      setState({...state, longPress: true});
    } else if (nativeEvent.state !== 3) {
      setState({...state, longPress: false});
    }
  };
  // console.log(tapOnBlack);
  const tapOnBlackBackground = status => {
    tapOnBlack = tapOnBlack + status;

    if (tapOnBlack == 1) {
      setVisible({anim: true, status: true});
    }

    if (tapOnBlack > 0) {
      tapOnBlack = 0;
    }
  };

  const tab = ({nativeEvent}) => {
    if (nativeEvent.state === State.ACTIVE) {
      tapOnBlackBackground(1);
    }
  };

  useEffect(() => {
    Animated.spring(translateYOffset, {
      velocity: 10,
      tension: 68,
      friction: 12,
      toValue: totalHeight - openHeight,
      useNativeDriver: true,
    }).start();
  }, [openHeight]);

  useEffect(() => {
    if (visible?.anim) {
      Animated.spring(translateYOffset, {
        velocity: 10,
        tension: 68,
        friction: 12,
        toValue: totalHeight,
        useNativeDriver: true,
      }).start();
      setTimeout(() => setVisible({status: false, anim: false}), 300);
    }
  }, [visible]);

  return (
    <TapGestureHandler
      maxDurationMs={10000}
      onHandlerStateChange={tab}
      waitFor={longPress}
      ref={masterdrawer}
      maxDeltaY={state.lastSnap - SNAP_POINTS_FROM_TOP[0]}>
      <View
        style={[StyleSheet.absoluteFill, {backgroundColor, zIndex: 1}]}
        pointerEvents={pointerEvents}>
        <TouchableOpacity
          style={[StyleSheet.absoluteFill]}
          onPress={() => setVisible({status: true, anim: true})}
        />
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{translateY: translateY}],
            },
          ]}>
          <PanGestureHandler
            ref={drawer}
            simultaneousHandlers={[scroll, masterdrawer]}
            shouldCancelWhenOutside={false}
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}>
            <Animated.View
              style={styles.container}
              onLayout={e => {
                let height = e.nativeEvent.layout.height;
                SNAP_POINTS_FROM_TOP[1] = totalHeight - height;
                setState(state => ({
                  ...state,
                  lastSnap: SNAP_POINTS_FROM_TOP[1],
                }));
                setOpenHeight(height);
              }}>
              <NativeViewGestureHandler
                ref={scroll}
                disallowInterruption={false}
                waitFor={[masterdrawer, longPress]}
                simultaneousHandlers={[drawer, longPress]}>
                <Animated.FlatList
                  data={[1, 2]}
                  showsVerticalScrollIndicator={false}
                  stickyHeaderIndices={[0]}
                  contentContainerStyle={{paddingBottom: 20}}
                  style={[styles.scrollView]}
                  bounces={false}
                  keyExtractor={(item, index) => 'muinAhamed' + index}
                  onScrollBeginDrag={onRegisterLastScroll}
                  scrollEventThrottle={1}
                  renderItem={({index}) => {
                    if (index == 0) {
                      return header;
                    } else {
                      return Body;
                    }
                  }}
                />
              </NativeViewGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </View>
    </TapGestureHandler>
  );
};

export default PastOrderCommonModal;

const styles = StyleSheet.create({
  container: {},
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: 'gray',
  },
  modal: {
    backgroundColor: 'white',
    flex: 1,
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
  },
});
