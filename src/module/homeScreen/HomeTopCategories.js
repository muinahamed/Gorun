import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import MText, {interRegular, semiMedium, semiSmall} from '../../common/MText';
import FOOD from '../../image/svg/home/food.svg';
import {useNavigation} from '@react-navigation/native';
import {LITE_BLACK, PRIMARY_COLOR, WHITE} from '../../utils/Color';
import {windowWidth} from '../../utils/Measure';
import RADIO_ON from '../../image/svg/radioOn.svg';
import RADIO_OFF from '../../image/svg/radioOff.svg';
import {useEffect, useState} from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import ARROW from '../../image/svg/arrowDown.svg';
const categoryType = [
  {Image: RADIO_ON, name: 'All', active: true, slug: 'both'},
  {Image: RADIO_OFF, name: 'Virtual shop', active: false, slug: 'online'},
  {Image: RADIO_OFF, name: 'Physical shop', active: false, slug: 'offline'},
];

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const HomeTopCategories = ({category}) => {
  const navigation = useNavigation();
  const totalHeight = useSharedValue(0);
  const [selectCategory, setSelectCategory] = useState(categoryType);
  const [expand, setExpand] = useState(false);

  const goToCategory = item => {
    navigation.navigate('categoryDetails', {
      item,
    });
  };

  const getCategory = () =>
    category?.filter(item => {
      let active = selectCategory?.find(item => item.active);
      if (active?.slug == 'both') {
        return true;
      } else {
        if (
          item?.activeStatus == active?.slug ||
          item?.activeStatus == 'both'
        ) {
          return true;
        } else {
          return false;
        }
      }
    });

  const heightStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(totalHeight.value, [0, 36, 92], [0, 36, 92]),
    };
  });

  useEffect(() => {
    setExpand(false);
    if (getCategory()?.length > 4) {
      totalHeight.value = withTiming(210);
    } else {
      totalHeight.value = withTiming(110);
    }
  }, [selectCategory, category]);

  return (
    <View style={[styles.boxWithShadow, styles.main]}>
      <ScrollView horizontal contentContainerStyle={styles.radio}>
        {selectCategory?.map((Item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.radioItem}
              onPress={() => {
                setSelectCategory(state =>
                  state?.map(child =>
                    child.name == Item.name
                      ? {...child, active: true, Image: RADIO_ON}
                      : {...child, active: false, Image: RADIO_OFF},
                  ),
                );
              }}>
              <Item.Image />
              <MText
                size={semiMedium}
                fontType={interRegular}
                color={'#363636'}
                numberOfLines={1}
                style={{
                  fontWeight: '500',
                  lineHeight: 16,
                  marginLeft: 10,
                  color: LITE_BLACK,
                }}>
                {Item.name}
              </MText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Animated.View style={[heightStyle, {overflow: 'hidden'}]}>
        <FlatList
          data={getCategory()}
          numColumns={4}
          ListFooterComponent={() =>
            getCategory()?.length > 4 ? <View style={{height: 50}} /> : null
          }
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                pointerEvents={'box-only'}
                onPress={() => goToCategory(item)}
                style={{
                  marginTop: 15,
                  width: windowWidth / 4,
                  alignItems: 'center',
                  zIndex: 10,
                }}>
                <FOOD fill={'#363636'} width={60} height={60} />

                <MText
                  size={semiMedium}
                  fontType={interRegular}
                  color={'#363636'}
                  numberOfLines={1}
                  style={{
                    fontWeight: '500',
                    color: LITE_BLACK,
                    lineHeight: 17,
                    marginTop: 8,
                    maxWidth: (windowWidth - 80) / 4,
                  }}>
                  {item.name}
                </MText>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index}
        />
        {getCategory()?.length > 4 && !expand && (
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 100,
            }}>
            <LinearGradient
              style={{
                backgroundColor: 'rgba(255,255,255,.4)',
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              colors={[
                'rgba(255,255,255,0)',
                'rgba(255,255,255,.8)',
              ]}></LinearGradient>
          </Animated.View>
        )}
        {getCategory()?.length > 4 && (
          <TouchableOpacity
            style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}
            onPress={() => {
              if (expand) {
                totalHeight.value = withTiming(200);
                setTimeout(() => setExpand(!expand), 0);
              } else {
                let temp = Math.ceil(getCategory()?.length / 4);
                totalHeight.value = withTiming(temp * 100 + 50);
                setTimeout(() => setExpand(!expand), 0);
              }
            }}>
            <Animated.View style={[styles.boxWithShadow, styles.button]}>
              <MText
                size={semiSmall}
                fontType={interRegular}
                color={PRIMARY_COLOR}
                numberOfLines={1}
                style={{
                  fontWeight: '600',
                  lineHeight: 16,
                  marginRight: 5,
                }}>
                {expand ? `Close` : `See more`}
              </MText>
              <ARROW
                style={{transform: [{rotate: expand ? '180deg' : '0deg'}]}}
              />
            </Animated.View>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

export default HomeTopCategories;

const styles = StyleSheet.create({
  main: {
    paddingBottom: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowOpacity: 0.1,
  },
  container: {
    paddingHorizontal: 10,
    marginTop: 10,
    zIndex: 1,
    paddingBottom: 6,
    backgroundColor: WHITE,
  },
  radio: {
    marginTop: 10,
    marginLeft: 15,
  },
  radioItem: {
    marginRight: 15,
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: WHITE,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 30,
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 15,
  },
});
