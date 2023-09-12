/* eslint-disable react-native/no-inline-styles */
import RNDateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {LITE_BLACK, RED, WHITE} from '../utils/Color';
import MText, {interRegular, medium} from './MText';
import {windowWidth} from '../utils/Measure';

const DOBpicker = ({DateTime, setYear, setMonth, setDay, temp, setTemp}) => {
  let now = new Date();
  let day = temp.toLocaleString('default', {day: '2-digit'});
  let month = temp.toLocaleString('default', {month: 'numeric'});
  let year = temp.toLocaleString('default', {year: 'numeric'});

  return (
    <View
      style={{
        backgroundColor: 'White',
        flexDirection: 'column',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        alignItems: 'center',
      }}>
      <MText
        size={medium}
        fontType={interRegular}
        color={LITE_BLACK}
        style={{marginTop: 15, fontWeight: '600'}}>
        Date of Birth
      </MText>

      <RNDateTimePicker
        value={temp}
        themeVariant="light"
        textColor="black"
        maximumDate={now}
        style={{backgroundColor: 'white'}}
        display={'spinner'}
        onChange={(event, timestamp) => {
          setTemp(timestamp);
        }}
        mode="date"
      />

      <MText
        size={medium}
        fontType={interRegular}
        color={LITE_BLACK}
        style={{marginTop: 15, fontWeight: '600'}}>
        {`${year} / ${month} / ${day} `}
      </MText>

      <TouchableOpacity
        onPress={() => {
          setDay(day);
          setMonth(month);
          setYear(year);

          DateTime?.current?.close();
        }}
        style={{
          backgroundColor: RED,
          width: (327 / 375) * windowWidth,
          alignItems: 'center',
          borderRadius: 10,
          marginTop: 25,
        }}>
        <MText
          size={medium}
          fontType={interRegular}
          color={WHITE}
          style={{fontWeight: '600', lineHeight: 44}}>
          SET
        </MText>
      </TouchableOpacity>
    </View>
  );
};

export default DOBpicker;
