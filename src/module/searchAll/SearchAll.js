/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LoaderIndicator from '../../common/LoaderIndicator';
import MText from '../../common/MText';
import {RED, TEXT_GRAY, WHITE} from '../../utils/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {windowWidth} from '../../utils/Measure';
import Empty from '../../common/Empty';
import LineBreak from '../../common/LineBreak';
import SearchHeader from '../../common/SearchHeader';
import ItemAndStoreHeader from '../../common/ItemAndStoreHeader';
import SearchItem from '../../common/SearchItem';
import ShopListViewSmall from '../../common/ShopListViewSmall';
import {
  getSearchResultItem,
  getSearchResultStores,
} from '../../service/callApiFromSearch';

const SearchAll = props => {
  const [searchText, setSearchText] = useState('');
  const [recentData, setRecentData] = useState([]);
  const [selectItemOrStores, setSelectItemOrStores] = useState('Items');
  const [selectedItemsList, setSelectedItemsList] = useState({
    products: [],
    error: false,
    status: 'start',
  });

  const [selectedStoresList, setSelectedStoresList] = useState({
    shops: [],
    error: false,
    status: 'start',
  });

  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = React.useRef();
  const searchTime = useRef();
  const lon = 23.773135773267434;
  const lat = 90.41264378408951;

  const recentItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSearchText(item);
          getSearchResultItem(
            'all',
            item,
            1,
            setSelectedItemsList,
            selectedItemsList,
            lat,
            lon,
          );
          getSearchResultStores(
            'all',
            item,
            1,
            setSelectedStoresList,
            selectedStoresList,
            lat,
            lon,
          );
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <Image
            source={require('../../image/picture/clock.png')}
            resizeMode={'contain'}
            style={{
              width: 18,
              height: 18,
              marginLeft: (16 / 375) * windowWidth,
              tintColor: TEXT_GRAY,
            }}
          />
          <MText style={{marginLeft: 4}}>{item}</MText>
        </View>
      </TouchableOpacity>
    );
  };
  const Footer = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          storeData(null);
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginTop: 10,
            marginLeft: (16 / 375) * windowWidth,
          }}>
          <MText style={{marginLeft: 4, color: RED}}>Clear All</MText>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => (
    <>
      {!item?.shopName ? (
        <SearchItem item={item} />
      ) : (
        <ShopListViewSmall item={item} />
      )}
    </>
  );

  const storeData = async value => {
    let updateValue;
    const find = recentData?.find(item => item == value);

    if (find) {
      let filter = recentData?.filter(item => item != value);

      updateValue = [...filter, value];
    } else {
      updateValue = [...recentData, value];
    }
    if (value == null) {
      updateValue = [];
    }
    setRecentData(updateValue);

    try {
      const jsonValue = JSON.stringify(updateValue);

      await AsyncStorage.setItem('RECENT', jsonValue);
    } catch (e) {}
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('RECENT');

      const tempData = JSON.parse(jsonValue);

      if (Array.isArray(tempData)) setRecentData(tempData);
    } catch (e) {}
  };

  const reverseArray = recentData => {
    const temp = [...recentData];
    return temp.reverse();
  };

  let searchQuery = async searchText => {
    console.log(searchText);
    clearTimeout(searchTime.current);
    searchTime.current = setTimeout(() => {
      getSearchResultItem(
        'all',
        searchText,
        1,
        setSelectedItemsList,
        selectedItemsList,
        lat,
        lon,
      );
      getSearchResultStores(
        'all',
        searchText,
        1,
        setSelectedStoresList,
        selectedStoresList,
        lat,
        lon,
      );
    }, 200);
  };

  useEffect(() => {
    getData();
  }, []);

  let stableStatus =
    (selectedItemsList?.status === 'end' ||
      selectedItemsList?.status === 'paginate') &&
    (selectedStoresList?.status === 'end' ||
      selectedStoresList?.status === 'paginate');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <Animated.View>
          <SearchHeader
            searchText={searchText}
            setSearchText={setSearchText}
            setSelectedItemsList={setSelectedItemsList}
            setSelectedStoresList={setSelectedStoresList}
            searchQuery={searchQuery}
            storeData={storeData}
          />
        </Animated.View>

        <View
          style={{
            marginTop: 10,
            flex: 1,
          }}>
          {stableStatus && (
            <>
              <ItemAndStoreHeader
                listRef={listRef}
                selectItemOrStores={selectItemOrStores}
                setSelectItemOrStores={setSelectItemOrStores}
                scrollX={scrollX}
                stableStatus={stableStatus}
                itemLength={selectedItemsList?.paginate?.total}
                storeLength={selectedStoresList?.paginate?.total}
              />
              <Animated.FlatList
                data={[1, 2]}
                ref={listRef}
                horizontal
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {x: scrollX}}}],
                  {useNativeDriver: true},
                )}
                onMomentumScrollEnd={e => {
                  Math.round(e.nativeEvent.contentOffset.x / windowWidth) === 0
                    ? setSelectItemOrStores('Items')
                    : setSelectItemOrStores('Stores');
                }}
                getItemLayout={(_, index) => ({
                  length: windowWidth, //  WIDTH + (MARGIN_HORIZONTAL * 2)
                  offset: windowWidth * index, //  ( WIDTH + (MARGIN_HORIZONTAL*2) ) * (index)
                  index,
                })}
                initialScrollIndex={selectItemOrStores === 'Items' ? 0 : 1}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => 'muinahamed123457657766' + index}
                renderItem={({item, index}) => {
                  if (index === 0) {
                    return (
                      <FlatList
                        data={selectedItemsList?.products}
                        listKey={'nafisa123456'}
                        renderItem={renderItem}
                        contentContainerStyle={{
                          paddingHorizontal: 15,
                          width: windowWidth,
                          paddingTop: 26,
                          paddingBottom: 10,
                        }}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <LineBreak margin={15} />}
                        ListEmptyComponent={() => (
                          <Empty msg={'No Item is available!'} />
                        )}
                        ListFooterComponent={() => {
                          return (
                            selectedItemsList?.status === 'paginate' && (
                              <ActivityIndicator
                                style={{paddingBottom: 10}}
                                color={RED}
                              />
                            )
                          );
                        }}
                        onEndReached={() => {
                          if (
                            selectedItemsList?.paginate?.metadata
                              ?.hasNextPage === true
                          ) {
                            getSearchResultItem(
                              'all',
                              searchText,
                              selectedItemsList?.paginate?.metadata?.page
                                ?.currentPage + 1,
                              setSelectedItemsList,
                              selectedItemsList,
                              lat,
                              lon,
                            );
                          }
                          // console.log(selectedItemsList);
                        }}
                        onEndReachedThreshold={0.1}
                        keyExtractor={(item, index) => index + 'items'}
                      />
                    );
                  } else {
                    return (
                      <FlatList
                        data={selectedStoresList?.shops}
                        listKey={'nafisa123gfdg456'}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                          paddingTop: 26,
                          paddingHorizontal: 15,
                          width: windowWidth,
                          paddingBottom: 10,
                        }}
                        ListEmptyComponent={() => (
                          <Empty msg={'No Shop is available!'} />
                        )}
                        ListFooterComponent={() => {
                          return (
                            selectedStoresList?.status === 'paginate' && (
                              <ActivityIndicator
                                style={{paddingBottom: 10}}
                                color={RED}
                              />
                            )
                          );
                        }}
                        onEndReached={() => {
                          if (
                            selectedStoresList?.paginate?.metadata
                              ?.hasNextPage === true
                          ) {
                            getSearchResultStores(
                              'all',
                              searchText,
                              selectedStoresList?.paginate?.metadata?.page
                                ?.currentPage + 1,
                              setSelectedStoresList,
                              selectedStoresList,
                              lat,
                              lon,
                            );
                          }
                        }}
                        onEndReachedThreshold={0.1}
                        keyExtractor={(item, index) => index}
                      />
                    );
                  }
                }}
              />
            </>
          )}
        </View>

        {(selectedItemsList?.status === 'apiCalling' ||
          selectedStoresList?.status === 'apiCalling') && (
          <LoaderIndicator loading={true} backColor={WHITE} top={50} />
        )}

        {selectedItemsList?.status === 'start' && (
          <View style={{flex: 1, marginTop: 15}}>
            <FlatList
              contentContainerStyle={{paddingBottom: 10}}
              ItemSeparatorComponent={() => <LineBreak margin={12} />}
              data={reverseArray(recentData)}
              ListFooterComponent={() => {
                return recentData?.length > 0 && <Footer />;
              }}
              renderItem={recentItem}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
