import React, {useRef} from 'react';
import {StyleSheet, Text} from 'react-native';
import {View, Animated} from 'react-native';

const LazyImage = props => {
  const {source, style} = props;
  const thumbnailAnimated = useRef(new Animated.Value(0)).current;

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Animated.View style={[styles.container(thumbnailAnimated), style]} />
      <Animated.Image
        {...props}
        source={{
          uri: source?.uri,
        }}
        style={[style, {opacity: thumbnailAnimated}]}
        onLoad={handleThumbnailLoad}
      />
    </View>
  );
};

export default LazyImage;

const styles = StyleSheet.create({
  container: thumbnailAnimated => ({
    backgroundColor: '#e1e4e8',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: thumbnailAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
  }),
});
