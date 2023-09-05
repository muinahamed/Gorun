import {
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import HomeSearch from './HomeSearch';
import HomeHeader from './HomeHeader';
import HomeTopCategories from './HomeTopCategories';
import HomeScreenBanner from './HomeScreenBanner';
import ShopHorizontalList from '../ShopHorizontal';
import {FOOD_DATA, GROCERY_DATA, PHARMACY_DATA} from '../../utils/Dummy';
import 'react-native-reanimated';

const Home = () => {
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
                data={FOOD_DATA}
              />
              <ShopHorizontalList
                type={'grocery'}
                title={'Nearby Grocery'}
                data={GROCERY_DATA}
              />
              <ShopHorizontalList
                type={'grocery'}
                title={'Nearby Pharmacy'}
                data={PHARMACY_DATA}
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
