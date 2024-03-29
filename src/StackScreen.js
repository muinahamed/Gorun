import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './module/onboarding/Onboarding';
import MobileSignup from './module/signup/MobileSignup';
import OtpVerification from './module/signup/OtpVerification';
import Home from './module/homeScreen/Home';
import ShopDetails from './module/shopDetails/ShopDetails';
import SearchAll from './module/searchAll/SearchAll';
import Splash from './module/splash/Splash';
import ChooseUser from './module/chooseUser/ChooseUser';
import UserRegistration from './module/signup/UserRegistration';
import More from './module/more/More';
import MyProfile from './module/profile/MyProfile';
import ShopRegistration from './module/signup/ShopRegistration';
import CartScreen from './module/cart/CartScreen';
import Checkout from './module/checkout/Checkout';
import ProductDetails from './module/productDetails/ProductDetails';
import CategoryDetails from './module/categoryDetails/CategoryDetails';
import MyAddress from './module/myAddress/MyAddress';
import OrderConfirmation from './module/orderConfirmation/OrderConfirmation';
import ViewAll from './module/viewAllShop/ViewAll';
import MyOrder from './module/myOrder/MyOrder';
import MyFavourite from './module/favourite/MyFavourite';
import OfflinePurchesHistory from './module/offlinePurchesHistory/OfflinePurchesHistory';
import PurchasesRequest from './module/purchasesRequest/PurchasesRequest';
import Balance from './module/balance/Balance';
const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="chooseUser"
        component={ChooseUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="onboarding"
        component={Onboarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="mobileSignup"
        component={MobileSignup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="otpVerification"
        component={OtpVerification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="categoryDetails" component={CategoryDetails} />
      <Stack.Screen name="more" component={More} />
      <Stack.Screen name="myProfile" component={MyProfile} />
      <Stack.Screen
        name="shopDetails"
        component={ShopDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="productDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen name="viewAll" component={ViewAll} />
      <Stack.Screen
        name="searchAll"
        component={SearchAll}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="userRegistration"
        component={UserRegistration}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="shopRegistration"
        component={ShopRegistration}
        options={{headerShown: false}}
      />
      <Stack.Screen name="cartScreen" component={CartScreen} />
      <Stack.Screen name="checkout" component={Checkout} />
      <Stack.Screen
        name="MyAddress"
        component={MyAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen name="myOrder" component={MyOrder} />
      <Stack.Screen name="myFavourite" component={MyFavourite} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
      <Stack.Screen
        name="offlinePurchesHistory"
        component={OfflinePurchesHistory}
      />
      <Stack.Screen name="purchasesRequest" component={PurchasesRequest} />
      <Stack.Screen name="balance" component={Balance} />
    </Stack.Navigator>
  );
};

export default StackScreen;

const styles = StyleSheet.create({});
