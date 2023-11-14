import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import Header from '../../common/Header';
import {MaterialTextInput} from '../../common/MaterialTextInput';
import ImagePicker from '../../common/ImagePicker';
import MText, {interRegular, small} from '../../common/MText';
import {GRAY_300, PRIMARY_COLOR, WHITE} from '../../utils/Color';
import {PRODUCT_PHOTO} from '../../image/PicturePath';
import FormValidation from '../../common/FormValidation';
import {showErrorMessage, showSuccessMessage} from '../../utils/BaseUtils';
import {MButton} from '../../common/MButton';
import {windowHeight, windowWidth} from '../../utils/Measure';
import PastOrderCommonModal from '../../common/PastOrderCommonModal';
import ModalTopBar from '../../common/ModalTopBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ShopAllCategory from './ShopAllCategory';
import {uploadImage} from '../../store/slices/appSlice';
import {useDispatch} from 'react-redux';
import API from '../../service/API';
import {ADD_PRODUCT_TO_SHOP} from '../../service/ApiEndPoint';

const AddShopProduct = ({setModalVisible, allCategories}) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [productName, setProductName] = useState('');
  const [productNameErrMsg, setProductNameErrMsg] = useState();
  const [price, setPrice] = useState('');
  const [priceErrMsg, setPriceErrMsg] = useState();
  const [unit, setUnit] = useState('');
  const [unitErrMsg, setUnitErrMsg] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quantityErrMsg, setQuantityErrMsg] = useState('');
  const [des, setDes] = useState('');
  const [desErrMsg, setDesErrMsg] = useState('');
  const [category, setCategory] = useState('');
  const [categoryErrMsg, setCategoryErrMsg] = useState('');
  const [title, setTitle] = useState('');
  const [titleErrMsg, setTitleErrMeg] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [shopModal, setShopModal] = useState(false);
  const [loading, setLoading] = useState();
  const [createLoading, setCreateLoading] = useState(false);

  const validate = (name, value) => {
    // =====================================
    var result = FormValidation.validate(name, value);

    switch (name) {
      case 'productName':
        setProductNameErrMsg(result);
        break;
      case 'price':
        setPriceErrMsg(result);
        break;
      case 'unit':
        setUnitErrMsg(result);
        break;
      case 'quantity':
        setQuantityErrMsg(result);
        break;
      case 'des':
        setDesErrMsg(result);
        break;
      case 'category':
        setCategoryErrMsg(result);
        break;
      case 'title':
        setTitleErrMeg(result);
        break;
      default:
        break;
    }

    return result;
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

  const validatePersonalInfoAndMoveNext = async () => {
    let productNameResult = validate('productName', productName);
    let priceResult = validate('price', price);
    let unitResult = validate('unit', unit);
    let quantityResult = validate('quantity', quantity);
    let desResult = validate('des', des);
    let categoryResult = validate('category', category?.name);
    let titleResult = validate('title', title);

    if (!imageUrl) {
      showErrorMessage('Enter Phofile Image');
      return;
    }

    if (
      productNameResult === '' &&
      priceResult == '' &&
      unitResult === '' &&
      quantityResult == '' &&
      desResult == '' &&
      categoryResult == '' &&
      titleResult === ''
    ) {
      let data = {
        name: productName,
        price: price,
        images: imageUrl,
        unit: unit,
        quantity: quantity,
        description: des,
        categoryId: category?._id,
        seoTitle: title,
        seoDescription: '',
      };

      setCreateLoading(true);

      let res = await API.post(ADD_PRODUCT_TO_SHOP, data);

      setCreateLoading(false);

      setModalVisible(false);

      if (res?.status) {
        showSuccessMessage(res?.message);
      } else {
        showErrorMessage(res?.message);
      }
    } else {
      console.log('muin');
      return;
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: WHITE}}>
      <SafeAreaView style={styles.top(shopModal?.status)} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={0}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <Header
          back={true}
          title={'Add product'}
          cross={true}
          crossPress={() => setModalVisible(false)}
        />
        <ScrollView>
          <TouchableOpacity
            onPress={() => setShowImagePicker(!showImagePicker)}
            style={{
              justifyContent: 'center',
              flex: 1,
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: imageUrl ? GRAY_300 : PRIMARY_COLOR,
                borderRadius: 15,
              }}>
              <Image
                resizeMode="cover"
                source={imageUrl ? {uri: imageUrl} : PRODUCT_PHOTO}
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
              fontType={interRegular}
              color={PRIMARY_COLOR}
              style={{marginTop: 8, textAlign: 'center'}}>
              Change Photo
            </MText>
          </TouchableOpacity>

          <MaterialTextInput
            value={productName}
            title="Name"
            placeHolderText="Enter Name"
            onChange={text => {
              validate('productName', text);
              setProductName(text);
            }}
            errorMessage={productNameErrMsg}
          />
          <MaterialTextInput
            value={price}
            title="Price"
            placeHolderText="Enter Price"
            onChange={text => {
              validate('price', text);
              setPrice(text);
            }}
            errorMessage={priceErrMsg}
          />
          <MaterialTextInput
            value={unit}
            title="Unit"
            placeHolderText="Enter Unit"
            onChange={text => {
              validate('unit', text);
              setUnit(text);
            }}
            errorMessage={unitErrMsg}
          />
          <MaterialTextInput
            value={quantity}
            title="Quantity"
            placeHolderText="Enter Quantity"
            onChange={text => {
              validate('quantity', text);
              setQuantity(text);
            }}
            errorMessage={quantityErrMsg}
          />
          <MaterialTextInput
            value={des}
            title="Description"
            placeHolderText="Enter Description"
            onChange={text => {
              validate('des', text);
              setDes(text);
            }}
            errorMessage={desErrMsg}
          />

          <TouchableOpacity
            onPress={() => setShopModal({status: true, anim: false})}>
            <MaterialTextInput
              value={category?.name}
              title="Category"
              placeHolderText="Enter Category"
              pointerEvents={'none'}
              errorMessage={categoryErrMsg}
            />
            <View style={[StyleSheet.absoluteFill]} />
          </TouchableOpacity>

          <MaterialTextInput
            value={title}
            title="Title"
            placeHolderText="Enter title"
            onChange={text => {
              validate('title', text);
              setTitle(text);
            }}
            errorMessage={titleErrMsg}
          />
          <MButton
            title="Add Product"
            color={PRIMARY_COLOR}
            textColor={WHITE}
            marginTop={40}
            marginBottom={30}
            borderRadius={10}
            loading={createLoading}
            onPress={validatePersonalInfoAndMoveNext}
            width={windowWidth - 40}
          />
        </ScrollView>
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
              <ShopAllCategory
                allCategories={allCategories}
                setCategory={data => {
                  validate('category', data?.name);
                  setCategory(data);
                }}
                category={category}
                setShopModal={setShopModal}
              />
            }
            onRefresh={() => {}}
            setVisible={setShopModal}
            visible={shopModal}
            totalHeight={windowHeight - insets?.top - insets?.bottom}
          />
        )}
      </KeyboardAvoidingView>

      {showImagePicker && (
        <ImagePicker
          dialogVisible={showImagePicker}
          setDialogVisible={setShowImagePicker}
          selectedImagePath={(imageData, type) => chooseImage(imageData, type)}
        />
      )}
      <SafeAreaView style={{flex: 0}} />
    </View>
  );
};

export default AddShopProduct;

const styles = StyleSheet.create({
  top: status => ({
    flex: 0,
    backgroundColor: status ? 'rgba(0,0,0,.3)' : WHITE,
  }),
});
