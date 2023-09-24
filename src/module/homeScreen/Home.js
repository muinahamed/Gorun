import {
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import HomeSearch from './HomeSearch';
import HomeHeader from './HomeHeader';
import HomeTopCategories from './HomeTopCategories';
import HomeScreenBanner from './HomeScreenBanner';
import ShopHorizontalList from '../ShopHorizontal';
import {FOOD_DATA, GROCERY_DATA, PHARMACY_DATA} from '../../utils/Dummy';
import {useSelector} from 'react-redux';
import API from '../../service/API';
import {GET_ALL_SHOP_LIST} from '../../service/ApiEndPoint';

const Home = () => {
  const {user} = useSelector(state => state.app);
  const [shop, setShop] = useState();

  let getAllShop = async () => {
    let res = await API.get(GET_ALL_SHOP_LIST);
    setShop(res?.data);
  };

  useEffect(() => {
    getAllShop();
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

              <HomeTopCategories />
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
