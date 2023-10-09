import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NewProductDetailsInfo from './NewProductDetailsInfo';
import AddAndRemove from './AddAndRemove';
import {WHITE} from '../../utils/Color';
import AddToCard from './AddToCard';
import ProductDetailsHeader from './ProductDetailsHeader';
const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);
let barStatus = false;

const ProductDetails = ({route}) => {
  let {productDetails} = route?.params;
  const [tempCart, setTempCart] = useState({
    item: {...productDetails},
    total: productDetails?.price,
  });
  const [barStyle, setBarStyle] = useState('light-content');
  const scrollY = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    barStatus = false;
  }, []);

  const toggle = () => {
    setBarStyle(style =>
      style === 'light-content' ? 'dark-content' : 'light-content',
    );
  };

  return (
    <View style={styles.container}>
      <AnimatedStatusBar
        animated={true}
        barStyle={barStyle}
        translucent={true}
      />

      <ProductDetailsHeader />

      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
            listener: event => {
              let temp = event.nativeEvent.contentOffset.y;

              if (temp > 100 && !barStatus) {
                barStatus = true;
                toggle();
              } else if (temp < 100 && barStatus) {
                barStatus = false;
                toggle();
              }
            },
          },
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 120}}>
        <NewProductDetailsInfo productDetails={productDetails} />
        <AddAndRemove
          tempCart={tempCart}
          setTempCart={setTempCart}
          productDetails={productDetails}
        />
      </Animated.ScrollView>

      <SafeAreaView />
      <AddToCard tempCart={tempCart} />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
