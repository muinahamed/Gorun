import axios from 'axios';

export const getSearchResultItem = async (
  from,
  searchText,
  number,
  setSelectedItemsList,
  selectedItemsList,
  lat,
  lon,
) => {
  number === 1
    ? setSelectedItemsList({...selectedItemsList, status: 'apiCalling'})
    : setSelectedItemsList({...selectedItemsList, status: 'paginate'});
  const config = {
    method: 'get',
    url: `https://request-dev.lyxa.delivery/app/user/product?page=1&pageSize=8&pagingRange=5&searchKey=${searchText}&sortBy=desc&type=all&shop&seller&category=&subCategory&latitude=23.7729247&longitude=90.41249119999999`,
  };

  console.log(config.url, 'item');

  await axios(config)
    .then(function (response) {
      console.log(response);
      if (response?.data?.status === true) {
        if (number === 1) {
          if (response?.data?.data.products.length === 0) {
            setSelectedItemsList({
              ...response?.data?.data,
              products: [],
              error: true,
              status: 'end',
            });
          } else {
            setSelectedItemsList({
              ...response.data.data,
              error: false,
              status: 'end',
            });
          }
        } else {
          setSelectedItemsList({
            ...response?.data?.data,
            products: [
              ...selectedItemsList?.products,
              ...response?.data.data.products,
            ],
            error: false,
            status: 'end',
          });
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getSearchResultStores = async (
  from,
  searchText,
  number,
  setSelectedStoresList,
  selectedStoresList,
  lat,
  lon,
) => {
  number === 1
    ? setSelectedStoresList({...selectedStoresList, status: 'apiCalling'})
    : setSelectedStoresList({...selectedStoresList, status: 'paginate'});
  const config = {
    method: 'get',
    url: `https://request-dev.lyxa.delivery/app/user/shop?page=1&pageSize=8&searchKey=${searchText}&sortBy=desc&shopType=all&latitude=23.7729247&longitude=90.41249119999999 `,
  };

  await axios(config)
    .then(function (response) {
      if (response?.data?.status === true) {
        if (number === 1) {
          if (response?.data?.data.shops.length === 0) {
            setSelectedStoresList({
              ...response?.data?.data,
              shops: [],
              error: true,
              status: 'end',
            });
          } else {
            setSelectedStoresList({
              ...response?.data?.data,
              error: false,
              status: 'end',
            });
          }
        } else {
          setSelectedStoresList({
            ...response?.data?.data,
            error: false,
            status: 'end',
            shops: [
              ...selectedStoresList?.shops,
              ...response?.data?.data?.shops,
            ],
          });
        }
      }
    })
    .catch(function (error) {});
};

export const CallApiFromGroceryCategory = async (
  number,
  searchText,
  shopId,
  selectedItemsList,
  setSelectedItemsList,
) => {
  number === 1
    ? setSelectedItemsList({...selectedItemsList, status: 'apiCalling'})
    : setSelectedItemsList({...selectedItemsList, status: 'paginate'});
  const config = {
    method: 'get',
    url: `${SEARCH_URL}product/specific-shop?page=${number}&pageSize=8&searchKey=${searchText}&shopId=${shopId}`,
  };

  // console.log(config?.url);
  await axios(config)
    .then(function (response) {
      if (response?.data.status == true) {
        if (number === 1) {
          // console.log(response);
          if (response?.data?.data.products.length === 0) {
            setSelectedItemsList({
              ...response?.data?.data,
              error: true,
              status: 'end',
            });
          } else {
            setSelectedItemsList({
              ...response.data.data,
              error: false,
              status: 'end',
            });
          }
        } else {
          setSelectedItemsList({
            ...response?.data?.data,
            products: [
              ...selectedItemsList?.products,
              ...response?.data.data.products,
            ],
            error: false,
            status: 'end',
          });
        }
      }
    })
    .catch(function (error) {
      // console.log(error);
    });
  // setLoading(false);
};
