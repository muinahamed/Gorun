import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import MText, {interRegular, small} from '../../common/MText';
import {userType} from '../../utils/Data';
import Child from './Child';
import {BLACK} from '../../utils/Color';
import {useNavigation} from '@react-navigation/native';

const ChooseUser = () => {
  const navigation = useNavigation();
  const onPress = index => {
    if (index == 0) {
      navigation.reset({
        index: 0,
        routes: [{name: 'onboarding'}],
      });
    } else {
      navigation.navigate('');
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
