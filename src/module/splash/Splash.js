import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Splash = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.app);

  useEffect(() => {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{name: 'home'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'chooseUser'}],
      });
    }
  }, []);

  return <View></View>;
};

export default Splash;

const styles = StyleSheet.create({});
