import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import ARROW from '../../image/svg/arrow.svg';
import MText, {interRegular, medium} from '../../common/MText';
import {TouchableOpacity} from 'react-native';

const RenderItem = ({item, index}) => {
  const IMAGE = item.IMAGE;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        switch (item.id) {
          case 1:
            navigation.navigate('MyOrderNew');
            // navigation.navigate('MyOrders');
            break;
          case 2:
            navigation.navigate('DropPay');
            break;
          case 3:
            navigation.navigate('Coupon');
            break;
          case 4:
            navigation.navigate('PaymentModule');
            // navigation.navigate('DropPay');
            break;
          case 5:
            navigation.navigate('MyAddressNew', {type: 'add'});
            // navigation.navigate('PaymentModule');
            break;
          case 6:
            navigation.navigate('MyFavourite');
            break;
          case 7:
            navigation.navigate('InviteFriend');
            // navigation.navigate('ChatsList');
            break;
          case 8:
            navigation.navigate('GetSupport');
            break;
          case 9:
            navigation.navigate('ChatsList');
            // navigation.navigate('Terms');
            break;
          case 10:
            navigation.navigate('Faq');
            break;
          case 11:
            navigation.navigate('Terms');
            // navigation.navigate('About');
            // navigation.navigate('About');
            break;
          default:
            break;
        }
      }}>
      <View
        style={[
          styles.flex,
          {
            paddingVertical: 15,
          },
        ]}>
        <View style={styles.flex}>
          <IMAGE width={16} height={16} />
          <MText
            size={medium}
            fontType={interRegular}
            color={'#363636'}
            style={{fontWeight: '500', marginLeft: 10}}>
            {item.name}
          </MText>
        </View>

        {item.id !== 2 && item.id < 6 && (
          <ARROW
            stroke={'#363636'}
            strokeWidth={1.3}
            style={{transform: [{rotate: '180deg'}]}}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});