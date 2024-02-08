import {Modal, StatusBar, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {NativeModules} from 'react-native';
import {SafeAreaView} from 'react-native';
import {useEffect} from 'react';
import {useState} from 'react';
import {Animated} from 'react-native';
import HeaderAnimated from './HeaderAnimated';
import {RefreshControl} from 'react-native';
import {WHITE} from '../../utils/Color';
import RestaurantDetailsHeader from '../../common/RestaurantDetailsHeader';
import RestaurantBanner from '../../common/RestaurantBanner';
import RestaurantDetailsCart from '../../common/RestaurantDetailsCart';
import NewRestaurantProductList from '../NewRestaurantProductList';
import {windowWidth} from '../../utils/Measure';
import ViewCard from '../../common/ViewCard';
import {
  getAllCategories,
  shopDetailManipulate,
  shopWiseProductForUser,
} from './ShopDetailsHelper';
import {useSelector} from 'react-redux';
import AddShopProduct from './AddShopProduct';
import {useNavigation} from '@react-navigation/native';
const {StatusBarManager} = NativeModules;
const height = StatusBarManager.HEIGHT;
const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);
let array = {};
let barStatus = false;

const ShopDetails = props => {
  const navigation = useNavigation();
  const shopDetails = props?.route?.params?.shopDetails;
  const shopId = shopDetails?._id;
  const {user} = useSelector(state => state.app);
  const {cart, subTotal} = useSelector(state => state.orders);
  const [details, setDetails] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);
  const [width, setWidth] = React.useState(null);
  const [animObj, setAnimObj] = React.useState({});
  const [horizontal, setHorizontal] = React.useState(300);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [titleHeight, setTitleHeight] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const startAnim = React.useRef(new Animated.Value(0)).current;
  const [barStyle, setBarStyle] = useState('light-content');
  const horizotalRef = useRef();
  const verticalRef = useRef();
  let obj = Object.keys(animObj);
  let active = -1;

  useEffect(() => {
    navigation.setOptions({title: 'Shop Details'});
    if (user?.shopType) {
      setDetails({...user});
      getAllCategories(setAllCategories);
      shopDetailManipulate(setCategoryItems, setLoading);
    } else {
      setDetails({...shopDetails});
      shopWiseProductForUser(shopId, setCategoryItems, setLoading);
    }
  }, [modalVisible == true]);

  useEffect(() => {
    if (width !== null && titleHeight !== null) {
      let temp = {};
      let add = 0;

      categoryItems.map((i, index) => {
        temp[`${index}`] = add;
        add =
          i?.data.length * 125 + (titleHeight + 20) + i?.data.length - 1 + add;

        if (index > 0) {
          add = add + 6;
        }
      });
      setAnimObj(temp);
    }
  }, [width, titleHeight]);

  const getOffset = mainIndex => {
    let count = 0;
    let position = (windowWidth - width[mainIndex]) / 2;
    if (width !== null) {
      let obj = Object.keys(width);
      obj.map((item, index) => {
        if (mainIndex > index)
          count += width[index] + 24 + (index === 0 ? 12 : 0);
      });
      if (position < count) {
        return count - position;
      }
    }
    return 0;
  };

  const toggle = status => {
    setBarStyle(status);
  };

  return (
    <View style={styles.container}>
      <AnimatedStatusBar
        animated={true}
        barStyle={barStyle}
        translucent={true}
      />

      <RestaurantDetailsHeader
        details={details}
        scrollY={scrollY}
        categoryItems={categoryItems}
      />

      <View style={{flex: 1}}>
        <Animated.FlatList
          ref={verticalRef}
          contentContainerStyle={{paddingBottom: 140}}
          data={[1]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
          }
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: true,
              listener: event => {
                let temp =
                  event.nativeEvent.contentOffset.y -
                  horizontal +
                  (height + 35 + 12);

                if (temp > 0) {
                  toggle(`dark-content`);
                } else {
                  toggle(`light-content`);
                }

                for (let i = obj.length - 1; i >= 0; i--) {
                  if (temp > animObj[i]) {
                    if (active != i) {
                      active = i;
                      horizotalRef.current?.scrollToOffset({
                        offset: getOffset(i),
                      });
                      Animated.timing(startAnim, {
                        toValue: active,
                        useNativeDriver: true,
                        duration: 300,
                      }).start();
                    }
                    break;
                  }
                }
              },
            },
          )}
          keyExtractor={() => 'index'}
          renderItem={() => {
            return (
              <>
                <View
                  onLayout={e => setHorizontal(e.nativeEvent.layout.height)}>
                  <RestaurantBanner scrollY={scrollY} />
                  <View style={{height: 20}} />
                </View>

                <RestaurantDetailsCart
                  details={details}
                  setModalVisible={setModalVisible}
                />

                <View style={{height: 44}} />

                <NewRestaurantProductList
                  categoryItems={categoryItems}
                  setTitleHeight={setTitleHeight}
                  details={details}
                  loading={loading}
                />

                <HeaderAnimated
                  array={array}
                  categoryItems={categoryItems}
                  width={width}
                  setWidth={setWidth}
                  animObj={animObj}
                  startAnim={startAnim}
                  horizontal={horizontal}
                  scrollY={scrollY}
                  horizotalRef={horizotalRef}
                  verticalRef={verticalRef}
                />
              </>
            );
          }}
        />
      </View>

      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: WHITE,
        }}
      />

      {!user?.shopType && <ViewCard />}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <AddShopProduct
          setModalVisible={setModalVisible}
          allCategories={allCategories}
        />
      </Modal>
    </View>
  );
};

export default ShopDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
