import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import Header from '../../common/Header';
import ButlerCard from '../../common/ButlerCard';
import Summary from '../../common/Summary';
import {useSelector} from 'react-redux';
import {MButton} from '../../common/MButton';
import {PRIMARY_COLOR, WHITE} from '../../utils/Color';
import {interRegular} from '../../common/MText';
import {windowWidth} from '../../utils/Measure';
import CartItem from '../../common/CartItem';

const Checkout = () => {
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
      <Header title="Checkout" />
      <ScrollView>
        {cart?.map((item, index) => {
          return (
            <View key={index} style={{marginTop: 16}}>
              <CartItem item={item} onPress={() => {}} from={'checkout'} />
            </View>
          );
        })}
        <View style={{marginTop: 20}} />
        <ButlerCard
          title={'Delivery Address'}
          address={true}
          addressValue={{nickname: 'Niketan,road 6', latitude: 100}}
          from={'checkout'}
          button={true}
          edit={false}
        />
        <ButlerCard
          title={'Delivery Time'}
          time={true}
          deliveryTime={'Today 10Pm'}
          onPress={() => {}}
        />
        <ButlerCard title={'Payment Method'} payment={true} />
        <Summary
          currency={`$`}
          subTotal={subTotal()}
          deliveryCharge={10}
          total={subTotal() + 10}
          cash={subTotal() + 10}
        />
      </ScrollView>
      <MButton
        title={'Order Now'}
        color={PRIMARY_COLOR}
        textColor={WHITE}
        marginTop={10}
        marginBottom={10}
        borderRadius={10}
        fontFamily={interRegular}
        fontWeight={'600'}
        onPress={() => {}}
        paddingVertical={7}
        width={windowWidth - 30}
      />
    </ScreenWrapper>
  );
};

export default Checkout;

const styles = StyleSheet.create({});
