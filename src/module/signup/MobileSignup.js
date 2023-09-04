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
import {showErrorMessage, showSuccessMessage} from '../../utils/BaseUtils';

const MobileSignup = () => {
  const navigation = useNavigation();
  const phoneInput = useRef(null);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithPhoneNumber() {
    // await auth().signOut();
    setLoading(true);
    const confirmation = await auth().signInWithPhoneNumber(
      formattedPhoneNumber,
    );

    setLoading(false);
    if (confirmation) {
      showSuccessMessage('You will get a verification Code!');
      navigation.navigate('otpVerification', {confirmation});
    } else {
      showErrorMessage('There is an error!');
    }
  }

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <Header />
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
              defaultCode="BD"
              layout="first"
              containerStyle={styles.containerStyle}
              flagButtonStyle={styles.flagButtonStyle}
              textContainerStyle={styles.textContainerStyle}
              textInputStyle={styles.textInputStyle}
              onChangeCountry={e => console.log(e)}
              codeTextStyle={{fontSize: 14, position: 'absolute'}}
              onChangeFormattedText={text => {
                setFormattedPhoneNumber(text);
              }}
              autoFocus
            />
          </View>

          {!phoneInput.current?.isValidNumber(formattedPhoneNumber) && (
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
            // disabled={!phoneInput.current?.isValidNumber(formattedPhoneNumber)}
            color={
              phoneInput.current?.isValidNumber(formattedPhoneNumber)
                ? RED
                : GRAY_400
            }
            textColor={WHITE}
            marginTop={40}
            borderRadius={10}
            marginBottom={10}
            onPress={() => signInWithPhoneNumber()}
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
