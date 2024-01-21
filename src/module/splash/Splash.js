import {Animated, Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {LOGO, startingVideo} from '../../image/PicturePath';
import {RED, WHITE} from '../../utils/Color';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Video from 'react-native-video';
import {windowWidth} from '../../utils/Measure';

const Splash = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.app);

  let checkLogin = () => {
    if (user) {
      if (user?.shopType) {
        navigation.reset({
          index: 0,
          routes: [{name: 'shopDetails'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'home'}],
        });
      }
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'chooseUser'}],
      });
    }
  };

  const disable = () => {
    let mAuth = FirebaseAuthTypes.getInstance();
    // set this to remove reCaptcha web
    mAuth.getFirebaseAuthSettings().setAppVerificationDisabledForTesting(true);
  };

  return (
    <View
      style={styles.container}
      onLayout={e => console.log(e.nativeEvent.layout)}>
      <Video
        source={startingVideo}
        style={styles.backgroundVideo}
        resizeMode="cover"
        onEnd={checkLogin}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  backgroundVideo: {
    width: windowWidth,
    height: 0.5625 * windowWidth,
  },
});
