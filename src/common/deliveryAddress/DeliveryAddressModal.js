import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {LITE_BLACK, PRIMARY_COLOR, RED, WHITE} from '../../utils/Color';
import MText, {interRegular, semiMedium} from '../MText';
import {MButton} from '../MButton';
import MapView from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {ScrollView} from 'react-native-gesture-handler';
import {useRef} from 'react';
import {useEffect} from 'react';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import CURRENT_LOCATION from '../../image/svg/currentLocation.svg';
import {MaterialTextInput} from '../MaterialTextInput';
import {windowWidth} from '../../utils/Measure';
import {GOOGLE_KEY} from '../../utils/ApiKey';
import {LOCATION_TRACER} from '../../image/PicturePath';
import FormValidation from '../FormValidation';
const addressLabel = ['home', 'office', 'others'];

const DeliveryAddressModal = ({
  setDeliveryAddressModal,
  select,
  setSelect,
  loading,
  edit,
}) => {
  const placeRef = useRef();
  const mapRef = useRef();
  const [address, setAddress] = useState();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(0)).current;
  const [aptError, setAptError] = useState('');
  const [nickNameError, setNickNameError] = useState();
  const [pinError, setPinError] = useState('');
  const [backButton, setBackButton] = useState(false);
  const [prevent, setPrevent] = useState(false);

  const gotoCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;

        setPrevent(false);

        mapRef?.current?.animateToRegion({
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      },
      () => {},
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    setAddress({...select});
    if (!select?.latitude) {
      setTimeout(() => gotoCurrentLocation('First Time'), 200);
    } else {
      if (edit) {
        setPrevent(true);
        mapRef?.current?.animateToRegion({
          latitude: select?.latitude,
          longitude: select?.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    }
  }, [select]);

  const extract = async (results, googleApi) => {
    if (prevent) {
      return;
    }
    var country, postal_code, locality, state;
    for (let i = 0; i < results.address_components.length; ++i) {
      for (let j = 0; j < results.address_components[i].types.length; ++j) {
        if (!country && results.address_components[i].types[j] == 'country')
          country = results.address_components[i].long_name;
        else if (
          !postal_code &&
          results.address_components[i].types[j] == 'postal_code'
        )
          postal_code = results.address_components[i].long_name;
        else if (
          !locality &&
          results.address_components[i].types[j] == 'locality'
        )
          locality = results.address_components[i].long_name;
        else if (
          !state &&
          results.address_components[i].types[j] ==
            'administrative_area_level_1'
        )
          state = results.address_components[i].long_name;
      }
    }

    let latitude = results?.geometry?.location?.lat;
    let longitude = results?.geometry?.location?.lng;

    if (googleApi) {
      mapRef?.current?.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      swipe(0);
      setPrevent(true);
    } else {
      placeRef.current?.setAddressText(results?.formatted_address);
    }

    //check zones

    setAddress(value => {
      return {
        ...value,
        address: results?.name
          ? `${results?.name} `
          : results.formatted_address,
        latitude: latitude,
        longitude: longitude,
        country: country,
        state: state,
        city: locality,
        primary: true,
        instructions: '',
        pin: '',
      };
    });
  };

  let saveAddress = () => {
    let aptValidate = validate('apt', address?.apartment);
    let nameValidation = validate('nickname', address?.nickname);
    let pinValidate = validate('pin', address?.pin);

    if (aptValidate === '' && nameValidation === '' && pinValidate === '') {
      setSelect({...address, index: select?.index});
      setDeliveryAddressModal(false);
    }
  };

  const getAddressFromLocation = (lat, long) => {
    Geocoder.init(GOOGLE_KEY);
    Geocoder.from(lat, long)
      .then(json => {
        var results = json.results[0];
        extract(results);
      })
      .catch(error => console.warn(error));
  };

  const validate = (name, value) => {
    var result = FormValidation.validate(name, value);
    // console.log(result);
    switch (name) {
      case 'apt':
        setAptError(result);
        break;
      case 'nickname':
        console.log(result);
        setNickNameError(result);
        break;
      case 'pin':
        setPinError(result);
        break;
      default:
        break;
    }

    return result;
  };

  const swipe = value => {
    if (value) {
      setBackButton(true);
    } else {
      setBackButton(false);
    }
    Animated.timing(translate, {
      toValue: value,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <KeyboardAvoidingView
        style={[{flex: 1}, styles.body]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Animated.View
          style={{
            flex: 1,
            flexDirection: 'row',
            transform: [
              {
                translateX: translate.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -windowWidth],
                }),
              },
            ],
          }}>
          <View style={{width: windowWidth}}>
            <ScrollView>
              <MapViewComponent
                fadeAnim={fadeAnim}
                getAddressFromLocation={getAddressFromLocation}
                mapRef={mapRef}
                gotoCurrentLocation={gotoCurrentLocation}
                address={address}
                backButton={backButton}
                setPrevent={setPrevent}
              />
              <TouchableOpacity
                onPress={() => {
                  swipe(1);
                  setPrevent(false);
                  if (address?.address) {
                    placeRef.current?.setAddressText(address?.address);
                    placeRef.current.focus();
                  }
                }}>
                <MaterialTextInput
                  title={'Location'}
                  placeholder="Add address"
                  numberOfLines={1}
                  marginVertical={0}
                  marginTop={20}
                  multiline={false}
                  value={address?.address}
                  width={windowWidth - 30}
                  marginLeft={15}
                  editable={false}
                  pointerEvents="none"
                />
              </TouchableOpacity>

              <MaterialTextInput
                ref={placeRef}
                title={'Apt/Suite/Floor'}
                placeholder="Apt/Suite/Floor"
                numberOfLines={1}
                marginTop={10}
                multiline={false}
                value={address?.apartment}
                width={windowWidth - 30}
                marginLeft={15}
                errorMessage={aptError}
                onChange={text => {
                  validate('apt', text);
                  setAddress(state => {
                    return {...state, apartment: text};
                  });
                }}
              />
              <MaterialTextInput
                title={`Postal code`}
                placeholder="Postal code"
                numberOfLines={1}
                marginVertical={0}
                multiline={false}
                marginTop={10}
                value={address?.pin}
                width={windowWidth - 30}
                errorMessage={pinError}
                marginLeft={15}
                onChange={text => {
                  validate('pin', text);
                  setAddress(state => {
                    return {...state, pin: text};
                  });
                }}
              />

              <MaterialTextInput
                title={'Nick name'}
                placeholder="Add a label ex.school"
                numberOfLines={1}
                marginVertical={16}
                marginTop={10}
                marginBottom={10}
                multiline={false}
                value={address?.nickname}
                width={windowWidth - 30}
                marginLeft={15}
                errorMessage={nickNameError}
                onChange={text => {
                  validate('nickname', text);
                  setAddress(state => {
                    return {...state, nickname: text};
                  });
                }}
              />
              <View style={styles.flex}>
                {addressLabel?.map((item, index) => (
                  <AddressLabel
                    key={index}
                    title={item}
                    select={address?.addressLabel == item}
                    onPress={() =>
                      setAddress(state => {
                        return {...state, addressLabel: item};
                      })
                    }
                  />
                ))}
              </View>
            </ScrollView>

            <MButton
              title={select?._id ? 'Save Changes' : 'Confirm Location'}
              color={PRIMARY_COLOR}
              textColor={WHITE}
              marginTop={9}
              borderRadius={10}
              fontFamily={interRegular}
              fontWeight={'600'}
              loading={loading}
              onPress={() => {
                saveAddress();
              }}
              paddingVertical={7}
              disabled={address?.addressLabel === undefined}
              width={windowWidth - 30}
              marginBottom={10}
            />
          </View>

          <View style={{width: windowWidth}}>
            <GoogleApiForLocation
              extract={extract}
              select={select}
              placeRef={placeRef}
            />
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </>
  );
};

export default DeliveryAddressModal;

let AddressLabel = ({title, onPress, select}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button(select)}>
      <MText
        size={semiMedium}
        fontType={interRegular}
        color={LITE_BLACK}
        style={{fontWeight: '500'}}>
        {title}
      </MText>
    </TouchableOpacity>
  );
};

const GoogleApiForLocation = ({extract, placeRef}) => {
  return (
    <GooglePlacesAutocomplete
      ref={placeRef}
      returnKeyType={'search'}
      onPress={(data, details = null) => {
        extract(details, 'googleApi');
      }}
      fetchDetails={true}
      placeholder={'Add Address'}
      GooglePlacesDetailsQuery={{
        fields: ['geometry'],
      }}
      query={{
        key: GOOGLE_KEY,
        language: 'en',
      }}
      styles={{
        textInputContainer: {
          width: windowWidth - 30,
          marginLeft: 15,
        },
        description: {
          paddingVertical: 10,
          paddingHorizontal: (15 / 375) * windowWidth,
          color: 'black',
        },
        textInput: {
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
          paddingTop: 9,
          paddingBottom: 9,
          borderColor: '#EEEEEE',
          marginBottom: 10,
        },

        listView: {},
      }}
      suppressDefaultStyles={true}
      enablePoweredByContainer={false}
      debounce={200}
    />
  );
};

const MapViewComponent = ({
  fadeAnim,
  getAddressFromLocation,
  mapRef,
  gotoCurrentLocation,
  setPrevent,
}) => {
  const preventContinuousCall = (latitude, longitude) => {
    getAddressFromLocation(latitude, longitude);
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <MapView
        ref={mapRef}
        zoomEnabled={true}
        mapType={'standard'}
        loadingEnabled={true}
        scrollEnabled={true}
        showsUserLocation={true}
        style={{
          height: 200,
          width: '100%',
        }}
        onTouchStart={() => {
          setPrevent(false);
          Animated.spring(fadeAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }).start();
        }}
        onRegionChangeComplete={region => {
          if (region.latitude <= 0) {
            return;
          }
          preventContinuousCall(region.latitude, region.longitude);

          Animated.spring(fadeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start();
        }}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}
      />
      <TouchableOpacity
        onPress={() => gotoCurrentLocation()}
        style={{
          position: 'absolute',
          padding: 10,
          bottom: 0,
          right: 0,
        }}>
        <CURRENT_LOCATION />
      </TouchableOpacity>
      <Animated.Image
        source={LOCATION_TRACER}
        style={{
          width: 15,
          height: 18,
          tintColor: RED,
          resizeMode: 'contain',
          position: 'absolute',
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [-9, -20, -20],
              }),
            },
          ],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: () => ({
    flex: 1,
    justifyContent: 'flex-end',
  }),
  body: {
    backgroundColor: WHITE,
    paddingTop: 10,
  },
  button: select => ({
    marginTop: 15,
    marginHorizontal: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: select ? RED : '#EEEEEE',
  }),
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
