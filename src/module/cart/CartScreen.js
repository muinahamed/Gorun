import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import Header from '../../common/Header';
import {useSelector} from 'react-redux';
import AppleStyleSwipeableRow from '../../common/AppleStyleSwipeableRow';
import CartItem from '../../common/CartItem';
import Summary from '../../common/Summary';
import {MButton} from '../../common/MButton';
import {PRIMARY_COLOR, WHITE} from '../../utils/Color';
import {interRegular} from '../../common/MText';
import {windowWidth} from '../../utils/Measure';

const CartScreen = ({navigation}) => {
  const {cart} = useSelector(state => state.orders);
  const subTotal = () => {
    let count = 0;
    cart?.map(item => {
      count += item?.price * item?.quantity;
    });
    return count;
  };
  return (
    <ScreenWrapper>
      <Header title="My Basket" />

      {cart?.map((item, index) => {
        return (
          <View key={index} style={{marginTop: 16}}>
            <AppleStyleSwipeableRow>
              <CartItem item={item} onPress={() => {}} />
            </AppleStyleSwipeableRow>
          </View>
        );
      })}
      <View style={{marginTop: 20}} />
      <Summary
        currency={`$`}
        subTotal={subTotal()}
        deliveryCharge={10}
        total={subTotal() + 10}
        cash={subTotal() + 10}
      />
      <View style={{flex: 1}} />
      <MButton
        title={'Checkout'}
        color={PRIMARY_COLOR}
        textColor={WHITE}
        marginTop={10}
        marginBottom={10}
        borderRadius={10}
        fontFamily={interRegular}
        fontWeight={'600'}
        onPress={() => navigation.navigate('checkout')}
        paddingVertical={7}
        width={windowWidth - 30}
      />
    </ScreenWrapper>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
