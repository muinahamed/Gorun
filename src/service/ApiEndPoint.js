const BASE_URL = `https://gorun.onrender.com/`;

export const REGISTER_WITH_DATA = BASE_URL + `app/user/auth/add`;

export const GET_USER_BY_PHONE_NUMBER =
  BASE_URL + `app/user/auth/phone?phoneNumber=`;

export const REGISTER_WITH_DATA_SHOP = BASE_URL + `app/shop/auth/add`;

export const GET_SHOP_BY_PHONE_NUMBER =
  BASE_URL + `app/shop/auth/phone?phoneNumber=`;

export const GET_SHOP_CATEGORY =
  BASE_URL + `app/shop/shopType?page=1&pageSize=50`;

export const GET_SHOP_ALL_PRODUCT =
  BASE_URL + `app/shop/product?page=1&pageSize=50`;

export const ADD_PRODUCT_TO_SHOP = `${BASE_URL}app/shop/product/add`;

export const GET_SHOP_ALL_CATEGORIES =
  BASE_URL + `app/shop/category?page=1&pageSize=50`;

export const GET_CATEGORY_WISE_PRODUCT =
  BASE_URL + `app/user/shop/type-wise?page=1&pageSize=5&`;

export const GET_SINGLE_ORDER_DETAILS =
  BASE_URL + `app/user/order/single?orderId=`;

export const GET_ALL_SHOP_LIST = BASE_URL + `app/user/shop?`;

export const GET_SHOP = BASE_URL + `app/user/shop?`;

export const GET_PRODUCT_BY_SHOP =
  BASE_URL + `app/user/product?page=1&pageSize=50&shopId=`;

export const SEARCH_ALL_PRODUCT = BASE_URL + `app/user/product?`;

export const GET_ALL_SHOP_TYPE = BASE_URL + `app/user/shopType`;

export const IMAGE_UPLOAD_ENDPOINT = `https://api.imgbb.com/1/upload?key=c104a310afcf00dd9cf4d3119c8e359c`;

export const GET_ALL_ADDRESS = BASE_URL + `app/user/address`;

export const SAVE_ADDRESS = BASE_URL + `app/user/address/create`;

export const EDIT_ADDRESS = BASE_URL + `app/user/address/update`;

export const DELETE_ADDRESS = BASE_URL + `app/user/address/delete`;

export const PLACED_ORDER = BASE_URL + `app/user/order/place-order`;

export const PLACE_ORDER_WITH_SSL = BASE_URL + `app/user/order/place-order-ssl`;

export const CATEGORY_WISE_SHOP = BASE_URL + `app/user/shop/type-wise`;

export const ONGOING_ORDER = BASE_URL + `app/user/order?`;

export const GET_DELIVERY_CHARGE =
  BASE_URL + `app/user/order/get-delivery-charge?`;

export const GET_VAT = BASE_URL + `app/user/order/get-vat?`;

export const CREATE_OFFLINE_REQUEST =
  BASE_URL + `app/user/offline-purchase-request/create`;

export const OFFLINE_PURCHES_HISTORY =
  BASE_URL + `app/user/offline-purchase-request?`;

export const GET_OFFLINEPURCHES_HISTORY =
  BASE_URL + `app/shop/offline-purchase-request?`;

export const ACCEPT_REJECT_OFFLINE_PURCHES_REQUEST =
  BASE_URL + `app/shop/offline-purchase-request/update-status`;

export const BALANCE_URL = BASE_URL + `app/user/wallet/balance`;

export const GET_TRANSECTION = BASE_URL + `app/user/wallet/transactions`;

// http://192.168.0.183:5001/
