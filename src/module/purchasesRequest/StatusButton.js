import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MText, {interRegular, medium} from '../../common/MText';
import {
  BORDER_COLOR,
  LITE_BLACK,
  PRIMARY_COLOR,
  WHITE,
} from '../../utils/Color';
const AllStatus = [`pending`, `accepted`, `canceled`];

const StatusButton = ({props}) => {
  const {activeStatus, setActiveStatus} = props;
  return (
    <View>
      <ScrollView horizontal>
        {AllStatus?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveStatus(item)}
              style={[styles.button, activeStatus == item && styles.active]}>
              <MText
                size={medium}
                fontType={interRegular}
                color={activeStatus == item ? WHITE : LITE_BLACK}
                style={{
                  fontWeight: '400',
                  lineHeight: 16,
                }}>
                {item}
              </MText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default StatusButton;

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15,
  },
  active: {
    backgroundColor: PRIMARY_COLOR,
  },
});
