import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import HomeSearch from './HomeSearch';
import HomeHeader from './HomeHeader';
import HomeTopCategories from './HomeTopCategories';
import HomeScreenBanner from './HomeScreenBanner';

const Home = () => {
  return (
    <ScreenWrapper>
      <StatusBar
        barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
      />
      <HomeHeader />
      <HomeSearch placeHolder={'Search'} />
      <HomeTopCategories />
      <HomeScreenBanner />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
