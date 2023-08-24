import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {GRAY_300} from '../utils/Color';

const OtpInputs = props => {
  const [otp, setOtp] = useState([]);
  const [otpTextInput, setOtpTextInput] = useState([]);

  useEffect(() => {
    otpTextInput[0].focus();
  }, []);

  const focusPrevious = (key, index) => {
    if (key === 'Backspace' && index !== 0) otpTextInput[index - 1].focus();
  };

  const focusNext = (index, value) => {
    if (index < otpTextInput.length - 1 && value) {
      otpTextInput[index + 1].focus();
    }
    if (index === otpTextInput.length - 1) {
      otpTextInput[index].blur();
    }

    otp[index] = value;
    setOtp(otp);
    if (props.getOtp) {
      props.getOtp(otp.join(''));
    }
  };

  const renderInputs = () => {
    const inputs = Array(5).fill(0);
    const txt = inputs.map((i, j) => (
      <View
        key={j}
        style={{
          height: 50,
          width: 50,
          borderRadius: 25,
          backgroundColor: GRAY_300,
          marginVertical: 5,
          elevation: 2,
          marginHorizontal: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder=""
          style={{width: 50, height: 50, textAlign: 'center'}}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={v => focusNext(j, v)}
          onKeyPress={e => focusPrevious(e.nativeEvent.key, j)}
          ref={ref => (otpTextInput[j] = ref)}
        />
      </View>
    ));
    return txt;
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {renderInputs()}
    </View>
  );
};

const styles = StyleSheet.create({
  gridPad: {padding: 30},
  txtMargin: {margin: 3},
  inputRadius: {textAlign: 'center'},
});

export default OtpInputs;
