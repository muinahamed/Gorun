import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GET_ALL_SHOP_LIST} from '../../service/ApiEndPoint';
import API from '../../service/API';
import HomeHeader from '../homeScreen/HomeHeader';
import ScreenWrapper from '../../common/ScreenWrapper';
import Header from '../../common/Header';
import ShopHorizontalListChild from '../../common/ShopHorizontalListChild';
import HomeSearch from '../homeScreen/HomeSearch';

const CategoryDetails = ({route}) => {
  const {item} = route?.params;
  const [shopList, setShopList] = useState();

  let getAllShopList = async () => {
    let res = await API.get(GET_ALL_SHOP_LIST + `&shopTypeId=${item?._id}`);
    setShopList(res?.data?.shops);
  };

  useEffect(() => {
    getAllShopList();
  }, []);

  const renderItem = ({item, index}) => (
    <ShopHorizontalListChild item={item} index={index} />
  );

  return (
    <ScreenWrapper>
      <Header title={item.name} />
      <HomeSearch placeHolder={'Search'} />
      <FlatList
        data={shopList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
};

export default CategoryDetails;

const styles = StyleSheet.create({});
