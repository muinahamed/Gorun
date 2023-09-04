import {Alert, StyleSheet, View} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import OVText, {
  extraSmall,
  interRegular,
  medium,
  small,
} from '../../components/OVText';
import {
  BABYBLUE,
  LITE_BLACK,
  ORDER_ID_GRAY,
  RED,
  TEXT_GRAY,
  WHITE,
} from '../../utils/Colors';
import {AuthContext} from '../../services/authProvider';
import PLUSBOLD from '../../images/svg/boldPlus.svg';
import DELETE from '../../images/svg/trash.svg';
import MINUS from '../../images/svg/minusOnly.svg';
import {addToCart, removeItem} from '../../state/cart/Actions';

import {TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {
  addToCartHelper,
  removeItemHelper,
} from '../../components/CartReducerFunctionHelper/CartReducerFunction';
import {getDealsFromProduct} from '../../common/DealsCalculationHelperFunction';
import {requiredLogin} from '../../common/RequiredLogin';
import ImageBackgroundLazy from '../../images/lazyImage/ImageBackgroundLazy';

const ProductView = ({item, shopId, shopMaxDiscount}) => {
  const navigation = useNavigation();
  const {addedItems, groupCartInfo} = useSelector(state => state?.cart);
  const cartState = useSelector(state => state?.cart);
  const {currency, user} = useContext(AuthContext);
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const totalWidth = useSharedValue(36);
  const timer = useRef();

  const active =
    item?.marketing?.isActive && item?.marketing?.type == 'percentage';

  const doubleDeal =
    item?.marketing?.type == 'double_menu' && item?.marketing?.isActive;

  const getCurrentCartItem = itemData => {
    const result = addedItems?.filter(
      item => item._id === itemData?._id && item?.owner?._id == user?._id,
    );

    let count = 0;
    result?.map(item => {
      count = item?.quantity + count;
    });
    return count;
  };

  const takeActionAfterSomeTime = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      totalWidth.value = withTiming(36);
      setExpand(false);
    }, 4000);
  };
  // console;

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

  const checkIfThereAnyAttribute = () => {
    let required = false;
    item?.attributes?.map(item => {
      if (item?.required == true) required = true;
    });
    return required;
  };

  const count = getCurrentCartItem(item);

  // console.log(item, currency);

  return (
    <TouchableOpacity
      disabled={groupCartInfo?.cartStatus == 'lock'}
      onPress={() =>
        navigation.navigate('NewProductDetails', {
          item: item?._id,
        })
      }
      style={[styles.flex, {marginHorizontal: 15, overflow: 'hidden'}]}>
      <View style={{flex: 1, marginRight: 20, maxHeight: 85}}>
        <OVText
          size={medium}
          numberOfLines={1}
          fontType={interRegular}
          color={LITE_BLACK}
          style={{fontWeight: '500', lineHeight: 22}}>
          {item?.name}
        </OVText>
        <OVText
          size={small}
          fontType={interRegular}
          color={TEXT_GRAY}
          numberOfLines={1}
          style={{
            fontWeight: '400',
            lineHeight: 20,
          }}>
          {item?.seoDescription}
        </OVText>
        <View style={styles.flex}>
          <OVText
            numberOfLines={1}
            size={small}
            fontType={interRegular}
            color={LITE_BLACK}
            style={{
              fontWeight: '600',
            }}>
            {item?.secondaryPrice &&
              `${currency?.secondaryCurrency?.code} ${
                active
                  ? item?.secondaryDiscountPrice?.toFixed()
                  : item?.secondaryPrice?.toFixed()
              } ~ `}
            {currency?.symbol}
            {active ? Math.round(item?.discountPrice * 100) / 100 : item?.price}
          </OVText>

          {active && (
            <OVText
              numberOfLines={1}
              size={small}
              fontType={interRegular}
              color={RED}
              style={{
                textDecorationLine: 'line-through',
                fontWeight: '600',
                marginLeft: 6,
              }}>
              {item?.secondaryPrice
                ? `${currency?.secondaryCurrency?.code} ${item?.secondaryPrice}`
                : `${currency?.symbol}${item?.price}`}
            </OVText>
          )}

          {item?.marketing?.type == 'reward' && item?.marketing?.isActive && (
            <OVText
              size={extraSmall}
              fontType={interRegular}
              numberOfLines={1}
              style={{
                color: ORDER_ID_GRAY,
                fontWeight: '500',
              }}>
              {` or `}
              <OVText
                size={extraSmall}
                fontType={interRegular}
                numberOfLines={1}
                style={{
                  color: BABYBLUE,
                }}>
                {`${currency?.symbol}${item?.reward?.amount} + ${item?.reward?.points}Pts`}
              </OVText>
            </OVText>
          )}
        </View>
        <OVText
          size={extraSmall}
          fontType={interRegular}
          numberOfLines={1}
          style={{
            color: RED,
            fontWeight: '500',
            lineHeight: 20,
          }}>
          {getDealsFromProduct(
            item,
            currency?.symbol,
            shopMaxDiscount,
            currency?.maxDiscount,
          )}
        </OVText>
      </View>
      <ImageBackgroundLazy
        source={{uri: item.images[0]}}
        imageStyle={{borderRadius: 7}}
        style={{
          width: 96,
          height: 85,
          alignItems: 'flex-end',
        }}>
        <Animated.View
          style={[
            styles.flex,
            styles.container,
            widthStyle,
            {opacity: groupCartInfo?.cartStatus == 'lock' ? 0.8 : 1},
          ]}>
          <Animated.View style={[styles.flex, deleteStyle]}>
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  removeItem(
                    removeItemHelper({...cartState}, {...item, owner: user}),
                    shopId,
                    user,
                  ),
                );
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
              <OVText
                size={small}
                fontType={interRegular}
                color={RED}
                style={{
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                {count}
              </OVText>
            </View>
          </Animated.View>

          <TouchableOpacity
            disabled={groupCartInfo?.cartStatus == 'lock'}
            style={[styles.plus]}
            onPress={() => {
              if (!user) {
                requiredLogin(navigation);
                return;
              }
              if (checkIfThereAnyAttribute() || doubleDeal) {
                navigation.navigate('NewProductDetails', {item: item?._id});
                return;
              }

              if ((!expand && count == 0) || expand) {
                let updateCart = addToCartHelper(
                  {...cartState},
                  {...item, owner: user},
                );

                if (updateCart?.error) {
                  Alert.alert(updateCart?.error);
                  return;
                }

                dispatch(addToCart(updateCart, shopId, user));
              }
              // run animation

              totalWidth.value = withTiming(92);
              setExpand(true);
              takeActionAfterSomeTime();
            }}>
            <PLUSBOLD stroke={RED} fill={RED} />

            {!expand && count > 0 && (
              <OVText
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
              </OVText>
            )}
          </TouchableOpacity>
        </Animated.View>
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
