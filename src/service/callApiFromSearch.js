import axios from 'axios';
import {SEARCH_ALL_PRODUCT} from './ApiEndPoint';
import API from './API';

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

  let response = await API.get(
    SEARCH_ALL_PRODUCT + `page=${number}&pageSize=50&searchKey=${searchText}`,
  );

  console.log(response);

  if (response?.status) {
    if (number === 1) {
      if (response?.data.products.length === 0) {
        setSelectedItemsList({
          ...response?.data,
          products: [],
          error: true,
          status: 'end',
        });
      } else {
        setSelectedItemsList({
          ...response.data,
          error: false,
          status: 'end',
        });
      }
    } else {
      setSelectedItemsList({
        ...response?.data,
        products: [...selectedItemsList?.products, ...response.data.products],
        error: false,
        status: 'end',
      });
    }
  }
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
      if (response.status == true) {
        if (number === 1) {
          // console.log(response);
          if (response?.data.products.length === 0) {
            setSelectedItemsList({
              ...response?.data,
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
            ...response?.data,
            products: [
              ...selectedItemsList?.products,
              ...response.data.products,
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
