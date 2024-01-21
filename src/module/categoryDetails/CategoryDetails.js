import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GET_ALL_SHOP_LIST} from '../../service/ApiEndPoint';
import API from '../../service/API';
import HomeHeader from '../homeScreen/HomeHeader';
import ScreenWrapper from '../../common/ScreenWrapper';
import Header from '../../common/Header';
import ShopHorizontalListChild from '../../common/ShopHorizontalListChild';
import HomeSearch from '../homeScreen/HomeSearch';
import ShopListViewLarge from '../../common/ShopListViewLarge';
import {WHITE} from '../../utils/Color';
import {useNavigation} from '@react-navigation/native';
import Empty from '../../common/Empty';

const CategoryDetails = ({route}) => {
  const navigation = useNavigation();
  const {item} = route?.params;
  const [refreshing, setRefreshing] = useState(false);
  const [shop, setShop] = useState({status: 'apiCalling', shops: []});
  const [shopList, setShopList] = useState();

  let getAllShopList = async (number = 1) => {
    if (number > 1) setShop(state => ({...state, status: 'paginate'}));

    let res = await API.get(
      GET_ALL_SHOP_LIST +
        `latitude=23.780702292166644&longitude=90.40941180206971&page=${number}&pageSize=15&shopTypeId=${item?._id}`,
    );
    if (res?.status) {
      if (number == 1) {
        setShop({...res?.data, status: 'end'});
      } else {
        setShop(state => ({
          ...res?.data,
          shops: [...state?.shops, ...res?.data?.shops],
          status: 'end',
        }));
      }
    }
  };

  useEffect(() => {
    getAllShopList();
    navigation.setOptions({title: item.name});
  }, []);

  const renderItem = ({item, index}) => <ShopListViewLarge item={item} />;

  return (
    <View style={styles.conatiner}>
      <HomeSearch placeHolder={'Search'} />
      <FlatList
        data={shop?.shops}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAllShopList} />
        }
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() =>
          shop?.status == 'end' && <Empty msg={`No shop found!`} />
        }
        ListFooterComponent={() => (
          <ActivityIndicator
            style={[
              styles.loading,
              {opacity: shop?.status == 'paginate' ? 1 : 0},
            ]}
          />
        )}
        onEndReached={() => {
          if (shop?.paginate?.metadata.hasNextPage) {
            getAllShopList(shop?.paginate?.metadata?.page?.nextPage);
          }
        }}
      />
    </View>
  );
};

export default CategoryDetails;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: WHITE,
  },
  loading: {
    paddingBottom: 20,
  },
});
