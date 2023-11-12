import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import FULL_CIRCLE from '../../image/svg/circleFull.svg';
import HALF_CIRCLE from '../../image/svg/circleHalf.svg';
import {windowWidth} from '../../utils/Measure';
import {banner} from '../../utils/Dummy';

const HomeScreenBanner = ({}) => {
  const [active, setActive] = useState(0);

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {}}
        style={{
          height: 180,
          borderRadius: 8,
          marginHorizontal: 15,
        }}>
        <Image
          source={item.image}
          style={{
            width: windowWidth - 30,
            height: 180,
            borderRadius: 8,
          }}
          resizeMode="cover"
        />
      </Pressable>
    );
  };

  const renderItems = ({item, index}) => {
    return (
      <View style={{marginHorizontal: 2.5}}>
        {active == index ? <FULL_CIRCLE /> : <HALF_CIRCLE />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={banner}
        pagingEnabled
        horizontal
        contentContainerStyle={{}}
        onMomentumScrollEnd={e =>
          setActive(Math.round(e.nativeEvent.contentOffset.x / windowWidth))
        }
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
      <View style={styles.indicator}>
        <FlatList
          data={banner}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItems}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};

export default HomeScreenBanner;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  banner: {
    width: windowWidth,
    height: 165,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 6,
    alignItems: 'center',
  },
});
