import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BORDER_COLOR, LITE_BLACK, PRIMARY_COLOR, RED} from '../utils/Color';
import MText, {interRegular, medium} from './MText';

const PaymentOption = ({props}) => {
  const {payment, setPayment} = props;
  const array = ['cash', 'online'];
  return (
    <View style={styles.container}>
      <MText
        size={medium}
        fontType={interRegular}
        color={LITE_BLACK}
        style={{
          fontWeight: '600',
          lineHeight: 20,
          marginHorizontal: 15,
          marginBottom: 10,
        }}>
        Payment method
      </MText>
      {array.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setPayment(item);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
            }}>
            {payment === item && <SelectView />}
            <View style={{flex: 1}}>
              <MText
                size={medium}
                fontType={interRegular}
                color={LITE_BLACK}
                style={styles.paymentName}>
                {item}
              </MText>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

let SelectView = () => {
  return <View style={[StyleSheet.absoluteFill, styles.selectStyle]} />;
};

export default PaymentOption;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginVertical: 10,
    borderRadius: 10,
    paddingTop: 15,
  },
  paymentMethod: {
    width: 34,
    height: 24,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  paymentMethodCash: {
    width: 28,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  addCard: {
    width: 15,
    height: 12,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  plus: {
    width: 15,
    height: 12,
    resizeMode: 'contain',
    tintColor: '#15BFCA',
  },
  addCardContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectStyle: {
    backgroundColor: 'rgba(82,167,85,.05)',
    borderLeftWidth: 4,
    borderLeftColor: PRIMARY_COLOR,
  },
  cards: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  paymentName: {
    fontWeight: '600',
    lineHeight: 26,
    paddingLeft: 10,
    paddingRight: 15,
    textTransform: 'capitalize',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
