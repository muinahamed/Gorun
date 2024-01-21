import API from '../../service/API';
import {PLACED_ORDER, PLACE_ORDER_WITH_SSL} from '../../service/ApiEndPoint';

export const placeOrder = async (cart, selected, payment, navigation) => {
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

  let total = subTotal() + 10;

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
      deliveryCharge: 10,
      totalAmount: subTotal() + 10,
      vat: 0,
      online: payment == 'cash' ? 0 : total,
      cash: payment == 'cash' ? total : 0,
    },
    paymentMethod: payment, // "cash", "card", "wallet"
    specialInstruction: '',
  };

  if (payment == 'online') {
    console.log(payment);
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
