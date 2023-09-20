import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import MText, {
  interRegular,
  large,
  semiMedium,
  small,
  xLarge,
} from '../../common/MText';
import ARROW from '../../image/svg/arrow.svg';
import {
  GRAY_600,
  GRAY_700,
  LITE_BLACK,
  PRIMARY_COLOR,
  WHITE,
} from '../../utils/Color';
import {moreFirst, moreThird} from '../../utils/Data';
import RenderItem from './RenderItem';

const MoreUser = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.app);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileBorder}>
          <Image source={{uri: user?.image}} style={styles.profile} />
        </View>

        <View
          style={{
            marginLeft: 15,
          }}>
          <MText
            size={large}
            fontType={interRegular}
            color={LITE_BLACK}
            style={{fontWeight: '700'}}>
            {user?.name}
          </MText>
          <MText
            size={semiMedium}
            fontType={interRegular}
            color={GRAY_700}
            style={{fontWeight: '600', marginTop: 4}}>
            {user?.phoneNumber}
          </MText>

          <TouchableOpacity onPress={() => navigation.navigate('myProfile')}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 4,
              }}>
              <MText
                size={small}
                fontType={interRegular}
                color={GRAY_700}
                style={{fontWeight: '600'}}>
                View or Edit Profile
              </MText>
              <ARROW
                stroke={WHITE}
                width={6}
                height={10}
                style={{marginLeft: 5, transform: [{rotate: '180deg'}]}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.card}>
        {moreFirst?.map((item, index) => {
          return (
            <View key={index + 'First'}>
              <RenderItem item={item} index={index} />
            </View>
          );
        })}
      </View>
      <View style={styles.card}>
        {moreThird?.map((item, index) => {
          return (
            <View key={index + 'Second'}>
              <RenderItem item={item} index={index} />
            </View>
          );
        })}
      </View>
    </>
  );
};

export default MoreUser;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    marginTop: 10,
  },
  profileBorder: {
    padding: 2.5,
    backgroundColor: 'white',
    borderRadius: 80,
    padding: 3,
    backgroundColor: PRIMARY_COLOR,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: WHITE,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: WHITE,
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 7,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#F3F3F6',
  },
  stack: {
    position: 'absolute',
    right: -20,
  },
});
