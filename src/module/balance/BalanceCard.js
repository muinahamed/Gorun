import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PRIMARY_COLOR, WHITE} from '../../utils/Color';
import MText, {
  interRegular,
  large,
  medium,
  semiMedium,
  xxLarge,
} from '../../common/MText';

const BalanceCard = () => {
  return (
    <View style={styles.card}>
      <MText
        size={medium}
        fontType={interRegular}
        color={WHITE}
        style={{fontWeight: '500', marginLeft: 10}}>
        Account Balance - BDT
      </MText>

      <MText
        size={semiMedium}
        fontType={interRegular}
        color={WHITE}
        style={{fontWeight: '500', marginLeft: 10, marginTop: 20}}>
        Your Balance
      </MText>
      <MText
        size={xxLarge}
        fontType={interRegular}
        color={WHITE}
        style={{fontWeight: '500', marginLeft: 10, marginTop: 5}}>
        BDT 50
      </MText>
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    padding: 12,
  },
});
