import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MText, {interRegular, medium} from '../../common/MText';
import {GRAY, INACTIVE_DOT, PRIMARY_COLOR} from '../../utils/Color';
import {windowWidth} from '../../utils/Measure';
import {useNavigation} from '@react-navigation/native';

const OnboardingFooter = ({currentPage, setCurrentPage, horizontalRef}) => {
  const navigation = useNavigation();
  const array = [1, 2];

  const Dot = ({index}) => <View style={styles.active(index == currentPage)} />;

  const goTo = index => {
    horizontalRef?.current?.scrollToIndex({index: index});
    setCurrentPage(index);
    if (index == 1 && currentPage == 1) {
      navigation.navigate('mobileSignup');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('mobileSignup')}>
        <MText
          size={medium}
          fontType={interRegular}
          color={GRAY}
          style={{
            lineHeight: 20,
            fontWeight: '400',
            textAlign: 'center',
          }}>
          Skip
        </MText>
      </TouchableOpacity>
      <View style={styles.flex}>
        {array?.map((item, index) => {
          return (
            <View key={index}>
              <Dot index={index} />
            </View>
          );
        })}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => goTo(1)}>
        <MText
          size={medium}
          fontType={interRegular}
          color={PRIMARY_COLOR}
          style={{
            lineHeight: 20,
            fontWeight: '500',
            textAlign: 'center',
          }}>
          Next
        </MText>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingFooter;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '8%',
    marginBottom: '6%',
  },
  active: status => ({
    width: 10,
    height: 10,
    borderRadius: 30,
    marginHorizontal: 5,
    backgroundColor: status ? PRIMARY_COLOR : INACTIVE_DOT,
  }),
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
});
