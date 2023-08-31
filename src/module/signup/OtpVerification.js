/* eslint-disable react-native/no-inline-styles */
import {useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {MButton} from '../../common/MButton';
import MText, {
  interRegular,
  medium,
  openSansRegular,
  semiXLarge,
} from '../../common/MText';
import {
  BLACK,
  LITE_BLACK,
  ORDER_ID_GRAY,
  RED,
  TEXT_GRAY,
  WHITE,
} from '../../utils/Color';
import ScreenWrapper from '../../common/ScreenWrapper';
import Header from '../../common/Header';
import auth from '@react-native-firebase/auth';
import {windowWidth} from '../../utils/Measure';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const OtpVerification = () => {
  const [loading, setLoading] = useState(false);
  const [startTimer, setStartTimer] = useState(true);
  const [otpCode, setOtpCode] = useState('');

  // console.log(route.params);

  function onAuthStateChanged(user) {
    if (user) {
      console.log(user);
    }
  }

  useEffect(() => {
    setStartTimer(false);
    Keyboard.dismiss();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function confirmCode() {
    try {
      await confirm.confirm(otpCode);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <Header />
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
                autoFocusOnLoad={true}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                  console.log(`Code is ${code}, you are good to go!`);
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
