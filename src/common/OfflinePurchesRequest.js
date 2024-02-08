import {Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {MButton} from './MButton';
import {BORDER_COLOR, LITE_BLACK, PRIMARY_COLOR, WHITE} from '../utils/Color';
import API from '../service/API';
import {CREATE_OFFLINE_REQUEST} from '../service/ApiEndPoint';
import {showErrorMessage} from '../utils/BaseUtils';

const OfflinePurchesRequest = ({props}) => {
  const {dialog, setDialog, details} = props;
  const [text, onChangeText] = React.useState('');
  const [loading, setLaoding] = useState(false);

  const OfflinePurchesRequest = async () => {
    setLaoding(true);
    let data = {
      shopId: details?._id,
      amount: text,
    };
    let res = await API.post(CREATE_OFFLINE_REQUEST, data);
    setLaoding(false);
    setDialog(false);
    if (res?.status) {
    } else {
      showErrorMessage(res?.message);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={dialog}
      onRequestClose={() => {
        setDialog(!dialog);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Enter amount"
            keyboardType="numeric"
          />
          <View style={styles.flex}>
            <MButton
              title={'Cancel'}
              textColor={LITE_BLACK}
              width={100}
              style={styles.cancel}
              onPress={() => setDialog(false)}
            />
            <View style={{width: 10}} />
            <MButton
              title={'Create'}
              disabled={!text}
              loading={loading}
              width={100}
              onPress={() => OfflinePurchesRequest()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OfflinePurchesRequest;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: BORDER_COLOR,
    color: LITE_BLACK,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: WHITE,
    padding: 15,
    borderRadius: 10,
  },
  cancel: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
});
