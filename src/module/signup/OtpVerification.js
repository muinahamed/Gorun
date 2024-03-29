/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import MText, {
  interRegular,
  medium,
  openSansRegular,
  semiXLarge,
} from '../../common/MText';
import {BLACK, LITE_BLACK, ORDER_ID_GRAY, TEXT_GRAY} from '../../utils/Color';
import ScreenWrapper from '../../common/ScreenWrapper';
import Header from '../../common/Header';
import auth from '@react-native-firebase/auth';
import {windowWidth} from '../../utils/Measure';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {showErrorMessage, showSuccessMessage} from '../../utils/BaseUtils';
import {useDispatch, useSelector} from 'react-redux';
import API from '../../service/API';
import {
  GET_SHOP_BY_PHONE_NUMBER,
  GET_USER_BY_PHONE_NUMBER,
} from '../../service/ApiEndPoint';
import {setToken, setUser} from '../../store/slices/appSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpVerification = ({route}) => {
  const {type} = route?.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {confirmation} = useSelector(state => state.app);
  const [startTimer, setStartTimer] = useState(false);

  const findShopByPhoneNumber = async phone_number => {
    let data = {
      phoneNumber: phone_number,
    };
    console.log(data);

    let response = await API.post(
      type == 'user' ? GET_USER_BY_PHONE_NUMBER : GET_SHOP_BY_PHONE_NUMBER,
      data,
    );

    if (response?.status) {
      if (response?.data?.newUser) {
        if (type == 'user') {
          navigation.reset({
            index: 0,
            routes: [{name: 'userRegistration', params: {phone_number}}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'shopRegistration', params: {phone_number}}],
          });
        }
      } else {
        if (type == 'user') {
          dispatch(setUser(response?.data?.user));
          dispatch(setToken(response?.data?.user?.token));
          navigation.reset({
            index: 0,
            routes: [{name: 'home'}],
          });
          AsyncStorage.setItem('token', response?.data?.user?.token);
        } else {
          if (response?.data?.shop?.token) {
            dispatch(setUser(response?.data?.shop));
            dispatch(setToken(response?.data?.shop?.token));
            navigation.reset({
              index: 0,
              routes: [{name: 'shopDetails'}],
            });
            AsyncStorage.setItem('token', response?.data?.shop?.token);
          } else {
            showSuccessMessage(response.message);
          }
        }
      }
    }
  };

  function onAuthStateChanged(user) {
    if (user) {
      showSuccessMessage('Otp verified!');
      findShopByPhoneNumber(user?.phoneNumber);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    Keyboard.dismiss();
    return subscriber; // unsubscribe on unmount
  }, []);

  async function confirmCode(otpCode) {
    try {
      await confirmation.confirm(otpCode);
    } catch (error) {
      showErrorMessage('Invalid code.');
    }
  }

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <Header back={false} />
        <ScrollView style={{flex: 1}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View
              style={{
                width: windowWidth,
                alignItems: 'center',
                marginTop: 20,
              }}>
              <MText
                size={semiXLarge}
                fontType={interRegular}
                color={LITE_BLACK}
                style={{
                  marginTop: 30,
                  marginHorizontal: 15,
                  fontWeight: '600',
                }}>
                Phone Verification
              </MText>

              <MText
                size={medium}
                fontType={interRegular}
                color={ORDER_ID_GRAY}
                style={{
                  marginTop: 35,
                  marginHorizontal: 15,
                  fontWeight: '400',
                  textAlign: 'center',
                }}>
                Enter the 6-digit code sent via SMS
              </MText>

              <OTPInputView
                style={{width: '80%', height: 200}}
                pinCount={6}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                  confirmCode(code);
                }}
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            bottom: 20,
            position: 'absolute',
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
          }}>
          {!startTimer && (
            <MText
              size={medium}
              fontType={openSansRegular}
              color={TEXT_GRAY}
              style={{
                marginBottom: 20,
              }}>
              Didn't receive it?
              <MText
                size={medium}
                fontType={openSansRegular}
                color={BLACK}
                style={{
                  marginBottom: 40,
                }}
                onPress={() => {}}>
                RESEND OTP!
              </MText>
            </MText>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
