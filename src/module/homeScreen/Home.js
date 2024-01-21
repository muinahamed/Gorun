import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HomeHeader from './HomeHeader';
import HomeTopCategories from './HomeTopCategories';
import HomeScreenBanner from './HomeScreenBanner';
import ShopHorizontalList from '../ShopHorizontal';
import API from '../../service/API';
import {
  CATEGORY_WISE_SHOP,
  GET_ALL_SHOP_LIST,
  GET_ALL_SHOP_TYPE,
  GET_CATEGORY_WISE_PRODUCT,
  GET_FEATURED_SHOP,
  GET_SHOP,
} from '../../service/ApiEndPoint';
import HomeSearch from './HomeSearch';
import {PRIMARY_COLOR, WHITE} from '../../utils/Color';
import {getOneTimeLocation, requestLocationPermission} from './HomeHelper';
import LocationEnableSheet from './LocationEnableSheet';
import {useDispatch, useSelector} from 'react-redux';
import PastOrderCommonModal from '../../common/PastOrderCommonModal';
import LocationSlide from './LocationSlide';
import ModalHeader from '../../common/ModalHeader';
import {windowHeight} from '../../utils/Measure';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LineBreak from '../../common/LineBreak';

const Home = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {activeLocation} = useSelector(state => state.app);
  const [featuredShop, setFeaturedShop] = useState();
  const [category, setCategory] = useState();
  const [selectLocation, setSelectLocation] = useState(false);
  const [categoryWiseShop, setCategoryWiseShop] = useState();
  const refRBSheet = useRef();

  const onRefresh = async newLonLat => {
    requestLocationPermission()
      .then(e => {
        getOneTimeLocation(newLonLat, dispatch)
          .then(e => {
            refRBSheet.current.close();
          })
          .catch(e => refRBSheet.current.open());
      })
      .catch(e => refRBSheet.current.open());
  };

  let getCategory = async () => {
    let res = await API.get(GET_ALL_SHOP_TYPE);
    setCategory(res?.data?.shopTypes);
  };

  let getFeaturedShop = async () => {
    let res = await API.get(
      GET_SHOP +
        `isFeatured=true&latitude=23.780702292166644&longitude=90.40941180206971&page=1&pageSize=5`,
    );

    setFeaturedShop(res?.data);
  };

  const getCategoryWWiseShop = async () => {
    let response = await API.get(
      GET_CATEGORY_WISE_PRODUCT +
        `latitude=23.780702292166644&longitude=90.40941180206971`,
    );

    if (response?.status) {
      setCategoryWiseShop(response?.data?.typeWiseShops);
    }
  };

  useEffect(() => {
    onRefresh();
    getCategory();
    getFeaturedShop();
    getCategoryWWiseShop();
  }, []);

  // console.log(categoryWiseShop);

  return (
    <View style={{flex: 1, backgroundColor: WHITE}}>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={{flex: 0, backgroundColor: PRIMARY_COLOR}} />
      <View style={{flex: 1}}>
        <HomeHeader
          locationPress={() => setSelectLocation({status: true, anim: false})}
        />
        <FlatList
          data={[1]}
          keyExtractor={(item, index) => index}
          renderItem={() => {
            return (
              <>
                <HomeSearch placeHolder={'Search'} />
                <HomeTopCategories category={category} />
                <HomeScreenBanner />
                <LineBreak height={4} />
                <ShopHorizontalList
                  type={'Featured Shop'}
                  title={'Featured Shop'}
                  data={featuredShop?.shops}
                />

                {categoryWiseShop &&
                  categoryWiseShop?.map((item, index) => {
                    return (
                      <ShopHorizontalList
                        key={index}
                        type={item?.shopType?.name}
                        shopTypeId={item?.shopType?._id}
                        title={item?.shopType?.name}
                        data={item?.shops}
                      />
                    );
                  })}
              </>
            );
          }}
        />
        <LocationEnableSheet
          onRefresh={onRefresh}
          refRBSheet={refRBSheet}
          closeSheet={() => refRBSheet.current.close()}
        />
        {selectLocation?.status && (
          <PastOrderCommonModal
            backgroundColor={'rgba(0,0,0,.3)'}
            pointerEvents={'auto'}
            Body={<LocationSlide />}
            header={<ModalHeader title={'Address Details'} cross={false} />}
            visible={selectLocation}
            setVisible={setSelectLocation}
            totalHeight={windowHeight - insets?.top - insets?.bottom}
          />
        )}
      </View>
      <SafeAreaView style={{backgroundColor: WHITE, flex: 0}} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
