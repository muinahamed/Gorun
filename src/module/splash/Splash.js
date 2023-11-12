import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {LOGO} from '../../image/PicturePath';
import {WHITE} from '../../utils/Color';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

const Splash = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.app);
  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 4,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => checkLogin());
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: WHITE,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.Image
        source={LOGO}
        style={[
          styles.logo,
          {
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1, 4],
                  outputRange: [0.7, 0.6, 1],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
  },
});
