/* eslint-disable react-native/no-inline-styles */
import {useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import OtpInputs from '../../common/OtpInputs';
const windowWidth = Dimensions.get('window').width;

const OtpVerification = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [startTimer, setStartTimer] = useState(true);
  const [otpCode, setOtpCode] = useState(null);

  // console.log(route.params);

  function onAuthStateChanged(user) {
    if (user) {
      console.log(user);
    }
  }

  useEffect(() => {
    setStartTimer(false);
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

              <View
                style={{
                  flex: 1,
                  marginTop: 40,
                }}>
                <OtpInputs getOtp={code => setOtpCode(code)} />
              </View>

              <MButton
                title="Continue"
                textColor={WHITE}
                marginTop={40}
                marginBottom={5}
                borderRadius={10}
                onPress={() => {
                  confirmOtpCode();
                }}
                width={windowWidth - 30}
                loading={loading}
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
