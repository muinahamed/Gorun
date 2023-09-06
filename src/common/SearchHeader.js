import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ARROW from '../image/svg/arrow.svg';
import {LITE_BLACK, RED} from '../utils/Color';
import {useNavigation} from '@react-navigation/native';
import CROSS from '../image/svg/cross.svg';
import SEARCH from '../image/svg/search.svg';
import Animated from 'react-native-reanimated';

const SearchHeader = props => {
  const navigation = useNavigation();

  const {
    searchText,
    setSearchText,
    setSelectedItemsList,
    setSelectedStoresList,
    searchQuery,
    storeData,
    inputRef,
  } = props;

  return (
    <Animated.View style={[styles.flex, {marginTop: 10}]}>
      <TouchableOpacity
        style={{padding: 10, marginHorizontal: 10}}
        onPress={() => navigation.goBack()}>
        <ARROW stroke={LITE_BLACK} />
      </TouchableOpacity>

      <View
        style={[styles.flex, styles.search, {flexGrow: 1, marginRight: 12}]}>
        <SEARCH />
        <TextInput
          ref={inputRef}
          placeholder="Search"
          placeholderTextColor={'#ccc'}
          returnKeyType="search"
          style={{flexGrow: 1, marginStart: 12, color: LITE_BLACK}}
          value={searchText}
          onSubmitEditing={e => {
            if (searchText === '') {
              return;
            }
            storeData(searchText);

            searchQuery(searchText);
          }}
          onChangeText={text => {
            if (text === '') {
              setSelectedItemsList({
                products: [],
                error: false,
                status: 'start',
              }),
                setSelectedStoresList({
                  shops: [],
                  error: false,
                  status: 'start',
                });
            } else {
              searchQuery(text);
            }

            setSearchText(text);
          }}
        />
        {searchText?.length > 0 && (
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => {
              setSelectedItemsList({
                products: [],
                error: false,
                status: 'start',
              });
              setSelectedStoresList({
                shops: [],
                error: false,
                status: 'start',
              });
              setSearchText();
            }}>
            <CROSS fill={RED} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    borderWidth: 0.5,
    height: 40,
    paddingHorizontal: 10,
    borderColor: 'rgba(214, 214, 214, 1)',
    borderRadius: 7,
  },
});
