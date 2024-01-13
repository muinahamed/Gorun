import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import MapViewOrder from './MapViewOrder';
import Header from '../../common/Header';
import ButlerCard from '../../common/ButlerCard';
import Summary from '../../common/Summary';
import API from '../../service/API';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GET_SINGLE_ORDER_DETAILS} from '../../service/ApiEndPoint';

const OrderConfirmation = ({route}) => {
  const inserts = useSafeAreaInsets();
  const {orderId} = route?.params;
  const [orderData, setOrderData] = useState({});

  let orderDetails = async () => {
    console.log(GET_SINGLE_ORDER_DETAILS + orderId);
    let res = await API.get(GET_SINGLE_ORDER_DETAILS + orderId);

    if (res?.status) {
      setOrderData(res?.data?.order);
    }
  };

  useEffect(() => {
    if (orderId) {
      orderDetails();
    }
  }, []);

  const origin = {
    latitude: orderData?.shopAddress?.latitude,
    longitude: orderData?.shopAddress?.longitude,
  };

  let destination = {
    latitude: orderData?.deliveryAddress?.latitude,
    longitude: orderData?.deliveryAddress?.longitude,
  };

  if (!orderData?._id)
    return <ActivityIndicator size={'large'} style={{marginTop: '30%'}} />;

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
