import {FlatList, Platform, StatusBar, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import HomeSearch from './HomeSearch';
import HomeHeader from './HomeHeader';
import HomeTopCategories from './HomeTopCategories';
import HomeScreenBanner from './HomeScreenBanner';
import ShopHorizontalList from '../ShopHorizontal';
import {useSelector} from 'react-redux';
import API from '../../service/API';
import {GET_ALL_SHOP_LIST, GET_ALL_SHOP_TYPE} from '../../service/ApiEndPoint';

const Home = () => {
  const [shop, setShop] = useState();
  const [category, setCategory] = useState();

  let getAllShop = async () => {
    let res = await API.get(GET_ALL_SHOP_LIST);
    setShop(res?.data);
  };

  let getCategory = async () => {
    let res = await API.get(GET_ALL_SHOP_TYPE);
    setCategory(res?.data?.shopTypes);
  };

  useEffect(() => {
    getAllShop();
    getCategory();
  }, []);

  return (
    <ScreenWrapper>
      <StatusBar
        barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
      />
      <HomeHeader />
      <FlatList
        data={[1]}
        keyExtractor={(item, index) => index}
        renderItem={() => {
          return (
            <>
              <HomeSearch placeHolder={'Search'} />
              <HomeTopCategories category={category} />
              <HomeScreenBanner />
              <ShopHorizontalList
                type={'grocery'}
                title={'Nearby Food'}
                data={shop?.shops}
              />
            </>
          );
        }}
      />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
