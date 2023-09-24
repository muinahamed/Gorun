import API from '../../service/API';
import {
  GET_PRODUCT_BY_SHOP,
  GET_SHOP_ALL_CATEGORIES,
  GET_SHOP_ALL_PRODUCT,
} from '../../service/ApiEndPoint';
import {showErrorMessage} from '../../utils/BaseUtils';

export const shopDetailManipulate = async (setCategoryItems, setLoading) => {
  setLoading && setLoading(true);
  let res = await API(GET_SHOP_ALL_PRODUCT);
  let result = [];
  res?.data?.products?.map((item, index) => {
    let findIndex = result?.findIndex(
      child => child?.category?._id == item?.category?._id,
    );
    if (findIndex >= 0) {
      result[findIndex].data = [...result[findIndex].data, item];
    } else {
      result.push({category: {...item.category, index}, data: [item]});
    }
  });
  setLoading && setLoading(false);
  setCategoryItems(result);
};

export const getAllCategories = async setAllCategories => {
  let res = await API(GET_SHOP_ALL_CATEGORIES);
  if (res?.status) {
    setAllCategories(res?.data);
  } else {
    showErrorMessage('There is an error!');
  }
};

export const shopWiseProductForUser = async (
  shopId,
  setCategoryItems,
  setLoading,
) => {
  setLoading && setLoading(true);
  let res = await API.get(GET_PRODUCT_BY_SHOP + shopId);

  let result = [];

  res?.data?.products?.map((item, index) => {
    let findIndex = result?.findIndex(
      child => child?.category?._id == item?.category?._id,
    );
    if (findIndex >= 0) {
      result[findIndex].data = [...result[findIndex].data, item];
    } else {
      result.push({category: {...item.category, index}, data: [item]});
    }
  });
  setLoading && setLoading(false);
  setCategoryItems(result);
};
