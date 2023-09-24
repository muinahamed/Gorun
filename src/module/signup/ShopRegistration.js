import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {PRIMARY_COLOR, TEXT_GRAY, WHITE} from '../../utils/Color';
import MText, {openSansSemiBold, small} from '../../common/MText';
import {useDispatch} from 'react-redux';
import ImagePicker from '../../common/ImagePicker';
import {ACTIVE_STATUS} from '../../utils/Data';
import Header from '../../common/Header';
import {MaterialTextInput} from '../../common/MaterialTextInput';
import {showErrorMessage, showSuccessMessage} from '../../utils/BaseUtils';
import FormValidation from '../../common/FormValidation';
import {setToken, setUser, uploadImage} from '../../store/slices/appSlice';
import {windowHeight, windowWidth} from '../../utils/Measure';
import {MButton} from '../../common/MButton';
import {USER_PHOTO} from '../../image/PicturePath';
import CommonDialog from '../../common/CommonDialog';
import API from '../../service/API';
import {
  GET_SHOP_CATEGORY,
  REGISTER_WITH_DATA,
  REGISTER_WITH_DATA_SHOP,
} from '../../service/ApiEndPoint';
import ModalTopBar from '../../common/ModalTopBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PastOrderCommonModal from '../../common/PastOrderCommonModal';
import ShopTypeList from './ShopTypeList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopRegistration = ({route}) => {
  const {phone_number} = route?.params;
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(phone_number);
  const [fullName, setFullName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [shopType, setShopType] = useState('');
  const [nid, setNid] = useState('');
  const [passport, setPassport] = useState('');
  const [trade, setTrade] = useState('');
  const [activeStatus, setActiveStatus] = useState('both');
  const [genderDialog, setGenderDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [fullNameErrMsg, setFullNameErrMsg] = useState();
  const [ownerNameErrMsg, setOwnerNameErrMsg] = useState();
  const [shopTypeErrMsg, setShopTypeErrMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState();
  const [nidErrMsg, setNidErrMsg] = useState();
  const [passportErrMsg, setPassportErrMsg] = useState();
  const [tradeErrMsg, setTradeErrMsg] = useState();
  const [passwordErrMsg, setPasswordErrMsg] = useState();
  const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState();
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [isLoading, setLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [render, setRender] = useState(false);
  const [shopModal, setShopModal] = useState(false);
  const [shopCategory, setShopCategory] = useState();

  const validate = (name, value) => {
    // =====================================
    var result = FormValidation.validate(
      name,
      name === 'rePassword' ? {password: password, rePassword: value} : value,
    );

    switch (name) {
      case 'firstName':
        setFullNameErrMsg(result);
        break;
      case 'ownerName':
        setOwnerNameErrMsg(result);
        break;
      case 'shopTypeID':
        setShopTypeErrMsg(result);
        break;
      case 'email':
        setEmailErrMsg(result);
        break;
      case 'nid':
        setNidErrMsg(result);
        break;
      case 'passport':
        setPassportErrMsg(result);
        break;
      case 'trade':
        setTradeErrMsg(result);
        break;
      case 'password':
        setPasswordErrMsg(result);
        break;
      case 'rePassword':
        setConfirmPasswordErrMsg(result);
        break;
      default:
        break;
    }

    return result;
  };

  const validatePersonalInfoAndMoveNext = async () => {
    let firstNameResult = validate('firstName', fullName);
    let ownerNameResult = validate('ownerName', ownerName);
    let shopTypeResult = validate('shopTypeID', shopType?.name);
    let emailResult = validate('email', email);
    let nidResult = validate('nid', nid);
    let passportResult = validate('passport', passport);
    let tradeResult = validate('trade', trade);
    let passwordResult = validate('password', password);
    let rePasswordResult = validate('rePassword', passwordConfirm);

    if (!imageUrl) {
      showErrorMessage('Enter Phofile Image');
      return;
    }

    if (
      firstNameResult === '' &&
      ownerNameResult == '' &&
      emailResult === '' &&
      nidResult == '' &&
      passportResult == '' &&
      tradeResult == '' &&
      passwordResult === '' &&
      rePasswordResult === ''
    ) {
      let registrationDetail = {
        name: fullName,
        shopOwnerName: ownerName,
        image: imageUrl,
        phoneNumber: phoneNumber.slice(3),
        email: email,
        nid: nid,
        passport: passport,
        tradeLicense: trade,
        shopAddress: {
          address: 'Niketon',
          latitude: 23.780702292166644,
          longitude: 90.40941180206971,
          country: 'Bangladesh',
          state: '',
          city: 'Dhaka',
          pin: '2020',
          note: '',
          placeId: '',
        },
        shopTypeId: shopType?._id,
        activeStatus: activeStatus,
        banners: [],
      };

      setSignUpLoading(true);
      let res = await API.post(REGISTER_WITH_DATA_SHOP, registrationDetail);
      setSignUpLoading(false);

      if (res?.status) {
        showSuccessMessage(res?.message);
        // dispatch(setUser(res?.data?.shop));
        // dispatch(setToken(res?.data?.shop?.token));
        // navigation.navigate('home');
        // AsyncStorage.setItem('token', response?.data?.shop?.token);
      } else {
        showErrorMessage(res?.message);
      }
    } else {
      return;
    }
  };

  let chooseImage = async (imageData, mimeType) => {
    let data = new FormData();

    data.append('image', {
      uri: imageData[0].uri,
      type: imageData[0].type,
      name: imageData[0].fileName,
    });

    setLoading(true);

    try {
      await dispatch(uploadImage(data))
        .unwrap()
        .then(imageResp => {
          setLoading(false);
          setImageUrl(imageResp?.data?.url);
        });
    } catch (e) {
      setLoading(false);
      showErrorMessage('There is an error');
      console.log('log-e', e.message);
    }
  };

  let getShopCategory = async () => {
    let res = await API.get(GET_SHOP_CATEGORY);
    setShopCategory(res?.data);
  };

  useEffect(() => {
    getShopCategory();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.top(shopModal?.status)} />
      <View style={{flex: 1}}>
        <Header back={false} title={'REGISTRATION'} />
        <KeyboardAvoidingView
          style={{flex: 1}}
          keyboardVerticalOffset={0}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  marginTop: 10,
                  marginStart: 20,
                }}>
                <TouchableOpacity
                  onPress={() => setShowImagePicker(!showImagePicker)}
                  style={{
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: imageUrl ? TEXT_GRAY : PRIMARY_COLOR,
                      borderRadius: 15,
                    }}>
                    <Image
                      resizeMode="cover"
                      source={imageUrl ? {uri: imageUrl} : USER_PHOTO}
                      style={{
                        margin: 2,
                        height: 90,
                        width: 90,
                        borderRadius: 15,
                      }}
                    />
                  </View>
                  <MText
                    size={small}
                    fontType={openSansSemiBold}
                    color={PRIMARY_COLOR}
                    style={{marginTop: 8, textAlign: 'center'}}>
                    Change Photo
                  </MText>
                </TouchableOpacity>
              </View>

              <View style={{flex: 1, justifyContent: 'center'}}>
                <MaterialTextInput
                  value={fullName}
                  title="Merchant name"
                  placeHolderText="Enter Name"
                  onChange={text => {
                    validate('firstName', text);
                    setFullName(text);
                  }}
                  errorMessage={fullNameErrMsg}
                />
                <MaterialTextInput
                  value={ownerName}
                  title="Owner Name"
                  placeHolderText="Enter Name"
                  onChange={text => {
                    validate('ownerName', text);
                    setOwnerName(text);
                  }}
                  errorMessage={ownerNameErrMsg}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setGenderDialog(true)}
                  style={{width: '100%'}}>
                  <MaterialTextInput
                    value={activeStatus}
                    title="ActiveStatus"
                    placeHolderText="Select Status"
                    editable={false}
                  />
                  <View style={StyleSheet.absoluteFill} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setShopModal({status: true, anim: false})}>
              <MaterialTextInput
                value={shopType?.name}
                title="ShopType ID"
                placeHolderText="Enter shopType"
                pointerEvents={'none'}
                errorMessage={shopTypeErrMsg}
              />
            </TouchableOpacity>

            <MaterialTextInput
              value={email}
              title="Email ID"
              placeHolderText="Enter Email-ID"
              onChange={text => {
                validate('email', text);
                setEmail(text);
              }}
              errorMessage={emailErrMsg}
            />

            <MaterialTextInput
              value={nid}
              title="NID"
              placeHolderText="Enter NID"
              onChange={text => {
                validate('nid', text);
                setNid(text);
              }}
              errorMessage={nidErrMsg}
            />

            <MaterialTextInput
              value={passport}
              title="Passport ID"
              placeHolderText="Enter Email-ID"
              onChange={text => {
                validate('passport', text);
                setPassport(text);
              }}
              errorMessage={passportErrMsg}
            />

            <MaterialTextInput
              value={trade}
              title="TradeLicense ID"
              placeHolderText="Enter Email-ID"
              onChange={text => {
                validate('trade', text);
                setTrade(text);
              }}
              errorMessage={tradeErrMsg}
            />

            <MaterialTextInput
              value={password}
              title="Choose a Password"
              placeHolderText="Enter Password"
              onChange={text => {
                validate('password', text);
                setPassword(text);
              }}
              secureTextEntry={true}
              errorMessage={passwordErrMsg}
              errorMmessage={passwordErrMsg}
            />
            <MaterialTextInput
              value={passwordConfirm}
              onChange={text => {
                validate('rePassword', text);
                setPasswordConfirm(text);
              }}
              secureTextEntry={true}
              title="Confirm Password"
              placeHolderText="Re-Enter Password"
              errorMessage={confirmPasswordErrMsg}
              errorMmessage={confirmPasswordErrMsg}
            />

            <MButton
              title="SIGN UP"
              color={PRIMARY_COLOR}
              textColor={WHITE}
              marginTop={40}
              marginBottom={30}
              borderRadius={10}
              loading={signUpLoading}
              onPress={validatePersonalInfoAndMoveNext}
              width={windowWidth - 40}
            />
          </ScrollView>
        </KeyboardAvoidingView>

        <CommonDialog
          data={ACTIVE_STATUS}
          dialogVisible={genderDialog}
          setRender={setRender}
          multiple={false}
          setDialogVisible={() => setGenderDialog(false)}
          onSelectedItem={item => {
            setActiveStatus(item.name);
            setGenderDialog(false);
          }}
          title="Select Gender"
        />

        {showImagePicker && (
          <ImagePicker
            dialogVisible={showImagePicker}
            setDialogVisible={setShowImagePicker}
            selectedImagePath={(imageData, type) =>
              chooseImage(imageData, type)
            }
          />
        )}

        {shopModal?.status && (
          <PastOrderCommonModal
            backgroundColor={'rgba(0,0,0,.3)'}
            pointerEvents={'auto'}
            header={
              <View style={styles.header}>
                <ModalTopBar />
              </View>
            }
            Body={
              <ShopTypeList
                shopCategory={shopCategory}
                setShopType={data => {
                  validate('shopTypeID', data?.name);
                  setShopType(data);
                }}
                shopType={shopType}
                setShopModal={setShopModal}
              />
            }
            onRefresh={() => {}}
            setVisible={setShopModal}
            visible={shopModal}
            totalHeight={windowHeight - insets?.top - insets?.bottom}
          />
        )}
      </View>

      <SafeAreaView style={{flex: 0}} />
    </View>
  );
};

export default ShopRegistration;

const styles = StyleSheet.create({
  container: {backgroundColor: WHITE, flex: 1},
  top: status => ({
    flex: 0,
    backgroundColor: status ? 'rgba(0,0,0,.3)' : WHITE,
  }),
});
