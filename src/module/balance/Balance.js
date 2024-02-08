import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {WHITE} from '../../utils/Color';
import BalanceCard from './BalanceCard';
import {BALANCE_URL, GET_TRANSECTION} from '../../service/ApiEndPoint';
import API from '../../service/API';
import Transection from './Transection';
import MText, {interRegular, semiXLarge} from '../../common/MText';

const Balance = () => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState();
  const [transection, setTransection] = useState({status: 'apiCalling'});

  const getBalance = async () => {
    let res = await API.get(BALANCE_URL);
    console.log(res);
  };

  const getTRansection = async () => {
    let res = await API.get(GET_TRANSECTION);
    if (res?.status) {
      setTransection({status: 'end', ...res?.data});
    }
  };

  useEffect(() => {
    getBalance();
    getTRansection();
    navigation.setOptions({title: 'My Balance'});
  }, []);

  const renderItem = ({item, index}) => <Transection item={item} />;

  return (
    <View style={styles.container}>
      <BalanceCard />

      <MText
        size={semiXLarge}
        fontType={interRegular}
        color={'#1A1441'}
        style={{
          fontWeight: '600',
          lineHeight: 22,
          marginHorizontal: 15,
          marginTop: 20,
        }}>
        Latest Transactions
      </MText>
      <FlatList
        data={transection?.transactions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
