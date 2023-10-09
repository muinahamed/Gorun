import {
  Animated,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import MText, {interRegular, semiMedium} from '../../common/MText';
import FOOD from '../../image/svg/home/food.svg';
import GROCERY from '../../image/svg/home/grocery.svg';
import PHARMACY from '../../image/svg/home/pharmacy.svg';

import {useNavigation} from '@react-navigation/native';
import {LITE_BLACK, RED, WHITE} from '../../utils/Color';
import {windowWidth} from '../../utils/Measure';
import RADIO_ON from '../../image/svg/radioOn.svg';
import RADIO_OFF from '../../image/svg/radioOff.svg';
import {useState} from 'react';
const categoryType = [
  {Image: RADIO_ON, name: 'All', active: true, slug: 'both'},
  {Image: RADIO_OFF, name: 'Online', active: false, slug: 'online'},
  {Image: RADIO_OFF, name: 'Offline', active: false, slug: 'offline'},
];

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const HomeTopCategories = ({category}) => {
  const navigation = useNavigation();
  const width = (windowWidth - 30) / 4 - 40;
  const height = (42 / 46) * width;
  const [selectCategory, setSelectCategory] = useState(categoryType);

  const goToCategory = (item, index) => {
    navigation.navigate('categoryDetails', {
      item,
    });
  };

  return (
    <View>
      <ScrollView horizontal contentContainerStyle={styles.radio}>
        {selectCategory?.map((Item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.radioItem}
              onPress={() => {
                LayoutAnimation.configureNext({
                  duration: 500,
                  create: {type: 'linear', property: 'opacity'},
                  update: {type: 'spring', springDamping: 0.6},
                  delete: {type: 'linear', property: 'opacity'},
                });
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

      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'flex-end',
            height: height + 46,
            marginHorizontal: 10,
            marginTop: 10,
          },
        ]}>
        {category?.map((Item, index) => {
          let active = selectCategory?.find(item => item.active);
          if (Item?.activeStatus !== active?.slug) return null;
          return (
            <TouchableOpacity
              onPress={() => goToCategory(Item, index)}
              style={{
                backgroundColor: WHITE,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginHorizontal: 5,
                shadowColor: 'gray',
                shadowRadius: 10,
                shadowOpacity: 0.1,
                paddingHorizontal: 10,
              }}
              key={index}>
              <FOOD
                fill={'#363636'}
                width={width}
                height={height}
                style={{marginTop: 10}}
              />

              <MText
                size={semiMedium}
                fontType={interRegular}
                color={'#363636'}
                numberOfLines={1}
                style={{
                  fontWeight: '500',
                  marginTop: 10,
                  marginBottom: 10,
                  lineHeight: 16,
                  color: LITE_BLACK,
                }}>
                {Item.name}
              </MText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default HomeTopCategories;

const styles = StyleSheet.create({
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
});
