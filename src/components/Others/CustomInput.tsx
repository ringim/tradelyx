import {Control, Controller} from 'react-hook-form';
import {KeyboardTypeOptions, Text, TextInput, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../constants';
import {User} from '../../models';
import React from 'react';

export type IEditableUserField =
  | 'name'
  | 'title'
  | 'phone_number'
  | 'email'
  | 'logo'
  | 'city'
  | 'zipCode'
  | 'address'
  | 'country'
  | 'businessType'
  | 'backgroundImage'
  | 'identificationNumber'
  | 'languages'
  | 'mainMarkets'
  | 'certifications'
  | 'legalRep'
  | 'lga'
  | 'overview'
  | 'identification'
  | 'totalStaff';
export type IEditableUser = Pick<User, IEditableUserField>;

interface ICustomInput {
  label: string;
  multiline?: boolean;
  control: Control<IEditableUser, object>;
  name: IEditableUserField;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  rules?: object;
  appTheme: any;
  textInputStyle?: any;
  containerStyle?: any;
}

const CustomInput = ({
  label,
  editable,
  keyboardType,
  control,
  containerStyle,
  name,
  textInputStyle,
  multiline = false,
  rules = {},
}: ICustomInput) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {onChange, value, onBlur}, fieldState: {error}}) => {
      return (
        <View style={{paddingTop: SIZES.base}}>
          <View
            style={{
              paddingHorizontal: 10,
            }}>
            <Text style={{color: COLORS.black, ...FONTS.body3}}>{label}</Text>
          </View>

          <View
            style={{paddingHorizontal: 10, paddingTop: 8, ...containerStyle}}>
            <TextInput
              value={value || ''}
              onChangeText={onChange}
              onBlur={onBlur}
              style={{
                borderWidth: 0.3,
                paddingLeft: 10,
                height: 45,
                ...FONTS.body3,
                borderRadius: SIZES.radius,
                color: COLORS.black,
                backgroundColor: COLORS.white,
                borderColor: error ? COLORS.Rose5 : COLORS.Neutral7,
                ...textInputStyle,
              }}
              editable={editable}
              placeholderTextColor={COLORS.Neutral7}
              keyboardType={keyboardType}
              placeholder={label}
              multiline={multiline}
            />
          </View>
          {error && (
            <Text
              style={{
                ...FONTS.cap1,
                color: COLORS.Rose4,
                top: 14,
                left: 5,
                marginBottom: 2,
              }}>
              {error.message || 'Error'}
            </Text>
          )}
        </View>
      );
    }}
  />
);

export default CustomInput;
