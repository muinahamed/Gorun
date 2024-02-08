import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButlerCard from '../../common/ButlerCard';
import Summary from '../../common/Summary';
import {useSelector} from 'react-redux';
import {MButton} from '../../common/MButton';
import {WHITE} from '../../utils/Color';
import {windowWidth} from '../../utils/Measure';
import CartItem from '../../common/CartItem';
import {getDeliveryChargeAndVat, placeOrder} from './Helper';
import WebView from 'react-native-webview';
import PaymentOption from '../../common/PaymentOption';
import {showErrorMessage} from '../../utils/BaseUtils';

const Checkout = ({navigation}) => {
  const {cart, shopId} = useSelector(state => state.orders);
  const {activeLocation} = useSelector(state => state.app);
  const [payment, setPayment] = useState('cash');
  const [sslWeb, setSslWeb] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryCharge, setDeliveryCharge] = useState({});
  const selected = activeLocation?.selected;

  const subTotal = () => {
    let count = 0;
    cart?.map(item => {
      count += item?.price * item?.quantity;
    });
    return count;
  };

  useEffect(() => {
    getDeliveryChargeAndVat(subTotal(), shopId, selected, setDeliveryCharge);
    navigation.setOptions({title: 'Checkout'});
  }, []);

  const placeOrderFunction = async () => {
    setLoading(true);
    let res = await placeOrder(
      cart,
      deliveryCharge,
      selected,
      payment,
      navigation,
    );
    setLoading(false);
    setSslWeb(res?.url);
  };

  const handleNavigationStateChange = event => {
    if (event.url.includes('payment-success')) {
      navigation?.navigate('OrderConfirmation', {
        orderData: {},
        orderId: event.url?.split('=')[1],
        from: 'checkout',
      });
    } else if (event.url.includes('payment-failure')) {
      showErrorMessage('There is an error!');
      setSslWeb(false);
    }
  };

  if (sslWeb)
    return (
      <SafeAreaView style={{flex: 1}}>
        <WebView
          source={{uri: sslWeb}}
          onNavigationStateChange={handleNavigationStateChange}
        />
      </SafeAreaView>
    );

  return (
    <View style={styles.container}>
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
          addressValue={{address: selected?.address, latitude: 100}}
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
        <PaymentOption props={{payment, setPayment}} />
        <ButlerCard title={'Payment Method'} payment={true} />
        <Summary
          currency={`$`}
          subTotal={subTotal()}
          deliveryCharge={deliveryCharge?.deliveryCharge}
          vat={deliveryCharge?.vat}
          total={
            subTotal() + deliveryCharge?.deliveryCharge + deliveryCharge?.vat
          }
        />
      </ScrollView>
      <MButton
        title={'Order Now'}
        marginTop={10}
        marginBottom={10}
        disabled={!deliveryCharge?.deliveryCharge || !deliveryCharge?.vat}
        loading={loading}
        onPress={() => placeOrderFunction()}
        width={windowWidth - 30}
      />
      <SafeAreaView />
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
