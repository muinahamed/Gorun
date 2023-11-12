import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {windowWidth} from '../../utils/Measure';
import {FOOD, USER_PIN} from '../../image/PicturePath';

const MapViewOrder = ({origin, destination}) => {
  const navigation = useNavigation();
  const map = useRef();

  return (
    <View style={{marginHorizontal: 15, marginVertical: 10}}>
      <MapView
        ref={map}
        mapType={'standard'}
        onPress={() => navigation.navigate('NewTrackOrder')}
        zoomEnabled={true}
        loadingEnabled={true}
        scrollEnabled={false}
        onLayout={() => {
          setTimeout(() => {
            map?.current?.fitToCoordinates([origin, destination], {
              edgePadding: {
                top: 30,
                right: 50,
                bottom: 30,
                left: 50,
              },
              animated: true,
            });
          }, 1500);
        }}
        style={{
          height: (150 / 375) * windowWidth,
          width: '100%',
        }}
        initialRegion={{
          ...origin,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsCompass={true}
        showsUserLocation={false}
        showsMyLocationButton={true}>
        <Marker
          coordinate={{
            ...origin,
          }}>
          <Image source={FOOD} style={{width: 50, height: 50}} />
        </Marker>

        <Marker
          coordinate={{
            ...destination,
          }}>
          <Image source={USER_PIN} style={{width: 50, height: 50}} />
        </Marker>
      </MapView>
    </View>
  );
};

export default MapViewOrder;

const styles = StyleSheet.create({});
