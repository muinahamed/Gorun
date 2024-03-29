import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  Linking,
  StyleSheet,
} from 'react-native';
import {BLACK, LITE_BLACK, RED, WHITE} from '../../utils/Color';
// import IntentLauncher, {IntentConstant} from 'react-native-intent-launcher';
import MText, {
  medium,
  openSansLight,
  openSansSemiBold,
} from '../../common/MText';

import RBSheet from 'react-native-raw-bottom-sheet';
import {windowWidth} from '../../utils/Measure';
import {androidLocationEnable, requestLocationPermission} from './HomeHelper';
import {showErrorMessage} from '../../utils/BaseUtils';
import {useNavigation} from '@react-navigation/native';

const LocationEnableSheet = props => {
  const navigation = useNavigation();
  const {refRBSheet} = props;

  const openAppSettings = async () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      let androidLocationEnableModule = await androidLocationEnable();
      if (androidLocationEnableModule) {
        let checkPermission = await requestLocationPermission(false).catch(e =>
          Linking.openSettings(),
        );
        if (checkPermission) {
          navigation.reset({
            index: 0,
            routes: [{name: 'home'}],
          });
        }
      } else {
        showErrorMessage('Please turn on location.');
      }
    }
  };

  return (
    <RBSheet
      ref={refRBSheet}
      closeOnPressMask={false}
      closeOnPressBack={false}
      height={(315 / 375) * windowWidth}
      openDuration={250}
      customStyles={{
        container: styles.locationEnabler,
      }}>
      <View
        style={{
          flexDirection: 'column',
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          alignItems: 'center',
          paddingVertical: (25 / 375) * windowWidth,
          paddingHorizontal: 24,
          // backgroundColor: 'red',
        }}>
        <MText
          size={medium}
          fontType={openSansSemiBold}
          color={LITE_BLACK}
          style={{marginTop: 10, textAlign: 'center'}}>
          Enable your location
        </MText>

        <MText
          size={medium}
          fontType={openSansLight}
          color={BLACK}
          style={{marginTop: 10, textAlign: 'center', lineHeight: 20}}>
          Please enable your location in order to find shops near you.
        </MText>

        <TouchableOpacity
          onPress={() => openAppSettings()}
          style={{
            flexDirection: 'row',
            marginTop: 40,
            backgroundColor: RED,
            borderRadius: 10,
            padding: 10,
            width: windowWidth - 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MText
            size={medium}
            fontType={openSansSemiBold}
            color={WHITE}
            style={{marginStart: 10, textAlign: 'center'}}>
            Enable
          </MText>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

export default LocationEnableSheet;

const styles = StyleSheet.create({
  locationEnabler: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    backgroundColor: WHITE,
  },
});
