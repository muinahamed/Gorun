import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {CHAT_ICON_BG, IAMGE_BORDER_COLOR, WHITE} from '../utils/Color';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ImageBackgroundLazy from './ImageBackgroundLazy';
import {windowWidth} from '../utils/Measure';
import MText, {interRegular, medium, semiMedium} from './MText';
import Location from '../image/svg/location.svg';
import MakeLove from './MakeLove';

const ShopListViewLarge = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('shopDetails', {shopDetails: item})}
      style={styles.container}>
      <ImageBackgroundLazy
        style={styles.image}
        resizeMethod={'scale'}
        imageStyle={styles.imageBorder}
        source={{uri: item?.image}}>
        <LinearGradient style={styles.gradient} colors={['#CC274B', '#007BA8']}>
          <View style={styles.gradientCover}>
            <Image
              style={[styles.logo]}
              resizeMode={'cover'}
              source={{uri: item?.image}}
            />
          </View>
        </LinearGradient>
      </ImageBackgroundLazy>

      <MakeLove item={item} />

      <View style={{flex: 1, marginTop: 10}}>
        <MText
          size={semiMedium}
          fontType={interRegular}
          numberOfLines={1}
          color={CHAT_ICON_BG}
          style={{
            fontWeight: '700',
            flex: 1,
          }}>
          {item?.name}
        </MText>
        <View style={styles.flex}>
          <Location width={14} height={14} />
          <MText
            size={semiMedium}
            fontType={interRegular}
            numberOfLines={1}
            color={CHAT_ICON_BG}
            style={{
              fontWeight: '400',
              flex: 1,
            }}>
            {item?.shopAddress?.address}
          </MText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShopListViewLarge;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  image: {
    width: windowWidth - 30,
    height: 200,
  },
  offer: {
    top: 8,
    left: 8,
    width: 210,
  },

  logo: {
    width: 29,
    height: 29,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  content: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradient: {
    padding: 2,
    borderRadius: 30,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  gradientCover: {padding: 1, backgroundColor: WHITE, borderRadius: 100},
  imageBorder: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: IAMGE_BORDER_COLOR,
  },
});
