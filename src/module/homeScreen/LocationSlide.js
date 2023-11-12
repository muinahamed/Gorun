import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {WHITE} from '../../utils/Color';
import IconAndText from '../../common/IconAndText';
import {setActiveLocation} from '../../store/slices/appSlice';

const LocationSlide = ({}) => {
  const dispatch = useDispatch();
  const {activeLocation} = useSelector(state => state.app);
  const {selected} = activeLocation;

  const getSelected = async item => {
    dispatch(setActiveLocation({...activeLocation, selected: item}));
  };

  return (
    <View style={styles.body}>
      {activeLocation?.addressList?.map((item, index) => {
        return (
          <IconAndText
            key={index}
            title={item?.address}
            item={item}
            select={selected}
            address={item?.address}
            setSelect={() => {}}
            index={2}
            onPress={() => {
              getSelected(item);
            }}
            style={{marginTop: 10}}
          />
        );
      })}
    </View>
  );
};

export default LocationSlide;

const styles = StyleSheet.create({
  body: {
    backgroundColor: WHITE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
