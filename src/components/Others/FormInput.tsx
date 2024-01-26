import React from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import {Controller} from 'react-hook-form';

import {SIZES, COLORS, FONTS} from '../../constants';

function FormInput({
  containerStyle,
  label,
  name,
  rules,
  placeholder = '',
  control,
  numberOfLines,
  inputStyle,
  prependComponent,
  multiline,
  appendComponent,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitalize = 'none',
  errorMsg = '',
  editable,
  autoFocus,
  didTouch,
  inputContainerStyle,
  selectTextOnFocus,
  maxLength,
  labelStyle,
  onChangeValue,
  onEndEditing,
  errorStyle,
  onPress,
}: any) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <View>
          <View style={{...containerStyle}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  ...FONTS.body3,
                  fontWeight: '500',
                  color: COLORS.Neutral1,
                  ...labelStyle,
                }}>
                {label}
              </Text>
              <Text style={{color: COLORS.Rose4, ...FONTS.body3}}>
                {errorMsg}
              </Text>
            </View>

            <View
              style={{
                marginTop: 6,
                flexDirection: 'row',
                height: 50,
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.base,
                borderWidth: 0.5,
                borderColor: COLORS.Neutral7,
                backgroundColor: COLORS.white,
                ...inputContainerStyle,
              }}>
              {prependComponent}
              <TextInput
                style={{flex: 1, ...inputStyle}}
                value={value}
                multiline={multiline}
                numberOfLines={numberOfLines}
                placeholder={placeholder}
                onBlur={onBlur}
                editable={editable}
                autoFocus={autoFocus}
                selectTextOnFocus={selectTextOnFocus}
                onTouchStart={didTouch}
                placeholderTextColor={COLORS.Neutral7}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoComplete={autoCompleteType}
                autoCapitalize={autoCapitalize}
                maxLength={maxLength}
                onChangeText={onChange}
                onChange={onChangeValue}
                onPressIn={onPress}
                onEndEditing={onEndEditing}
              />
              {appendComponent}
            </View>
          </View>
          {error && (
            <View
              style={{
                justifyContent: 'center',
                ...errorStyle,
                marginBottom: 5,
              }}>
              <Text
                style={{...FONTS.cap1, color: COLORS.Rose4, top: 5, left: 5}}>
                {error.message || 'Error'}
              </Text>
            </View>
          )}
        </View>
      )}
    />
  );
}

export default FormInput;
