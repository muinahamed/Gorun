/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import {BLACK, GRAY_300, GRAY_500, RED, LITE_BLACK} from '../utils/Color';
import MText, {interRegular, large, semiMedium, small} from './MText';
import EYE from '../image/svg/eye.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

/**
 *
 * @param {*} props
 * This is a common input field.
 * If you pass the  @param props.leftIcon , Left icon will be display.
 * If you pass the  @param props.rightIcon , Right icon will be display.
 */
export const MaterialTextInput = props => {
  const {
    keyboardType,
    placeHolderText,
    value,
    onChange,
    editable,
    contentType,
    returnKeyType,
    multiline = false,
    textContentType = 'none',
    numberOfLines = 1,
    onPress,
    onFocus,
    ref,
    onBlur,
    rightIcon,
    textLeftIcon,
    autoCapitalize = 'none',
    fontFamily = 'Inter-Regular',
    pointerEvents = 'auto',
    onSubmitEditing,
    passwordRules,
    maxLength,
    title,
    lineType,
    errorMessage,
    marginTop = 10,
  } = props;

  const [secureTextEntry, setSecureTextEntry] = useState(
    props?.secureTextEntry,
  );

  let TextInputLeftIcon;
  if (textLeftIcon) {
    TextInputLeftIcon = (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginEnd: 5,
        }}>
        <View style={{paddingEnd: 2.5}}>
          <Image
            width={30}
            height={30}
            source={textLeftIcon}
            style={{marginLeft: 5}}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container(marginTop)}>
      <MText
        size={semiMedium}
        fontType={interRegular}
        color={LITE_BLACK}
        style={{fontWeight: '500'}}>
        {title}
      </MText>

      <View
        style={{
          flexDirection: 'row',
          borderRadius: 10,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: GRAY_300,
          flex: 1,
          marginTop: 10,
          height: 40,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {TextInputLeftIcon}
          <TextInput
            autoCorrect={false}
            size={large}
            lineType={lineType}
            placeholder={placeHolderText}
            placeholderTextColor={GRAY_500}
            selectionColor={GRAY_500}
            contentType={contentType}
            value={value}
            ref={ref}
            color={BLACK}
            onBlur={onBlur}
            passwordRules={passwordRules}
            textContentType={textContentType}
            onChangeText={onChange}
            onSubmitEditing={onSubmitEditing}
            numberOfLines={numberOfLines}
            keyboardType={
              keyboardType === 'number'
                ? 'number-pad'
                : keyboardType && keyboardType != ''
                ? keyboardType
                : 'default'
            }
            secureTextEntry={secureTextEntry}
            editable={editable}
            returnKeyType={returnKeyType}
            style={{flex: 1, padding: 0}}
            onPress={onPress}
            onFocus={onFocus}
            multiline={multiline}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            fontFamily={fontFamily}
            pointerEvents={pointerEvents}
          />
          {rightIcon && (
            <TouchableOpacity
              onPress={() => {
                setSecureTextEntry(!secureTextEntry);
              }}
              style={{
                height: 40,
                justifyContent: 'center',
              }}>
              <EYE style={styles.rightIconStyle} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {errorMessage && (
        <MText
          size={small}
          fontType={interRegular}
          color={RED}
          style={{
            flex: 1,
            marginTop: 3,
            fontWeight: '400',
          }}>
          {errorMessage}
        </MText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: marginTop => ({
    marginHorizontal: 15,
    marginTop,
  }),
  editableText: {
    paddingVertical: 7,
    flex: 1,
    fontFamily: 'Inter-Regular',
  },
  unEditableText: {
    flex: 1,
    color: 'black',
  },
  rightIconStyle: {},
});
