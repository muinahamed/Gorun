import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import MText, {interRegular, semiMedium} from './MText';
import {BLACK, RED, SECOND_PRIMARY, WHITE} from '../utils/Color';
import {useRef} from 'react';
import PLUS from '../image/svg/plus.svg';
import MINUS from '../image/svg/minus.svg';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../store/slices/orderSlice';
import {
  addToCartHelper,
  removeFromCartHelper,
} from '../store/reduxHelperFunction';

const CartItem = ({item, from}) => {
  const {cart} = useSelector(state => state.orders);
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const check = useRef(0);

  const beforeAddThinkAbout = () => {
    dispatch(addToCart(addToCartHelper(cart, item)));
  };

  let animationState = () => {
    Animated.spring(fadeAnim, {
      toValue: check.current === 0 ? 1 : 0,
      useNativeDriver: true,
      stiffness: 300,
      damping: 10,
      mass: 1,
    }).start();

    if (check.current === 1) {
      check.current = 0;
    } else {
      check.current = 1;
    }
  };

  const deleteFunction = () => {
    dispatch(removeFromCart(removeFromCartHelper(cart, item)));
  };

  const Animation = () => {
    return (
      <View>
        <Animated.View
          style={[
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 0.3, 1],
                outputRange: [0, 0, 1],
              }),
              transform: [
                {
                  translateX: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 50],
                  }),
                },
              ],
            },
            styles.anim,
          ]}>
          <Pressable
            style={styles.icon}
            onPress={() => {
              deleteFunction();
            }}>
            <MINUS width={14} hright={14} fill={SECOND_PRIMARY} />
          </Pressable>
          <View
            style={{
              height: '70%',
              width: 1,
              backgroundColor: '#EEEEEE',
            }}
          />
          <Pressable
            style={styles.icon}
            onPress={() => {
              beforeAddThinkAbout();
            }}>
            <PLUS width={14} hright={14} fill={SECOND_PRIMARY} />
          </Pressable>
        </Animated.View>
        <Pressable
          onPress={() => {
            animationState();
          }}>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    scaleY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
              styles.animButton,
            ]}>
            <Animated.View
              style={{
                transform: [
                  {
                    translateX: fadeAnim.interpolate({
                      inputRange: [0, 0.2, 0.7, 1],
                      outputRange: [0, 0, 7, 7],
                    }),
                  },
                  {
                    scaleY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1.2, 1],
                    }),
                  },
                ],
              }}>
              <MText
                size={semiMedium}
                fontType={interRegular}
                color={RED}
                style={{
                  color: RED,
                  fontWeight: '500',
                }}>
                {item?.quantity}
              </MText>
            </Animated.View>
          </Animated.View>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', marginTop: 12}}>
        <ImageBackground
          source={{uri: item?.images[0]}}
          style={styles.Item}
          imageStyle={{borderRadius: 5}}
        />

        <View style={{flex: 1, marginStart: 12}}>
          <View style={styles.child}>
            <MText
              size={semiMedium}
              fontType={interRegular}
              color={BLACK}
              numberOfLines={1}
              style={{
                fontWeight: '500',
                flex: 1,
              }}>
              {item?.name}
            </MText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {from !== 'checkout' && <Animation />}
          </View>
        </View>
        <MText
          size={semiMedium}
          fontType={interRegular}
          color={BLACK}
          numberOfLines={1}
          style={{
            fontWeight: '500',
          }}>
          ${item?.price}
        </MText>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    backgroundColor: WHITE,
  },
  Item: {
    width: 55,
    height: 55,
    borderRadius: 5,
  },
  child: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrow: {
    width: 11,
    height: 11,
    marginLeft: 2,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
  anim: {
    position: 'absolute',
    width: 90,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 5,
  },
  animButton: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    flexDirection: 'row',
    borderRadius: 5,
  },
  icon: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remove: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
  },
});
