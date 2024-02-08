import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MText, {interRegular, medium} from '../../common/MText';
import {BORDER_COLOR, PRIMARY_COLOR, RED} from '../../utils/Color';

const CustomButton = ({props, style}) => {
  const {onPress, title, loading} = props;
  return (
    <TouchableOpacity
      style={[styles.conatiner, style]}
      onPress={() => onPress(title == 'Accept' ? `accepted` : `canceled`)}>
      <MText
        size={medium}
        fontType={interRegular}
        color={title == 'Accept' ? PRIMARY_COLOR : RED}
        style={{
          fontWeight: '400',
          lineHeight: 16,
          textAlign: 'center',
          opacity: loading ? 0.5 : 1,
        }}>
        {title}
      </MText>
      {loading && (
        <ActivityIndicator
          style={[StyleSheet.absoluteFill, {alignSelf: 'center'}]}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  conatiner: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 6,
    padding: 4,
    margin: 4,
  },
});
