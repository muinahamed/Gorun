import {SectionList, StyleSheet, View} from 'react-native';
import React from 'react';
import MText, {interRegular, large} from '../../common/MText';
import {} from '../../utils/Colors';

import LineBreak from '../../common/LineBreak';
import Empty from '../../common/Empty';
import {LITE_BLACK} from '../../utils/Color';
import ProductView from './ProductView';

const NewRestaurantProductList = ({
  filterData,
  categoryItems,
  setTitleHeight,
  details,
}) => {
  const Header = ({category}) => {
    return (
      <View>
        {category?.index !== 0 && <LineBreak margin={20} height={6} />}
        <View
          style={{marginHorizontal: 15, marginBottom: 20}}
          onLayout={e => {
            if (category.index === 0) {
              setTitleHeight(e.nativeEvent.layout.height);
            }
          }}>
          <MText
            size={large}
            numberOfLines={1}
            fontType={interRegular}
            color={LITE_BLACK}
            style={{
              fontWeight: '600',
            }}>
            {category?.name}
          </MText>
        </View>
      </View>
    );
  };

  return (
    <SectionList
      sections={filterData === null ? categoryItems : filterData}
      style={{marginTop: 20}}
      keyExtractor={(item, index) => index + 'child'}
      ListEmptyComponent={() => <Empty msg={'No Product available!'} />}
      ItemSeparatorComponent={() => (
        <View style={{marginHorizontal: 15}}>
          <LineBreak margin={20} />
        </View>
      )}
      renderItem={({item, index}) => {
        return (
          <ProductView
            item={item}
            shopId={details?._id}
            shopMaxDiscount={details?.maxDiscount}
          />
        );
      }}
      renderSectionHeader={({section: {category, data}}) => {
        if (data?.length > 0) {
          return <Header category={category} />;
        } else {
          return null;
        }
      }}
    />
  );
};

export default NewRestaurantProductList;

const styles = StyleSheet.create({});
