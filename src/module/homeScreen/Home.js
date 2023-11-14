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
} from '../../service/ApiEndPoint';
import HomeSearch from './HomeSearch';
import {PRIMARY_COLOR, WHITE} from '../../utils/Color';
import {getOneTimeLocation, requestLocationPermission} from './HomeHelper';
import LocationEnableSheet from './LocationEnableSheet';
import {useDispatch} from 'react-redux';
import PastOrderCommonModal from '../../common/PastOrderCommonModal';
import LocationSlide from './LocationSlide';
import ModalHeader from '../../common/ModalHeader';
import {windowHeight} from '../../utils/Measure';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Home = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [shop, setShop] = useState();
  const [category, setCategory] = useState();
  const [selectLocation, setSelectLocation] = useState(false);
  const refRBSheet = useRef();

  let getAllShop = async () => {
    let res = await API.get(GET_ALL_SHOP_LIST);
    setShop(res?.data);
  };

  let getCategory = async () => {
    let res = await API.get(GET_ALL_SHOP_TYPE);
    setCategory(res?.data?.shopTypes);
  };

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

  const getCategoryWWiseShop = async () => {
    let response = await API.get(CATEGORY_WISE_SHOP);
    // console.log(response);
  };

  useEffect(() => {
    getCategoryWWiseShop();
    onRefresh();
    getAllShop();
    getCategory();
  }, []);

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
                <ShopHorizontalList
                  type={'grocery'}
                  title={'Nearby Food'}
                  data={shop?.shops}
                />
                <ShopHorizontalList
                  type={'grocery'}
                  title={'Nearby Grocery'}
                  data={shop?.shops}
                />
                <ShopHorizontalList
                  type={'grocery'}
                  title={'Nearby Pharmacy'}
                  data={shop?.shops}
                />
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
