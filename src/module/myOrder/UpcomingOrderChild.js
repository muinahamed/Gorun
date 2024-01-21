import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MText, {interRegular, large, medium} from '../../common/MText';
import ARROW from '../../image/svg/arrow.svg';
import {
  BORDER_COLOR,
  CHAT_ICON_BG,
  CYAN_GRAY,
  LITE_BLACK,
  LITE_GREEN,
  LITE_PENDING_YELLOW,
  WHITE,
} from '../../utils/Color';
import {useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {parseDate} from '../../utils/BaseUtils';

const UpcomingOrderChild = ({item}) => {
  const route = useRoute();

  const totalItem = () => {
    let result = 0;
    item?.items?.map(item => {
      result = result + item?.quantity;
    });
    return result;
  };

  const Item = ({title = 'Status', value = 'Cancel', textTransform}) => (
    <View style={{marginTop: 5}}>
      <MText
        size={medium}
        fontType={interRegular}
        color={CHAT_ICON_BG}
        style={{
          fontWeight: '600',
          lineHeight: 16,
          textTransform,
        }}>
        {`${title}: ${value}`}
      </MText>
    </View>
  );

  let goTo = () => {
    // if (type == 'support') {
    //   navigation.navigate('GetSupportReason', {
    //     type: 'orderSupport',
    //     orderData: item,
    //   });
    //   return;
    // }
    // navigation.navigate('OrderConfirmation', {
    //   orderData: item,
    //   from: 'My Orders',
    // });
  };

  return (
    <View style={styles.container}>
      <MText
        size={medium}
        fontType={interRegular}
        color={CYAN_GRAY}
        numberOfLines={1}
        style={{
          fontWeight: '600',
          lineHeight: 20,
        }}>
        {parseDate(item?.createdAt)}
      </MText>

      <TouchableOpacity
        onPress={() => {
          goTo();
        }}
        style={[styles.flex, {marginTop: 15}]}>
        <LinearGradient style={styles.gradient} colors={['#CC274B', '#007BA8']}>
          <View style={styles.gradientCover}>
            <Image source={{uri: item?.shop?.image}} style={styles.banner} />
          </View>
        </LinearGradient>
        <MText
          size={large}
          fontType={interRegular}
          color={LITE_BLACK}
          numberOfLines={1}
          style={{
            fontWeight: '600',
            lineHeight: 20,
            marginHorizontal: 10,
            flex: 1,
          }}>
          {item?.shop?.name}
        </MText>

        <ARROW style={styles.rotate} />
      </TouchableOpacity>

      <Item
        title="Status"
        textTransform={'capitalize'}
        value={item?.orderStatus?.split('_')?.join(' ')}
      />

      {totalItem() > 0 && (
        <Item title="Number of Items" value={`x${totalItem()}`} />
      )}

      <Item
        title="Total Amount"
        value={item?.summary?.online + item?.summary?.cash}
      />
    </View>
  );
};

export default UpcomingOrderChild;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginHorizontal: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  banner: {
    width: 22,
    height: 22,
    resizeMode: 'cover',
    borderRadius: 30,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradient: {
    padding: 2,
    borderRadius: 30,
  },
  gradientCover: {padding: 1, backgroundColor: WHITE, borderRadius: 100},
  rotate: {
    transform: [{rotate: '180deg'}],
  },
});
