import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import MText, {interRegular, semiMedium} from '../../common/MText';
import FOOD from '../../image/svg/home/food.svg';
import GROCERY from '../../image/svg/home/grocery.svg';
import PHARMACY from '../../image/svg/home/pharmacy.svg';

import {useNavigation} from '@react-navigation/native';
import {LITE_BLACK, WHITE} from '../../utils/Color';
import {windowWidth} from '../../utils/Measure';

const HomeTopCategories = ({}) => {
  const navigation = useNavigation();
  const width = (windowWidth - 30) / 4 - 40;
  const height = (42 / 46) * width;

  const array = [
    {Image: FOOD, name: 'Food', color: '#FCEFEF'},
    {Image: GROCERY, name: 'Grocery', color: '#EFF8ED'},
    {Image: PHARMACY, name: 'Pharmacy', color: '#E8F9FA'},
  ];

  const goToCategory = (item, index) => {
    let screen = '',
      props = {categoryName: item.name};
    switch (index) {
      case 0:
        screen = 'food';
        break;
      case 1:
        screen = 'grocery';
        props.type = 1;
        break;
      case 2:
        screen = 'pharmacy';
        props.type = 2;
        break;
    }

    navigation.navigate(screen, props);
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: height + 46,
          marginHorizontal: 10,
          marginTop: 8,
        },
      ]}>
      {array?.map((Item, index) => {
        return (
          <TouchableOpacity
            onPress={() => goToCategory(Item, index)}
            style={{
              backgroundColor: Item?.color,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginHorizontal: 5,
              flex: 1,
            }}
            key={index}>
            <Animated.View>
              <Item.Image
                fill={'#363636'}
                width={width}
                height={height}
                style={{marginTop: 10}}
              />
            </Animated.View>
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
});
