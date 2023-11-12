import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_KEY} from '../../utils/ApiKey';
import {GET_ALL_ADDRESS} from '../../service/ApiEndPoint';
import API from '../../service/API';
import {setActiveLocation} from '../../store/slices/appSlice';

export const requestLocationPermission = () => {
  return new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      resolve('Success');
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('Success');
        } else {
          reject('fail');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  });
};

export const getOneTimeLocation = (refresh, dispatch) => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        getData(currentLatitude, currentLongitude, refresh, dispatch);
        resolve('success');
      },
      e => {
        reject(e);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  });
};

const getData = async (latitude, longitude, refresh, dispatch) => {
  if (refresh) {
    dispatch(
      setActiveLocation({
        ...refresh,
      }),
    );
    return;
  }

  var response = await API.get(GET_ALL_ADDRESS);

  if (response?.status === true) {
    let closeDistance = {
      distance: 210,
      index: -1,
      currentLatitude: 0,
      currentLongitude: 0,
    };

    response?.data?.userAddresses?.map((item, index) => {
      let addressLatitude = item?.location?.coordinates[1];
      let addressLongitude = item?.location?.coordinates[0];

      let tempDistance = distanceMiter(
        latitude,
        longitude,
        addressLatitude,
        addressLongitude,
      );

      console.log(tempDistance);

      if (
        tempDistance <= 300 &&
        (closeDistance.index === -1 || closeDistance.distance > tempDistance)
      ) {
        closeDistance.distance = tempDistance;
        closeDistance.index = index;
        closeDistance.currentLatitude = addressLatitude;
        closeDistance.currentLongitude = addressLongitude;
      }
    });

    if (closeDistance?.index != -1) {
      dispatch(
        setActiveLocation({
          origin: 'CLOSE_LOCATION',
          selected: response?.data?.userAddresses[closeDistance.index],
          addressList: response?.data?.userAddresses,
        }),
      );
      return;
    }
  }

  Geocoder.init(GOOGLE_KEY);
  Geocoder.from(latitude, longitude)
    .then(json => {
      var addressComponent = json.results[0];
      const obj = extractAddressComponent(addressComponent);

      let addressObj = {
        origin: 'CURRENT_LOCATION',
        selected: {_id: 1, ...obj},
        addressList: response?.data?.userAddresses,
      };

      dispatch(setActiveLocation(addressObj));
    })
    .catch(error => console.warn(error));
};

const extractAddressComponent = results => {
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
        results.address_components[i].types[j] == 'administrative_area_level_1'
      )
        state = results.address_components[i].long_name;
    }
  }

  let latitude = results?.geometry?.location?.lat;
  let longitude = results?.geometry?.location?.lng;

  //check zoons

  return {
    latitude: latitude,
    longitude: longitude,
    country: country,
    state: state,
    city: locality,
    address: results.formatted_address,
  };
};

const distanceMiter = (lat1, lon1, lat2, lon2) => {
  // console.log(lat1, lon1, lat2, lon2);
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000;
};

function toRad(Value) {
  return (Value * Math.PI) / 180;
}
