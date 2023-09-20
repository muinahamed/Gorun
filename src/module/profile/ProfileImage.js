import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MText, {interRegular, large, xLarge20} from '../../common/MText';
import {LITE_BLACK, PRIMARY_COLOR, RED, WHITE} from '../../utils/Color';

const ProfileImage = ({user}) => {
  return (
    <View style={styles.userImageBorder}>
      <View style={styles.userImageMiddle}>
        <Image source={{uri: user?.image}} style={styles.userImage} />
      </View>
      <MText
        size={large}
        fontType={interRegular}
        color={LITE_BLACK}
        style={{fontWeight: '700', marginTop: 12}}>
        {user?.name}
      </MText>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  userImageBorder: {
    alignItems: 'center',
  },
  userImageMiddle: {
    backgroundColor: 'white',
    padding: 3,
    borderRadius: 80,
    marginTop: 10,
    backgroundColor: PRIMARY_COLOR,
  },
  userImage: {
    width: 114,
    height: 114,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: WHITE,
  },
});
