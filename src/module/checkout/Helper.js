import API from '../../service/API';
import {
  GET_DELIVERY_CHARGE,
  GET_VAT,
  PLACED_ORDER,
  PLACE_ORDER_WITH_SSL,
} from '../../service/ApiEndPoint';

export const placeOrder = async (
  cart,
  deliveryCharge,
  selected,
  payment,
  navigation,
) => {
  let items = [];
  cart?.map(item => {
    let obj = {
      product: item?._id,
      productName: item?.name,
      productImages: item?.images,
      perProductPrice: item?.price,
      quantity: item?.quantity,
      totalProductAmount: item?.price * item?.quantity,
    };
    items.push(obj);
  });

  const subTotal = () => {
    let count = 0;
    cart?.map(item => {
      count += item?.price * item?.quantity;
    });
    return count;
  };

  let total = subTotal() + deliveryCharge?.deliveryCharge + deliveryCharge?.vat;

  let json = {
    deliveryAddressId: selected?._id,
    items,
    orderDeliveryCharge: {
      adminDeliveryFee: 10,
      riderFee: 10,
      deliveryDistance: 2,
    },
    summary: {
      itemAmount: subTotal(),
      deliveryCharge: deliveryCharge?.deliveryCharge,
      totalAmount: subTotal() + deliveryCharge?.vat,
      vat: deliveryCharge?.vat,
      online: payment == 'cash' ? 0 : total,
      cash: payment == 'cash' ? total : 0,
    },
    paymentMethod: payment, // "cash", "card", "wallet"
    specialInstruction: '',
  };

  if (payment == 'online') {
    return new Promise(async (resolve, reject) => {
      let response = await API.post(PLACE_ORDER_WITH_SSL, json);
      resolve(response);
    });
  } else {
    return new Promise(async (resolve, reject) => {
      let response = await API.post(PLACED_ORDER, json).catch(e => {
        console.log(e);
      });
      navigation?.navigate('OrderConfirmation', {
        orderData: response?.data?.order,
        from: 'checkout',
      });
      resolve(response);
    });
  }
};

export const getDeliveryChargeAndVat = async (
  subTotal,
  shopId,
  selected,
  setDeliveryCharge,
) => {
  const latitude = selected?.latitude;
  const longitude = selected?.longitude;

  let response = await API.get(
    GET_DELIVERY_CHARGE +
      `shopId=${shopId}&latitude=${latitude}&longitude=${longitude}`,
  );
  if (response?.status) {
    let deliveryCharge = response?.data?.orderDeliveryCharge?.deliveryFee;

    let res = await API.get(GET_VAT + `amount=${subTotal + deliveryCharge}`);
    if (res?.status) {
      let vat = res?.data?.vat;
      setDeliveryCharge({deliveryCharge, vat});
    }
  }
};
