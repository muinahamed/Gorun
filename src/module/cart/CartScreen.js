import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import Header from '../../common/Header';
import {useSelector} from 'react-redux';
import AppleStyleSwipeableRow from '../../common/AppleStyleSwipeableRow';
import CartItem from '../../common/CartItem';

const CartScreen = () => {
  const {cart} = useSelector(state => state.orders);
  return (
    <ScreenWrapper>
      <Header title="My Basket" />
      {cart?.map((item, index) => {
        return (
          <View key={index} style={{marginTop: 16}}>
            <AppleStyleSwipeableRow>
              <CartItem item={item} />
            </AppleStyleSwipeableRow>
          </View>
        );
      })}
    </ScreenWrapper>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
