import React from 'react';
import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {Checkbox} from 'react-native-ui-lib';
import MText, {medium, poppinsRegular, openSansRegular} from './MText';
import CLOSE_DIALOG from '../image/svg/cross.svg';
import {BLACK, GRAY_200, RED, PRIMARY_COLOR, WHITE} from '../utils/Color';
import {windowHeight} from '../utils/Measure';

export default function CommonDialog(props) {
  const {
    dialogVisible,
    setDialogVisible,
    onSelectedItem,
    title,
    data,
    height = '70%',
    setRender,
    multiple,
  } = props;

  let getAll = data => {
    let count = 0;
    data?.map(item => {
      if (item?.select === true) {
        count++;
      }
    });

    if (count === data?.length) {
      return true;
    } else {
      return false;
    }
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (multiple) {
          if (item?.select !== true) {
            item.select = true;
          } else {
            item.select = false;
          }
        } else {
          data?.map((item, data) => {
            item.select = false;
          });
          item.select = true;
          onSelectedItem(item);
        }
        setRender(state => !state);
      }}
      style={{
        borderRadius: 10,
        padding: 15,
        paddingStart: 10,
        backgroundColor: WHITE,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Checkbox
        value={item?.select === true ? true : false}
        color={PRIMARY_COLOR}
        onValueChange={() => {}}
      />
      <MText
        size={medium}
        fontType={openSansRegular}
        numberOfLines={1}
        color={BLACK}
        style={{
          textAlign: 'left',
          flex: 1,
          marginLeft: 10,
          textTransform: 'capitalize',
        }}>
        {item.name ?? item.shop_name}
      </MText>
    </TouchableOpacity>
  );

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: GRAY_200,
        height: 0.5,
      }}
    />
  );

  const Header = () => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (getAll(data)) {
              data?.map(item => {
                item.select = false;
              });
            } else {
              data?.map(item => {
                item.select = true;
              });
            }

            setRender(state => !state);
          }}
          style={{
            borderRadius: 10,
            padding: 15,
            paddingStart: 10,
            backgroundColor: WHITE,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Checkbox value={getAll(data)} color={RED} onValueChange={() => {}} />
          <MText
            size={medium}
            fontType={openSansRegular}
            numberOfLines={1}
            color={BLACK}
            style={{textAlign: 'left', marginLeft: 10}}>
            All
          </MText>
        </TouchableOpacity>
        {renderSeparator()}
      </>
    );
  };

  return (
    <Modal
      visible={dialogVisible}
      transparent={true}
      animationType={'fade'}
      onRequestClose={() => {
        dialogVisible;
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'rgba(52, 52, 52, 0.6)',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: height,
            borderRadius: 14,
            elevation: 4,
            flexDirection: 'column',
            paddingBottom: 6,
            maxHeight: windowHeight / 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: PRIMARY_COLOR,
              padding: 10,
              borderTopLeftRadius: 14,
              borderTopEndRadius: 14,
              alignItems: 'center',
            }}>
            <MText
              size={medium}
              fontType={poppinsRegular}
              color={WHITE}
              style={{flex: 1, marginLeft: 10}}>
              {title}
            </MText>
            <TouchableOpacity
              style={{margin: 10}}
              activeOpacity={1}
              onPress={() => setDialogVisible(false)}>
              <CLOSE_DIALOG />
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            ListHeaderComponent={() => (multiple ? <Header /> : null)}
            renderItem={renderItem}
            // ListFooterComponent={() => {
            //   return (
            //     <>
            //       <View
            //         style={{
            //           backgroundColor: GRAY_200,
            //           height: 0.5,
            //         }}
            //       />
            //       <View
            //         style={{flexDirection: 'row', justifyContent: 'center'}}>
            //         <TouchableOpacity
            //           onPress={() => setDialogVisible(false)}
            //           style={[
            //             styles.contain,
            //             {
            //               marginTop: 12,
            //               margin: 10,
            //               width: 100,
            //             },
            //           ]}>
            //           <MText
            //             size={medium}
            //             fontType={poppinsRegular}
            //             color={RED}
            //             style={{
            //               flex: 1,
            //               paddingHorizontal: 30,
            //               paddingVertical: 7,
            //               textAlign: 'center',
            //             }}>
            //             OK
            //           </MText>
            //         </TouchableOpacity>
            //       </View>
            //     </>
            //   );
            // }}
            ListEmptyComponent={() => {
              return (
                <MText
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    padding: 10,
                    color: PRIMARY_COLOR,
                  }}>
                  {'' + 'No Data Found'}
                </MText>
              );
            }}
            keyExtractor={(item, index) => index + 'muinahamed123456789'}
            ItemSeparatorComponent={renderSeparator}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contain: {
    backgroundColor: WHITE,
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0,.5)',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: {
          width: 0,
          height: 1,
        },
      },
      android: {
        elevation: 15,
      },
    }),
  },
});
