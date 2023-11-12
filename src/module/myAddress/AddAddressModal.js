import {Modal, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {WHITE} from '../../utils/Color';
import DeliveryAddressModal from '../../common/deliveryAddress/DeliveryAddressModal';

const AddAddressModal = ({
  addressModal,
  setAddressModal,
  select,
  setSelect,
  edit,
}) => {
  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={addressModal}
      onRequestClose={() => {
        setAddressModal(false);
      }}>
      <SafeAreaView style={{flex: 1}}>
        <DeliveryAddressModal
          setDeliveryAddressModal={setAddressModal}
          select={select}
          setSelect={setSelect}
          hideModalTop={true}
          edit={edit}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default AddAddressModal;

const styles = StyleSheet.create({
  safeArea: darkMode => ({
    flex: 0,
    backgroundColor: WHITE,
  }),
});
