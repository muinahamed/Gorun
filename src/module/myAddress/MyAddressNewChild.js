import {
  Alert,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MText, {interRegular, medium, small} from '../../common/MText';
import {CYAN_GRAY, LITE_BLACK, WHITE} from '../../utils/Color';
import {useDispatch, useSelector} from 'react-redux';
import PEN from '../../image/svg/pen.svg';
import HOME from '../../image/svg/home.svg';
import SwipeAbleDeleteWithIcon from '../../common/SwipeAbleDeleteWithIcon';
import {useNavigation} from '@react-navigation/native';
import {DELETE_ADDRESS} from '../../service/ApiEndPoint';
import API from '../../service/API';
import {setActiveLocation} from '../../store/slices/appSlice';

const MyAddressNewChild = ({
  item,
  setAddressList,
  addressList,
  setEditObj,
  setAddressModal,
}) => {
  const dispatch = useDispatch();
  const {activeLocation} = useSelector(state => state.app);

  const deleteAddressFinal = async id => {
    let data = {
      addressId: id,
    };
    let response = await API.post(DELETE_ADDRESS, data);

    if (response?.status === true) {
      const result = addressList.filter(item => item?._id !== id);

      setAddressList([...result]);
    }
  };

  const deleteItem = id => {
    Alert.alert('Delete Address', 'Do you want to delete this address?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          deleteAddressFinal(id);
        },
      },
    ]);
  };

  const getSelected = async () => {
    dispatch(setActiveLocation({...activeLocation, selected: item}));
  };

  return (
    <View style={styles.container}>
      <SwipeAbleDeleteWithIcon>
        <View
          onPress={() => {
            deleteItem(item?._id);
          }}>
          <Pressable onPress={() => getSelected(item)} style={[styles.item]}>
            {activeLocation?.selected?._id == item?._id && (
              <View style={styles.select} />
            )}
            <HOME />
            <View style={{flex: 1, marginHorizontal: 10}}>
              <MText
                size={medium}
                fontType={interRegular}
                color={LITE_BLACK}
                numberOfLines={1}
                style={{
                  fontWeight: '500',
                  lineHeight: 18,
                }}>
                {item?.nickname}
              </MText>
              <MText
                size={small}
                fontType={interRegular}
                color={CYAN_GRAY}
                numberOfLines={1}
                style={{
                  fontWeight: '400',
                  lineHeight: 18,
                  marginTop: 2,
                }}>
                {item?.address}
              </MText>
            </View>

            <TouchableOpacity
              onPress={() => {
                setEditObj(item);
                setAddressModal(true);
              }}>
              <PEN />
            </TouchableOpacity>
          </Pressable>
        </View>
      </SwipeAbleDeleteWithIcon>
    </View>
  );
};

export default MyAddressNewChild;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E5E7E9',
    backgroundColor: WHITE,
  },
  select: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(231, 57, 65, 0.05)',
  },
});
