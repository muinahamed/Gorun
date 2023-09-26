import {Image, StyleSheet, Switch, View} from 'react-native';
import React from 'react';
import {
  BLACK,
  WHITE,
  RED,
  LITE_BLACK,
  LITE_GRAY_TOGGLEBUTTON,
  SECOND_PRIMARY,
} from '../utils/Color';
import MText, {interRegular, small} from './MText';
import {ETA} from '../image/PicturePath';
import CASH from '../image/svg/cash.svg';

const ButlerCard = ({
  title = `Your Order`,
  time,
  address,
  addressValue,
  deliveryTime,
  des,
  TitleImage,
  textTransform,
  bringChangeStatus,
  toggle,
  setToggle,
  payment,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}>
        <View style={styles.flex}>
          {TitleImage && (
            <TitleImage style={{marginRight: 8}} fill={LITE_BLACK} />
          )}
          <MText
            size={small}
            fontType={interRegular}
            color={BLACK}
            style={{
              fontWeight: '600',
              lineHeight: 22,
              textTransform: textTransform || 'capitalize',
            }}>
            {title}
          </MText>
        </View>
      </View>

      {address && (
        <View
          style={{
            marginTop: 13,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <MText
            size={small}
            fontType={interRegular}
            color={'#262626'}
            style={{
              fontWeight: '500',
            }}>
            {addressValue?.latitude ? addressValue?.nickname : 'Add Address'}
          </MText>
        </View>
      )}

      {bringChangeStatus && (
        <>
          <View style={styles.flex}>
            <MText
              size={small}
              fontType={interRegular}
              color={'#737373'}
              style={{
                fontWeight: '400',
              }}>
              Bring Change
            </MText>

            <Switch
              trackColor={{
                false: LITE_GRAY_TOGGLEBUTTON,
                true: SECOND_PRIMARY,
              }}
              style={{
                transform: [{scaleX: 0.7}, {scaleY: 0.7}, {translateX: 10}],
              }}
              thumbColor={WHITE}
              ios_backgroundColor={LITE_GRAY_TOGGLEBUTTON}
              onValueChange={() => {
                setToggle(!toggle);
              }}
              value={toggle}
            />
          </View>
        </>
      )}

      {time && (
        <View style={styles.time}>
          <Image
            source={ETA}
            style={{width: 15, height: 14, tintColor: BLACK}}
          />
          <MText
            size={small}
            fontType={interRegular}
            color={'#262626'}
            style={{
              fontWeight: '400',
              marginLeft: 10,
            }}>
            {deliveryTime}
          </MText>
        </View>
      )}
      {payment && (
        <View style={styles.time}>
          <CASH />
          <MText
            size={small}
            fontType={interRegular}
            color={'#262626'}
            style={{
              fontWeight: '400',
              marginLeft: 10,
            }}>
            {'Cash'}
          </MText>
        </View>
      )}
      {des &&
        des?.map((item, index) => {
          return (
            <View style={styles.time} key={index}>
              <MText
                size={small}
                fontType={interRegular}
                color={'#262626'}
                style={{
                  fontWeight: '400',
                  marginLeft: 22,
                  lineHeight: 22,
                }}>
                {item}
              </MText>
            </View>
          );
        })}
    </View>
  );
};

export default ButlerCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginVertical: 7.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: WHITE,
  },
  time: {
    flexDirection: 'row',
    marginTop: 8,
  },
  Deliveyimage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  cameraBack: {
    backgroundColor: SECOND_PRIMARY,
    width: 37,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 10,
  },
  borderRed: {
    borderWidth: 1.5,
    borderColor: RED,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
