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

export const GET_ALL_SHOP_LIST = BASE_URL + `app/user/shop?page=1&pageSize=50`;

export const GET_PRODUCT_BY_SHOP =
  BASE_URL + `app/user/product?page=1&pageSize=50&shopId=`;

export const IMAGE_UPLOAD_ENDPOINT = `https://api.imgbb.com/1/upload?key=c104a310afcf00dd9cf4d3119c8e359c`;
