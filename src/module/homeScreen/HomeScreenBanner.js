import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import FULL_CIRCLE from '../../image/svg/circleFull.svg';
import HALF_CIRCLE from '../../image/svg/circleHalf.svg';
import {windowWidth} from '../../utils/Measure';
import {banner} from '../../utils/Dummy';
import {GRAY_300, GRAY_700} from '../../utils/Color';

const HomeScreenBanner = ({}) => {
  const [active, setActive] = useState(0);

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {}}
        style={{
          borderRadius: 8,
          marginLeft: 10,
        }}>
        <Image
          source={item.image}
          style={{
            width: windowWidth / 1.5,
            height: 120,
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
        {active == index ? (
          <View style={styles.inactive} />
        ) : (
          <View style={styles.active} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={banner}
        horizontal
        contentContainerStyle={{paddingRight: 10}}
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
    alignItems: 'center',
    marginVertical: 10,
  },
  inactive: {
    width: 6,
    height: 6,
    borderRadius: 20,
    backgroundColor: GRAY_300,
  },
  active: {width: 6, height: 6, borderRadius: 20, backgroundColor: GRAY_700},
});
