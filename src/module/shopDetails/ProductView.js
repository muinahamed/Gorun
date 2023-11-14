import {StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import MText, {interRegular, medium, small} from '../../common/MText';
import {LITE_BLACK, RED, TEXT_GRAY, WHITE} from '../../utils/Color';
import PLUSBOLD from '../../image/svg/boldPlus.svg';
import DELETE from '../../image/svg/trash.svg';
import MINUS from '../../image/svg/minusOnly.svg';
import {TouchableOpacity} from 'react-native';
import ImageBackgroundLazy from '../../common/ImageBackgroundLazy';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  addToCartHelper,
  removeFromCartHelper,
} from '../../store/reduxHelperFunction';
import {addToCart, removeFromCart} from '../../store/slices/orderSlice';
import {useNavigation} from '@react-navigation/native';

const ProductView = ({item, shopType}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {cart, subTotal} = useSelector(state => state.orders);
  const [expand, setExpand] = useState(false);
  const timer = useRef();
  const totalWidth = useSharedValue(36);

  const takeActionAfterSomeTime = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      totalWidth.value = withTiming(36);
      setExpand(false);
    }, 4000);
  };

  const widthStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(totalWidth.value, [0, 36, 92], [0, 36, 92]),
    };
  });

  const deleteStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(totalWidth.value, [0, 36, 80, 92], [0, 0, 0, 1]),
      width: interpolate(totalWidth.value, [0, 36, 92], [0, 0, 56]),
    };
  });

  const countFunction = () => {
    let result = 0;
    cart?.map(child => {
      if (child?._id == item?._id) result += child.quantity;
    });
    return result;
  };

  let count = countFunction();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('productDetails', {productDetails: item})
      }
      style={[styles.flex, {marginHorizontal: 15, overflow: 'hidden'}]}>
      <View style={{flex: 1, marginRight: 20, maxHeight: 85}}>
        <MText
          size={medium}
          numberOfLines={1}
          fontType={interRegular}
          color={LITE_BLACK}
          style={{fontWeight: '500', lineHeight: 22}}>
          {item?.name}
        </MText>
        <MText
          size={small}
          fontType={interRegular}
          color={TEXT_GRAY}
          numberOfLines={1}
          style={{
            fontWeight: '400',
            lineHeight: 20,
          }}>
          {item?.seoDescription}
        </MText>
        <View style={styles.flex}>
          <MText
            numberOfLines={1}
            size={small}
            fontType={interRegular}
            color={LITE_BLACK}
            style={{
              fontWeight: '600',
            }}>
            ${item?.price}
          </MText>
        </View>
      </View>
      <ImageBackgroundLazy
        source={{uri: item.images[0]}}
        imageStyle={{borderRadius: 7}}
        style={{
          width: 96,
          height: 85,
          alignItems: 'flex-end',
        }}>
        {!shopType && (
          <Animated.View style={[styles.flex, styles.container, widthStyle]}>
            <Animated.View style={[styles.flex, deleteStyle]}>
              <TouchableOpacity
                onPress={() => {
                  if (expand && count > 0) {
                    dispatch(removeFromCart(removeFromCartHelper(cart, item)));
                  }
                  if (count == 1) {
                    totalWidth.value = withTiming(36);
                    return;
                  }
                  takeActionAfterSomeTime();
                }}
                style={styles.plus}>
                {count == 1 ? (
                  <DELETE width={13} height={13} />
                ) : (
                  <MINUS stroke={RED} fill={RED} />
                )}
              </TouchableOpacity>

              <View
                style={{
                  width: 21,
                }}>
                <MText
                  size={small}
                  fontType={interRegular}
                  color={RED}
                  style={{
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  {count}
                </MText>
              </View>
            </Animated.View>

            <TouchableOpacity
              style={[styles.plus]}
              onPress={() => {
                if (expand || (!expand && count == 0)) {
                  dispatch(addToCart(addToCartHelper(cart, item)));
                }
                totalWidth.value = withTiming(92);
                setExpand(true);
                takeActionAfterSomeTime();
              }}>
              <PLUSBOLD stroke={RED} fill={RED} />

              {!expand && count > 0 && (
                <MText
                  size={small}
                  fontType={interRegular}
                  color={RED}
                  style={{
                    fontWeight: '600',
                    textAlign: 'center',
                    position: 'absolute',
                    backgroundColor: 'white',
                  }}>
                  {count}
                </MText>
              )}
            </TouchableOpacity>
          </Animated.View>
        )}
      </ImageBackgroundLazy>
    </TouchableOpacity>
  );
};

export default ProductView;

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    backgroundColor: WHITE,
    borderColor: RED,
    bottom: 2,
    width: 92,
    right: 2,
    borderWidth: 0.5,
    borderRadius: 7,
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
  },
  plus: {
    height: 28,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  Show: {
    position: 'absolute',
    backgroundColor: WHITE,
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: RED,
    right: 2,
    bottom: 2,
    left: 0,
  },
});
