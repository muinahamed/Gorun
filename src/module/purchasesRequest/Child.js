import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import MText, {interRegular, medium, semiMedium} from '../../common/MText';
import {BORDER_COLOR, LITE_BLACK, PRIMARY_COLOR} from '../../utils/Color';
import CustomButton from './CustomButton';
import API from '../../service/API';
import {ACCEPT_REJECT_OFFLINE_PURCHES_REQUEST} from '../../service/ApiEndPoint';

const Child = ({item, setHistory}) => {
  const [loading, setLoading] = useState(false);

  const onPress = async status => {
    let data = {
      requestId: item?._id,
      status,
    };

    setLoading(true);
    let res = await API.post(ACCEPT_REJECT_OFFLINE_PURCHES_REQUEST, data);

    setLoading(false);

    if (res?.status) {
      setHistory(state => {
        let requests = state?.requests;
        let result = requests?.filter(child => child?._id !== item?._id);
        return {...state, requests: result};
      });
    } else {
      showErrorMessage(res?.message);
    }
  };

  // console.log(loading);

  return (
    <View style={[styles.cart]}>
      <View style={styles.flex}>
        <Image source={{uri: item?.user?.image}} style={styles.icon} />
        <View style={{marginLeft: 10, flex: 1}}>
          <MText
            size={medium}
            fontType={interRegular}
            color={LITE_BLACK}
            style={{fontWeight: '400', lineHeight: 16}}>
            BDT {item?.amount}
          </MText>
          <MText
            size={medium}
            fontType={interRegular}
            color={PRIMARY_COLOR}
            style={{fontWeight: '400', lineHeight: 16}}>
            {item?.status}
          </MText>
        </View>
        {item?.status == 'pending' && (
          <View>
            <CustomButton props={{onPress, title: 'Accept', loading}} />
            <CustomButton
              style={styles.rightButton}
              props={{onPress, title: 'Reject', loading}}
            />
          </View>
        )}
      </View>
      <MText
        size={semiMedium}
        fontType={interRegular}
        color={LITE_BLACK}
        style={{
          fontWeight: '400',
          lineHeight: 16,
          marginTop: item?.status == 'pending' ? 0 : 5,
        }}>
        {item?.user?.name}
      </MText>
    </View>
  );
};

export default Child;

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    borderRadius: 40,
  },
  cart: {
    marginHorizontal: 15,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: BORDER_COLOR,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightButton: {},
});
