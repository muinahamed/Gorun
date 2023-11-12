import API from '../../service/API';
import {PLACED_ORDER} from '../../service/ApiEndPoint';

export const placeOrder = async (cart, selected, navigation) => {
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
      wallet: 0,
      card: 0,
      cash: subTotal() + 10,
    },
    paymentMethod: 'cash', // "cash", "card", "wallet"
    specialInstruction: '',
  };
  console.log(json);
  let response = await API.post(PLACED_ORDER, json);
  navigation?.navigate('OrderConfirmation', {orderData: response?.data?.order});
  console.log(response);
};
