import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LOCATION from '../../image/svg/location.svg';
import MText, {interRegular, semiSmall, small} from '../../common/MText';
import {
  BORDER_COLOR,
  CYAN_GRAY,
  LITE_BLACK,
  PRIMARY_COLOR,
  RED,
  WHITE,
} from '../../utils/Color';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {LOGO} from '../../image/PicturePath';
import ARROW from '../../image/svg/arrow.svg';
import Batch from './Batch';
let show = false;

const HomeHeader = ({locationPress}) => {
  const navigation = useNavigation();
  const {activeLocation, user} = useSelector(state => state.app);
  const {selected} = activeLocation;
  const [loading, setLoading] = useState(false);
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
    <>
      <View style={[styles.container]}>
        <View style={[styles.flex, {flex: 1}]}>
          <Image source={LOGO} style={{height: 30, width: 30}} />
          <MText
            size={small}
            fontType={interRegular}
            color={LITE_BLACK}
            style={{
              fontWeight: '600',
              lineHeight: 18,
              marginLeft: 5,
            }}>
            GoRun
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
            borderWidth: 1,
            borderColor: BORDER_COLOR,
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
        <TouchableOpacity onPress={() => navigation.navigate('more')}>
          <Image source={{uri: user?.image}} style={styles.profile} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={locationPress}
        style={[styles.flex, {marginHorizontal: 15, marginTop: 8}]}>
        <LOCATION fill={CYAN_GRAY} />
        <MText
          size={small}
          fontType={interRegular}
          color={CYAN_GRAY}
          style={{
            fontWeight: '600',
            lineHeight: 18,
            marginLeft: 5,
            flex: 1,
          }}>
          {selected?.address}
        </MText>
        <ARROW stroke={CYAN_GRAY} style={styles.rotation} />
      </TouchableOpacity>
      <Batch />
    </>
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
    marginTop: 10,
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
  profile: {
    width: 28,
    height: 28,
    borderRadius: 30,
    marginLeft: 10,
  },
  rotation: {
    transform: [{rotate: '180deg'}],
  },
});
