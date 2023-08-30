/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import MText, {
  interRegular,
  medium,
  semiMedium,
  semiSmall,
  semiXLarge,
} from '../../common/MText';
import {
  GRAY_300,
  GRAY_400,
  LITE_BLACK,
  ORDER_ID_GRAY,
  RED,
  WHITE,
} from '../../utils/Color';
import PhoneInput from 'react-native-phone-number-input';
import {GRAY} from '../../utils/Color';
import {MButton} from '../../common/MButton';
import ScreenWrapper from '../../common/ScreenWrapper';
import {PHONE_CIRCLE} from '../../image/SvgPath';
import {windowWidth} from '../../utils/Measure';
import Header from '../../common/Header';
import auth from '@react-native-firebase/auth';

const MobileSignup = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [data, setData] = useState({countryShortName: 'NG'});
  const [confirm, setConfirm] = useState(null);
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const phoneInput = useRef(null);

  const onSendOtpPressed = async () => {
    navigation.navigate('otpVerification');
  };

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <SafeAreaView>
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
        />
      </SafeAreaView>
    );
  }

  // console.log(user);

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <Header />
        <>
          <TextInput value={code} onChangeText={text => setCode(text)} />
          <Button title="Confirm Code" onPress={() => confirmCode()} />
        </>
        <ScrollView>
          <View style={styles.phoneCircle}>
            <PHONE_CIRCLE />
          </View>
          <MText
            size={semiXLarge}
            fontType={interRegular}
            color={LITE_BLACK}
            style={{
              marginTop: 22,
              textAlign: 'center',
              fontWeight: '600',
            }}>
            Verify your number
          </MText>

          <MText
            size={medium}
            fontType={interRegular}
            color={ORDER_ID_GRAY}
            style={{
              fontWeight: '400',
              marginTop: 16,
              marginHorizontal: 15,
              textAlign: 'center',
            }}>
            Enter your mobile number and we’ll send you a 5-digit one-time
            password (OTP).
          </MText>

          <MText
            size={semiMedium}
            fontType={interRegular}
            color={LITE_BLACK}
            style={{
              marginHorizontal: 15,
              marginTop: 38,
              fontWeight: '500',
            }}>
            Mobile Number
          </MText>

          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: GRAY_300,
              borderRadius: 10,
              marginHorizontal: 15,
              marginTop: 7,
            }}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="LB"
              layout="first"
              containerStyle={styles.containerStyle}
              flagButtonStyle={styles.flagButtonStyle}
              textContainerStyle={styles.textContainerStyle}
              textInputStyle={styles.textInputStyle}
              codeTextStyle={{fontSize: 14, position: 'absolute'}}
              onChangeCountry={e => {
                setData({countryShortName: e.cca2});
              }}
              onChangeText={text => {
                setPhoneNumber(text);
                // setPhoneNumberFirebaseError(null);
              }}
              onChangeFormattedText={text => {
                setFormattedPhoneNumber(text);
                // setPhoneNumberFirebaseError(null);
              }}
              autoFocus
            />
          </View>

          {!phoneInput.current?.isValidNumber(phoneNumber) && (
            <MText
              size={semiSmall}
              fontType={interRegular}
              color={RED}
              style={{
                marginTop: 6,
                marginHorizontal: 24,
                fontWeight: '400',
              }}>
              Please type a valid phone number
            </MText>
          )}

          <MButton
            title="Send Code"
            // disabled={!phoneInput.current?.isValidNumber(phoneNumber)}
            color={
              phoneInput.current?.isValidNumber(phoneNumber) ? RED : GRAY_400
            }
            textColor={WHITE}
            marginTop={40}
            borderRadius={10}
            marginBottom={10}
            onPress={() => onSendOtpPressed()}
            width={windowWidth - 30}
            loading={loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default MobileSignup;

const styles = StyleSheet.create({
  phoneCircle: {
    width: 77,
    height: 77,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: LITE_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '10%',
  },
  containerStyle: {
    backgroundColor: WHITE,
    borderColor: GRAY,
    height: 38,
    borderRadius: 10,
  },
  flagButtonStyle: {
    backgroundColor: WHITE,
    height: 38,
    borderRadius: 10,
  },
  textContainerStyle: {
    backgroundColor: WHITE,
    height: 38,
  },
  textInputStyle: {
    fontSize: 14,
    left: 45,
    width: '100%',
    height: 38,
    position: 'absolute',
  },
});
