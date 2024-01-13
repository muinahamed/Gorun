import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
import {placeOrder} from './Helper';
import WebView from 'react-native-webview';

const Checkout = ({navigation}) => {
  const {cart} = useSelector(state => state.orders);
  const {activeLocation} = useSelector(state => state.app);
  const [sslWeb, setSslWeb] = useState(false);

  const selected = activeLocation?.selected;

  const subTotal = () => {
    let count = 0;
    cart?.map(item => {
      count += item?.price * item?.quantity;
    });
    return count;
  };

  const placeOrderFunction = async () => {
    let res = await placeOrder(cart, selected, navigation);
    // console.log(res, 'muin');
    setSslWeb(res?.url);
    // await Linking.openURL(res?.url);
  };

  const handleNavigationStateChange = event => {
    // Check the URL to determine if the payment was successful
    if (event.url.includes('payment-success')) {
      setSslWeb();
      navigation?.navigate('OrderConfirmation', {
        orderData: {},
        orderId: url?.split('=')[1],
      });
    } else if (event.url.includes('payment-failure')) {
      console.log('muin opol');
    }
  };

  let url =
    'https://gorun.onrender.com/app/user/order/ssl-payment-success?orderId=65a289be259484aae0b2d60e';

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
        onPress={() => placeOrderFunction()}
        paddingVertical={7}
        width={windowWidth - 30}
      />
    </ScreenWrapper>
  );
};

export default Checkout;

const styles = StyleSheet.create({});
