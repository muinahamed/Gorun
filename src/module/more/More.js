import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import MoreUser from './MoreUser';
import Login from './Login';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import {WHITE} from '../../utils/Color';

const More = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({title: 'Account'});
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <MoreUser />
        <Login />
      </ScrollView>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
