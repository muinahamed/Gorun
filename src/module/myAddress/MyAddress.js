import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import Header from '../../common/Header';
import Empty from '../../common/Empty';
import MyAddressNewChild from './MyAddressNewChild';
import API from '../../service/API';
import {
  EDIT_ADDRESS,
  GET_ALL_ADDRESS,
  SAVE_ADDRESS,
} from '../../service/ApiEndPoint';
import PLUS from '../../image/svg/addCard.svg';
import AddAddressModal from './AddAddressModal';
import LoaderIndicator from '../../common/LoaderIndicator';

const MyAddress = () => {
  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editObj, setEditObj] = useState({});
  const [addressModal, setAddressModal] = useState(false);

  let getAddress = async () => {
    let response = await API(GET_ALL_ADDRESS);
    setLoading(false);
    setAddressList(response?.data?.userAddresses);
  };

  let saveAddress = async address => {
    if (address?._id) {
      let response = await API.post(EDIT_ADDRESS, {
        ...address,
        addressId: address?._id,
      });
      getAddress();
      return;
    }
    let response = await API.post(SAVE_ADDRESS, address);
    getAddress();
  };

  useEffect(() => {
    getAddress();
  }, []);

  const renderItem = ({item, index}) => (
    <MyAddressNewChild
      item={item}
      setAddressList={setAddressList}
      addressList={addressList}
      setEditObj={setEditObj}
      setAddressModal={setAddressModal}
    />
  );

  return (
    <ScreenWrapper>
      <Header
        title="My Address"
        HeaderRightIcon={<PLUS />}
        onRightPress={() => {
          setAddressModal(true);
          setEditObj({});
        }}
      />
      {loading ? (
        <LoaderIndicator loading={true} backColor={'rgba(0,0,0,0)'} />
      ) : (
        <FlatList
          data={addressList}
          renderItem={renderItem}
          ListEmptyComponent={<Empty msg={'No Address available!'} />}
          keyExtractor={(item, index) => index}
        />
      )}
      <AddAddressModal
        addressModal={addressModal}
        setAddressModal={setAddressModal}
        select={editObj}
        setSelect={e => saveAddress(e)}
        edit={true}
      />
    </ScreenWrapper>
  );
};

export default MyAddress;

const styles = StyleSheet.create({});
