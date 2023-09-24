import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
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
import RBSheet from 'react-native-raw-bottom-sheet';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from '../../common/ImagePicker';
import {GENDER_ARRAY} from '../../utils/Data';
import Header from '../../common/Header';
import {MaterialTextInput} from '../../common/MaterialTextInput';
import {showErrorMessage} from '../../utils/BaseUtils';
import FormValidation from '../../common/FormValidation';
import {setToken, setUser, uploadImage} from '../../store/slices/appSlice';
import {windowWidth} from '../../utils/Measure';
import {MButton} from '../../common/MButton';
import {USER_PHOTO} from '../../image/PicturePath';
import DOBpicker from '../../common/DOBpicker';
import CommonDialog from '../../common/CommonDialog';
import API from '../../service/API';
import {REGISTER_WITH_DATA} from '../../service/ApiEndPoint';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserRegistration = ({route}) => {
  const {phone_number} = route?.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showDate, setShowDate] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(phone_number);
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('male');
  const [genderDialog, setGenderDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [fullNameErrMsg, setFullNameErrMsg] = useState();
  const [emailErrMsg, setEmailErrMsg] = useState();
  const [passwordErrMsg, setPasswordErrMsg] = useState();
  const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState();
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [temp, setTemp] = useState(new Date());
  const DateTime = useRef();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [render, setRender] = useState(false);

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
      case 'email':
        setEmailErrMsg(result);
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
    let emailResult = validate('email', email);
    let passwordResult = validate('password', password);
    let rePasswordResult = validate('rePassword', passwordConfirm);

    if (!imageUrl) {
      showErrorMessage('Enter Phofile Image');
      return;
    }

    if (
      firstNameResult === '' &&
      emailResult === '' &&
      passwordResult === '' &&
      rePasswordResult === ''
    ) {
      let registrationDetail = {
        name: fullName,
        image: imageUrl,
        gender,
        dob: `${year}-${month}-${day}`,
        phoneNumber,
        email,
      };

      setSignUpLoading(true);
      let res = await API.post(REGISTER_WITH_DATA, registrationDetail);
      setSignUpLoading(false);

      if (res?.status) {
        dispatch(setUser(res?.data?.user));
        dispatch(setToken(res?.data?.user?.token));
        navigation.navigate('home');
        AsyncStorage.setItem('token', response?.data?.user?.token);
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

  return (
    <SafeAreaView style={{backgroundColor: WHITE, flex: 1}}>
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
                title="Full name"
                placeHolderText="Enter Name"
                onChange={text => {
                  validate('firstName', text);
                  setFullName(text);
                }}
                errorMessage={fullNameErrMsg}
                errorMmessage={fullNameErrMsg}
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setGenderDialog(true)}
                style={{width: '100%'}}>
                <MaterialTextInput
                  value={gender}
                  title="Gender"
                  placeHolderText="Select Gender"
                  editable={false}
                />
                <View style={StyleSheet.absoluteFill} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (Platform?.OS === 'android') {
                setShowDate(true);
              } else {
                DateTime?.current?.open();
              }
            }}
            style={{width: '100%'}}>
            <MaterialTextInput
              value={year !== '' ? `${year}-${month}-${day}` : ''}
              placeHolderText="Select Date of Birth"
              title="Date of Birth"
              editable={false}
            />
            <View style={StyleSheet.absoluteFill}></View>
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
            errorMmessage={emailErrMsg}
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
        data={GENDER_ARRAY}
        dialogVisible={genderDialog}
        setRender={setRender}
        multiple={false}
        setDialogVisible={() => setGenderDialog(false)}
        onSelectedItem={item => {
          setGender(item.name);
          setGenderDialog(false);
        }}
        title="Select Gender"
      />

      <RBSheet
        ref={DateTime}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={(420 / 375) * windowWidth}
        openDuration={250}
        customStyles={{
          container: {
            width: windowWidth,
            borderTopStartRadius: 15,
            borderTopEndRadius: 15,
            backgroundColor: 'white',
          },
        }}>
        <DOBpicker
          DateTime={DateTime}
          setYear={setYear}
          setMonth={setMonth}
          setDay={setDay}
          temp={temp}
          setTemp={setTemp}
        />
      </RBSheet>

      {showDate === true && (
        <RNDateTimePicker
          value={temp}
          display={'default'}
          maximumDate={new Date()}
          themeVariant="light"
          textColor="black"
          onChange={(event, timestamp) => {
            setShowDate(false);
            setTemp(timestamp);
            let day = timestamp.toLocaleString('default', {day: '2-digit'});
            let month = timestamp.toLocaleString('default', {month: 'short'});
            let year = timestamp.toLocaleString('default', {year: 'numeric'});
            setDay(day);
            setMonth(month);
            setYear(year);
          }}
          mode="date"
        />
      )}

      {showImagePicker && (
        <ImagePicker
          dialogVisible={showImagePicker}
          setDialogVisible={setShowImagePicker}
          selectedImagePath={(imageData, type) => chooseImage(imageData, type)}
        />
      )}
    </SafeAreaView>
  );
};

export default UserRegistration;
const styles = StyleSheet.create({
  checkbox: {},
});
