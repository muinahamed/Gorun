import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import MText, {interRegular, semiMedium, small} from './MText';

import {WHITE, BLACK} from '../utils/Color';
import LineBreak from './LineBreak';
import {windowWidth} from '../utils/Measure';
import {CATEGORY_MODAL_PIC} from '../image/PicturePath';

const Summary = ({
  isButler,
  title = 'Payment Summary',
  subTotal,
  secondarySubTotal,
  deliveryCharge,
  secondaryDeliveryCharge,
  vat,
  secondaryVat,
  total,
  secondaryTotal,
  cash,
  riderTip,
  secondaryRiderTip,
  ESTprice,
  adminExchangeRate,
  currency,
  secondaryCurrency,
}) => {
  const getData = base => {
    let result = currency + base?.toFixed(2);

    return result;
  };

  return (
    <View style={styles.container}>
      <MText
        size={semiMedium}
        fontType={interRegular}
        color={BLACK}
        style={{
          fontWeight: '600',
        }}>
        {title}
      </MText>

      {subTotal > 0 && (
        <Item
          title={isButler ? 'EST item(s) price' : 'Subtotal'}
          value={getData(subTotal, secondarySubTotal)}
        />
      )}

      {ESTprice > 0 && (
        <Item
          title={'EST item(s) price'}
          value={getData(ESTprice, adminExchangeRate)}
        />
      )}

      {deliveryCharge !== false && (
        <Item
          title={'Delivery Charge'}
          value={
            deliveryCharge == 0
              ? 'Free'
              : getData(deliveryCharge, secondaryDeliveryCharge)
          }
        />
      )}

      {vat > 0 && <Item title={'VAT'} value={getData(vat, secondaryVat)} />}

      {riderTip > 0 && (
        <Item
          title={'Rider Tips'}
          value={getData(riderTip, secondaryRiderTip)}
        />
      )}

      <LineBreak marginTop={9} margin={1} />

      {total > 0 && (
        <Item
          title={'Total Amount'}
          fontWeight={'700'}
          value={currency + total?.toFixed(2)}
          marginTop={8}
        />
      )}

      {cash > 0 && (
        <Item
          title={'Cash'}
          fontWeight={'700'}
          value={currency + cash?.toFixed(2)}
          marginTop={8}
        />
      )}
    </View>
  );
};

export default Summary;

let Item = ({title, value, fontWeight, marginTop}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: marginTop || marginTop == 0 ? marginTop : 12,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MText
          size={small}
          fontType={interRegular}
          color={BLACK}
          style={{
            fontWeight: '500',
            fontWeight: fontWeight ? fontWeight : '500',
          }}>
          {title}
        </MText>
        {title === 'VAT' && (
          <Image
            source={CATEGORY_MODAL_PIC}
            style={{
              width: 14,
              height: 14,
              marginLeft: 5,
              transform: [{rotate: '180deg'}],
            }}
          />
        )}
      </View>
      <MText
        size={small}
        fontType={interRegular}
        color={fontWeight ? BLACK : '#737373'}
        style={{
          fontWeight: fontWeight ? fontWeight : '400',
        }}>
        {value}
      </MText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginVertical: 7.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: WHITE,
  },
  doted: {
    width: windowWidth - 62,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderStyle: 'dashed',
    marginTop: 10,
  },
  image: {
    width: 22,
    height: 22,
    borderRadius: 30,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
