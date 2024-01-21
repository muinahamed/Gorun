import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import API from '../../service/API';
import {GET_SHOP} from '../../service/ApiEndPoint';
import ShopListViewLarge from '../../common/ShopListViewLarge';
import {WHITE} from '../../utils/Color';

const ViewAll = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {type, shopTypeId} = route?.params;
  const [refreshing, setRefreshing] = useState(false);
  const [shop, setShop] = useState({status: 'apiCalling', shops: []});

  let getShop = async (number = 1) => {
    if (number > 1) setShop(state => ({...state, status: 'paginate'}));

    let url =
      GET_SHOP +
      `latitude=23.780702292166644&longitude=90.40941180206971&page=${number}&pageSize=10`;

    if (type == `Featured Shop`) url += `&isFeatured=true`;
    else url += `&shopTypeId=${shopTypeId}`;

    let res = await API.get(url);

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
    navigation.setOptions({title: type});
    getShop();
  }, []);

  const renderItem = ({item, index}) => <ShopListViewLarge item={item} />;

  return (
    <View style={styles.conatiner}>
      <FlatList
        data={shop?.shops}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getShop} />
        }
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
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
            getShop(shop?.paginate?.metadata?.page?.nextPage);
          }
        }}
      />
    </View>
  );
};

export default ViewAll;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: WHITE,
  },
  loading: {
    paddingBottom: 20,
  },
});
