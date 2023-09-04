import {StatusBar, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BACKGROUND_COLOR, DARK_BACKGROUND_COLOR} from '../../utils/Colors';
import {NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;
const height = StatusBarManager.HEIGHT;
import {SafeAreaView} from 'react-native';
import {windowWidth} from '../../utils/Const';
import {useEffect} from 'react';
import {useState} from 'react';
import NewRestaurantProductList from './NewRestaurantProductList';
import {Animated} from 'react-native';
import HeaderAnimated from './HeaderAnimated';
import {RefreshControl} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../../services/authProvider';
import ViewCard from '../../components/ViewCard';
import RestaurantBanner from '../../common/StoreDetails/RestaurantBanner';
import RestaurantButttonSection from '../../common/StoreDetails/RestaurantButtonSection';
import RestaurantDetailsCart from '../../common/StoreDetails/RestaurantDetailsCart';
import GroupCartModal from '../GroupCart/GroupCartModal';
import ShopDetailsModal from '../../common/shopDetailsModal/ShopDetailsModal';
import {CloseBusy} from '../../components/RatingFunction';
import RestaurantDetailsLoader from './RestaurantDetailsLoader';
import {WHITE} from '../../utils/Color';
import RestaurantDetailsHeader from '../../common/RestaurantDetailsHeader';
import RestaurantOfferBanner from '..//../common/RestaurantBanner';

const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);
let array = {};
let barStatus = false;

const NewRestaurantDetails = props => {
  const dispatch = useDispatch();
  const {user} = useContext(AuthContext);
  const {shopId} = useSelector(state => state.cart);
  const {darkMode, lonLat} = useSelector(state => state.app);
  const [details, setDetails] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);
  const [filterData, setFilterData] = React.useState(null);
  const [filterWidth, setFilterWidth] = React.useState(null);
  const [width, setWidth] = React.useState(null);
  const [animObj, setAnimObj] = React.useState({});
  const [horizontal, setHorizontal] = React.useState(300);
  const [refreshing, setRefreshing] = React.useState(false);
  const [titleHeight, setTitleHeight] = useState(1);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const startAnim = React.useRef(new Animated.Value(0)).current;
  const [barStyle, setBarStyle] = useState('light-content');
  const [detailsModal, setDetailsModal] = useState(false);
  const [groupOrderModalVisible, setGroupOrderModalVisible] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const horizotalRef = useRef();
  const verticalRef = useRef();
  const item = props.route.params.item;
  let close = CloseBusy(details);
  let obj = Object.keys(animObj);
  let active = -1;

  useEffect(() => {
    if (width !== null && titleHeight !== null) {
      let temp = {};
      let add = 0;

      (filterData === null ? categoryItems : filterData).map((i, index) => {
        temp[`${index}`] = add;
        add =
          i?.data.length * 125 + (titleHeight + 20) + i?.data.length - 1 + add;

        if (index > 0) {
          add = add + 6;
        }
      });
      setAnimObj(temp);
    }
  }, [width, titleHeight, filterData]);

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

      <RestaurantDetailsHeader
        details={details}
        scrollY={scrollY}
        categoryItems={categoryItems}
      />

      <View style={{flex: 1}}>
        {details ? (
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

                  if (temp > -200 && !barStatus) {
                    barStatus = true;
                    toggle();
                  } else if (temp < -200 && barStatus) {
                    barStatus = false;
                    toggle();
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
            keyExtractor={() => 'muinResstaurantDetailsmainFlatlist'}
            renderItem={() => {
              return (
                <>
                  <View
                    onLayout={e => setHorizontal(e.nativeEvent.layout.height)}>
                    <RestaurantBanner
                      scrollY={scrollY}
                      banner={details?.shopBanner}
                    />
                  </View>

                  <View style={{height: 44}} />

                  <NewRestaurantProductList
                    filterData={filterData}
                    categoryItems={categoryItems}
                    setTitleHeight={setTitleHeight}
                    details={details}
                  />
                  <RestaurantDetailsCart
                    details={details}
                    setDetailsModal={setDetailsModal}
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
                    filterData={filterData}
                    filterWidth={filterWidth}
                    horizotalRef={horizotalRef}
                    verticalRef={verticalRef}
                  />
                </>
              );
            }}
          />
        ) : (
          <RestaurantDetailsLoader />
        )}
      </View>

      {groupOrderModalVisible && (
        <GroupCartModal
          details={details}
          modalVisible={groupOrderModalVisible}
          setModalVisible={setGroupOrderModalVisible}
        />
      )}

      {details && (
        <ShopDetailsModal
          modalVisible={detailsModal}
          setModalVisible={setDetailsModal}
          details={details}
        />
      )}

      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: darkMode ? DARK_BACKGROUND_COLOR : BACKGROUND_COLOR,
        }}
      />

      {dropDown && (
        <View
          style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,.3)'}]}
        />
      )}

      {shopId === item && details !== null && (
        <ViewCard shop_id={item} shop={details} />
      )}
    </View>
  );
};

export default NewRestaurantDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
