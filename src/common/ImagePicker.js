/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, PermissionsAndroid, Text, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BLACK, GRAY_200, WHITE} from '../utils/Color';

export default function ImagePicker(props) {
  const {dialogVisible, setDialogVisible, selectedImagePath, type} = props;

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
  }, []);

  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 200,
      maxHeight: 200,
    };
    launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped ');
      } else {
        selectedImagePath(res.assets, type);
        setDialogVisible(false);
      }
    });
  };

  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 200,
      maxHeight: 200,
    };

    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        selectedImagePath(res.assets, type);
        setDialogVisible(false);
      }
    });
  };

  return (
    <Modal
      visible={dialogVisible}
      transparent={true}
      animationType={'fade'}
      onRequestClose={() => {
        setDialogVisible(!dialogVisible);
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'rgba(52, 52, 52, 0.6)',
        }}>
        <View
          style={{
            backgroundColor: WHITE,
            width: '80%',
            alignItems: 'center',
            borderRadius: 6,
            elevation: 4,
            flexDirection: 'column',
          }}>
          <Text
            style={{
              color: BLACK,
              fontSize: 18,
              textAlign: 'center',
              paddingVertical: 20,
              marginTop: 10,
            }}
            onPress={() => cameraLaunch()}>
            Take Photo
          </Text>

          <View
            style={{
              height: 1,
              backgroundColor: GRAY_200,
              width: '100%',
            }}
          />

          <Text
            style={{
              color: BLACK,
              fontSize: 18,
              textAlign: 'center',
              paddingVertical: 10,
              marginTop: 10,
              // fontFamily: 'Raleway-Bold',
            }}
            onPress={() => imageGalleryLaunch()}>
            Choose Image From Gallery
          </Text>

          <View
            style={{
              height: 1,
              marginTop: 20,
              backgroundColor: GRAY_200,
              width: '100%',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: GRAY_200,
              borderBottomStartRadius: 6,
              borderBottomEndRadius: 6,
            }}>
            <Text
              style={{
                color: BLACK,
                fontSize: 18,
                padding: 10,
                // fontFamily: 'Raleway-Sembold',
                textAlign: 'center',
                flex: 1,
              }}
              onPress={() => {
                setDialogVisible(false);
              }}>
              Cancel
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
