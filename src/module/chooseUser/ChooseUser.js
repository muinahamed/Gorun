import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import MText, {interRegular, small} from '../../common/MText';
import {userType} from '../../utils/Data';
import Child from './Child';
import {BLACK} from '../../utils/Color';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

const ChooseUser = () => {
  const navigation = useNavigation();
  const {firstTimeLaunch} = useSelector(state => state.app);

  const onPress = index => {
    try {
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    } catch (e) {}

    if (index == 0) {
      if (firstTimeLaunch) {
        navigation.reset({
          index: 0,
          routes: [{name: 'onboarding'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'mobileSignup', params: {type: 'user'}}],
          // routes: [{name: 'userRegistration'}],
        });
      }
    } else {
      navigation.reset({
        index: 0,
        routes: [
          {
            // name: 'shopRegistration',
            name: 'mobileSignup',
            params: {type: 'shop', params: {type: 'shop'}},
          },
        ],
      });
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        <MText
          size={small}
          fontType={interRegular}
          color={'#737373'}
          style={{
            fontWeight: '400',
            lineHeight: 20,
            margin: 15,
            textAlign: 'justify',
            marginTop: 20,
          }}>
          This is an ecommerce app you can use it for buy and sell product
          <MText
            size={small}
            fontType={interRegular}
            color={BLACK}
            style={{
              fontWeight: '700',
              lineHeight: 20,
              margin: 15,
            }}>
            {` FAQ`}
          </MText>
        </MText>
        {userType.map((item, index) => {
          return (
            <View key={index}>
              <Child item={item} index={index} onPress={onPress} />
            </View>
          );
        })}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ChooseUser;

const styles = StyleSheet.create({});
