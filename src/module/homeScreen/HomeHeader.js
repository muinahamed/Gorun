import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import USER from '../../image/svg/user.svg';
import LOCATION from '../../image/svg/location.svg';
import MText, {
  interRegular,
  medium,
  semiSmall,
  small,
} from '../../common/MText';
import {PRIMARY_COLOR, RED, WHITE} from '../../utils/Color';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
let show = false;

const HomeHeader = ({locationPress}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(state => state.app);
  const translate = useRef(new Animated.Value(0)).current;
  const timeOut = useRef();

  const startAnim = () => {
    setLoading(true);
    Animated.timing(translate, {
      toValue: show ? 92 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setLoading(false));
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={() => navigation.navigate('more')}>
        <USER />
      </TouchableOpacity>

      <View style={{marginHorizontal: 6, flex: 1}}>
        <View style={styles.flex}>
          <MText
            size={medium}
            fontType={interRegular}
            color={WHITE}
            numberOfLines={1}
            style={{
              fontWeight: '400',
              marginRight: 6,
              textTransform: 'capitalize',
            }}>
            {user?.name}
          </MText>
        </View>
        <TouchableOpacity
          onPress={() => {
            show = !show;
            startAnim();
            if (show) {
              timeOut.current = setTimeout(() => {
                show = !show;
                startAnim();
              }, 4000);
            } else {
              clearTimeout(timeOut?.current);
            }
          }}
          style={{
            width: 120,
            height: 28,
            backgroundColor: WHITE,
            borderRadius: 30,
            marginTop: 2,
          }}>
          <Animated.View
            style={{
              backgroundColor: PRIMARY_COLOR,
              alignSelf: 'flex-start',
              borderRadius: 30,
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 4,
              transform: [{translateX: translate}],
            }}>
            <MText
              size={small}
              fontType={interRegular}
              color={WHITE}
              style={{
                fontWeight: '600',
                lineHeight: 18,
              }}>
              ৳
            </MText>
          </Animated.View>
          {!loading && (
            <MText
              size={semiSmall}
              fontType={interRegular}
              color={PRIMARY_COLOR}
              style={{
                fontWeight: '700',
                lineHeight: 24,
                position: 'absolute',
                width: '100%',
                textAlign: 'center',
              }}>
              {show ? `100` : `   See balance`}
            </MText>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{padding: 10}} onPress={locationPress}>
        <LOCATION />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  mother: {
    zIndex: 1,
    backgroundColor: WHITE,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: PRIMARY_COLOR,
    paddingTop: 2,
    paddingBottom: 10,
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
  },

  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  border: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: RED,
    borderRadius: 7,
    marginRight: 13,
  },
});
