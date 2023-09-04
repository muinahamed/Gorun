import React from 'react';
import {View} from 'react-native';
import MText, {interRegular, medium} from './MText';

import {ORDER_ID_GRAY, WHITE} from '../utils/Color';

const Empty = ({msg}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40,
        justifyContent: 'center',
        backgroundColor: WHITE,
      }}>
      <MText
        size={medium}
        fontType={interRegular}
        color={ORDER_ID_GRAY}
        style={{fontWeight: '500'}}>
        {msg}
      </MText>
    </View>
  );
};

export default Empty;
