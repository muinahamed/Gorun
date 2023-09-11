import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('chooseUser');
  }, []);

  return <View></View>;
};

export default Splash;

const styles = StyleSheet.create({});
