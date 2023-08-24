import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OnboardingBodyChild from './OnboardingBodyChild';
import {onBoardingImage} from '../../utils/Data';
import {windowWidth} from '../../utils/Measure';

const OnBoardingBody = ({setCurrentPage, horizontalRef}) => {
  const renderItem = ({item, index}) => (
    <OnboardingBodyChild item={item} index={index} />
  );
  return (
    <View style={{flex: 1}}>
      <FlatList
        ref={horizontalRef}
        horizontal
        onMomentumScrollEnd={e =>
          setCurrentPage(
            Math.round(e.nativeEvent.contentOffset.x / windowWidth),
          )
        }
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        data={onBoardingImage}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default OnBoardingBody;

const styles = StyleSheet.create({});
