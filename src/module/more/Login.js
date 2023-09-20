import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LOGOUT from '../../image/svg/logout.svg';
import MText, {interRegular, medium} from '../../common/MText';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import API from '../../service/API';
import {RED} from '../../utils/Color';
import {setToken, setUser} from '../../store/slices/appSlice';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  let letDoLogOut = async () => {
    API.defaults.headers.common['Authorization'] = ``;

    auth()
      .signOut()
      .then(() => console.log('User signed out!'));

    dispatch(setUser(null));
    dispatch(setToken(null));

    navigation.reset({
      index: 0,
      routes: [{name: 'chooseUser'}],
    });
  };

  let logOutRequest = () => {
    Alert.alert('Confirm Logout', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          letDoLogOut();
        },
      },
    ]);
  };

  return (
    <View style={{marginHorizontal: 20, marginTop: 10}}>
      <TouchableOpacity style={styles.flex} onPress={() => logOutRequest()}>
        <LOGOUT />
        <MText
          size={medium}
          fontType={interRegular}
          style={{fontWeight: '500', color: RED, marginLeft: 10}}>
          Log Out
        </MText>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});
