import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../common/Header';
import {useSelector} from 'react-redux';
import AppleStyleSwipeableRow from '../../common/AppleStyleSwipeableRow';
import CartItem from '../../common/CartItem';
import Summary from '../../common/Summary';
import {MButton} from '../../common/MButton';
import {WHITE} from '../../utils/Color';
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

  useEffect(() => {
    navigation.setOptions({title: 'My Baskets'});
  }, []);

  return (
    <View style={styles.container}>
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
        marginTop={10}
        marginBottom={10}
        borderRadius={10}
        onPress={() => navigation.navigate('checkout')}
        width={windowWidth - 30}
      />
      <SafeAreaView />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
