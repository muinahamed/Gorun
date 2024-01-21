import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PRIMARY_COLOR, WHITE} from '../../utils/Color';
import MText, {interRegular, medium, small} from '../../common/MText';
import ARROW from '../../image/svg/arrow.svg';

const Batch = () => {
  return (
    <View style={[styles.container, styles.flex]}>
      <MText
        size={medium}
        fontType={interRegular}
        color={WHITE}
        style={{fontWeight: '700', flex: 1}}>
        Popular
      </MText>
      <MText
        size={small}
        fontType={interRegular}
        color={WHITE}
        style={{fontWeight: '600'}}>
        Pay smarter, Pay Later
      </MText>
      <ARROW stroke={WHITE} style={styles.rotation} width={14} height={12} />
    </View>
  );
};

export default Batch;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
    marginBottom: 5,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rotation: {
    transform: [{rotate: '180deg'}],
  },
});
