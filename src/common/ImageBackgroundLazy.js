import {Animated, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ImageBackgroundLazy = props => {
  const {children, style, resizeMethod, imageStyle, source} = props;
  const design = {style, resizeMethod, imageStyle, source};

  const thumbnailAnimated = new Animated.Value(0);

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Animated.View
        style={[styles.container(thumbnailAnimated), imageStyle]}
      />
      <Animated.View style={{opacity: thumbnailAnimated}}>
        <ImageBackground {...design} onLoad={handleThumbnailLoad}>
          {children}
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

export default ImageBackgroundLazy;

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
