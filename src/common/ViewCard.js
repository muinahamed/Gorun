import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  RED,
  WHITE,
  LITE_BLACK,
  ORDER_ID_GRAY,
  PRIMARY_COLOR,
} from '../utils/Color';
import MText, {
  interRegular,
  medium,
  openSansRegular,
  semiSmall,
  small,
} from './MText';
import {moderateScale} from '../utils/scaling';
import BASKETIMAGE from '../image/svg/myOrder.svg';
import {windowWidth} from '../utils/Measure';
import {MButton} from './MButton';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const ViewCard = props => {
  const navigation = useNavigation();
  const {cart} = useSelector(state => state.orders);

  if (!cart?.length) return;

  const countTotal = () => {
    let count = 0;
    cart?.map(item => {
      count += item?.quantity;
    });
    return count;
  };

  const totalAmount = () => {
    let total = 0;
    cart?.map(item => {
      total += item?.quantity * item.price;
    });
    return total;
  };

  return (
    <View style={styles.parent}>
      <View style={[styles.container]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.cartBorder}>
              <BASKETIMAGE width={20} height={20} stroke={ORDER_ID_GRAY} />
              <View style={styles.badge}>
                <MText
                  size={small}
                  fontType={openSansRegular}
                  color={WHITE}
                  style={{textAlign: 'center'}}>
                  {countTotal()}
                </MText>
              </View>
            </View>
          </View>
          <View
            style={{
              marginLeft: (10 / 375) * windowWidth,
            }}>
            <MText
              size={semiSmall}
              fontType={interRegular}
              color={'#828282'}
              style={{fontWeight: '700'}}>
              TOTAL PRICE
            </MText>

            <MText
              size={medium}
              fontType={interRegular}
              color={LITE_BLACK}
              style={{textAlign: 'center', fontWeight: '600'}}>
              ${totalAmount()}
            </MText>
          </View>
        </View>
        <View
          style={{
            width: 1,
            height: '80%',
            backgroundColor: 'rgba(28, 29, 32, 0.5)',
          }}
        />

        <View
          style={{
            flex: 1,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <MButton
              title="View cart"
              color={PRIMARY_COLOR}
              textColor={WHITE}
              borderRadius={10}
              fontFamily={interRegular}
              fontWeight={'600'}
              fontSize={moderateScale(14)}
              onPress={() => navigation.navigate('cartScreen')}
              paddingVertical={7}
              width={162}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewCard;

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 30,
    height: 30,
    borderColor: WHITE,
    borderWidth: 3,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  cartBorder: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 10,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parent: {
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    backgroundColor: WHITE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 10,
  },
  animationBar: {
    width: windowWidth - 30,
    height: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
