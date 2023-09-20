import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MText, {interRegular, medium, semiMedium} from '../../common/MText';
import {windowWidth} from '../../utils/Measure';

const MyProfileBody = ({userInfo}) => {
  const RenderItem = ({item}) => (
    <View style={{width: windowWidth - 94, marginBottom: 22}}>
      <MText
        size={semiMedium}
        fontType={interRegular}
        color={'#737373'}
        style={{fontWeight: '400'}}>
        {item.title}
      </MText>
      <MText
        size={medium}
        numberOfLines={1}
        fontType={interRegular}
        color={'#363636'}
        style={{fontWeight: '500', marginTop: 8}}>
        {item.value}
      </MText>
    </View>
  );

  return (
    <View
      style={{
        paddingTop: 30,
        paddingHorizontal: 26,
      }}>
      {userInfo?.map((item, index) => {
        return (
          <View key={index}>
            <RenderItem item={item} />
          </View>
        );
      })}
    </View>
  );
};

export default MyProfileBody;

const styles = StyleSheet.create({});
