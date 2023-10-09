import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PLUS from '../../image/svg/boldPlus.svg';
import MINUS from '../../image/svg/minusOnly.svg';
import {RED} from '../../utils/Color';
import MText, {interRegular, medium} from '../../common/MText';

const AddAndRemove = ({tempCart, setTempCart, productDetails}) => {
  let quantity = tempCart?.item?.quantity;
  let disable = quantity == 1 ? true : false;

  // console.log(tempCart);

  const inCreaseCart = () => {
    let price = tempCart.total / quantity;

    setTempCart({
      ...tempCart,
      total: tempCart.total + price,

      item: {...tempCart.item, quantity: quantity + 1},
    });
  };

  const deCreaseCart = () => {
    let price = tempCart.total / quantity;

    setTempCart({
      ...tempCart,
      total: tempCart.total - price,

      item: {...tempCart.item, quantity: quantity - 1},
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={disable}
        onPress={() => deCreaseCart()}
        style={[styles.button, {opacity: disable ? 0.5 : 1}]}>
        <MINUS stroke={RED} />
      </TouchableOpacity>
      <MText
        fontType={interRegular}
        size={medium}
        style={{
          fontWeight: '600',
          lineHeight: 20,
          color: RED,
          marginHorizontal: 25,
        }}>
        {tempCart?.item?.quantity}
      </MText>
      <TouchableOpacity onPress={() => inCreaseCart()} style={styles.button}>
        <PLUS stroke={RED} />
      </TouchableOpacity>
    </View>
  );
};

export default AddAndRemove;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  button: {
    width: 25,
    height: 25,
    borderWidth: 0.5,
    borderColor: RED,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
