import {
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import MapViewOrder from './MapViewOrder';
import Header from '../../common/Header';
import ButlerCard from '../../common/ButlerCard';
import Summary from '../../common/Summary';
import API from '../../service/API';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GET_SINGLE_ORDER_DETAILS} from '../../service/ApiEndPoint';
import {useNavigation} from '@react-navigation/native';
import Cross from '../../image/svg/cross.svg';

const OrderConfirmation = ({route}) => {
  const navigation = useNavigation();
  const inserts = useSafeAreaInsets();
  const {orderId, from} = route?.params;
  const [orderData, setOrderData] = useState({});

  let orderDetails = async () => {
    let res = await API.get(GET_SINGLE_ORDER_DETAILS + orderId);
    if (res?.status) {
      setOrderData(res?.data?.order);
    }
  };

  useEffect(() => {
    if (orderId) {
      orderDetails();
    } else {
      setOrderData(route?.params?.orderData);
    }
  }, []);

  useEffect(() => {
    const customLeftButtonAction = () => {
      if (from == 'checkout') navigation.navigate('home');
      else navigation.goBack();

      return true;
    };

    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{paddingRight: 15}}
          onPress={customLeftButtonAction}>
          <Cross />
        </TouchableOpacity>
      ),
    });

    // Subscribe to the hardware back button event
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      customLeftButtonAction,
    );

    // Clean up the event listener when the component is unmounted
    return () => backHandler.remove();
  }, [navigation]);

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
