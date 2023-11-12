import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import MapViewOrder from './MapViewOrder';
import Header from '../../common/Header';
import ButlerCard from '../../common/ButlerCard';
import Summary from '../../common/Summary';

const OrderConfirmation = ({route}) => {
  const {orderData} = route?.params;

  const origin = {
    latitude: orderData?.shopAddress?.latitude,
    longitude: orderData?.shopAddress?.longitude,
  };
  let destination = {
    latitude: orderData?.deliveryAddress?.latitude,
    longitude: orderData?.deliveryAddress?.longitude,
  };

  return (
    <ScreenWrapper>
      <Header title="Order Confirmation" />
      <MapViewOrder destination={destination} origin={origin} />
      <ButlerCard
        title={'Pickup Address'}
        address={true}
        addressValue={orderData?.shopAddress}
        button={true}
        edit={false}
      />
      <ButlerCard
        title={'Delivery Address'}
        address={true}
        addressValue={orderData?.deliveryAddress}
        button={true}
        edit={false}
      />
      <ButlerCard title={'Payment Method'} payment={true} />
      <Summary
        currency={`$`}
        subTotal={orderData?.summary?.totalAmount}
        deliveryCharge={orderData?.summary?.deliveryCharge}
        total={orderData?.summary?.totalAmount}
        cash={orderData?.summary?.totalAmount}
      />
    </ScreenWrapper>
  );
};

export default OrderConfirmation;

const styles = StyleSheet.create({});
