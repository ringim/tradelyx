import {View, Text, Platform, TextInput} from 'react-native';
import React, {useState} from 'react';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useForm} from 'react-hook-form';
import {useMutation} from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  FileSection,
  FormInput,
  Header,
  QuotationProgress1,
  TextButton,
  UploadDocs,
} from '../../../../../components';
import {COLORS, FONTS, SIZES} from '../../../../../constants';
import {updateProduct} from '../../../../../queries/ProductQueries';
import {
  UpdateProductInput,
  UpdateProductMutation,
  UpdateProductMutationVariables,
} from '../../../../../API';
import {selectFile2, uploadFile2} from '../../../../../utilities/service';

interface IAddProduct {
  supply: string;
  moq: string;
  packageType: string;
  file2: any;
}

const ProductSpecification = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const {control, handleSubmit}: any = useForm();

  const [loading, setLoading] = useState(false);
  const [productSpec, setProductSpec] = useState('');
  const [singleFile, setSingleFile] = useState<any>([]);

  // UPDATE REQUEST QUOTATION
  const [doUpdateProduct] = useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(updateProduct);

  const onSubmit = async ({moq, supply, file2, packageType}: IAddProduct) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateProductInput = {
        id: route?.params.productID,
        minOrderQty: moq,
        supplyCapacity: supply,
        productSpec,
        productDocs: file2,
        packageType,
      };

      // upload file or multiple files
      if (singleFile) {
        const fileKeys = await Promise.all(
          singleFile.map((singleFile2: any) => uploadFile2(singleFile2?.uri)),
        );
        input.productDocs = fileKeys;
      }

      await doUpdateProduct({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      navigation.navigate('ProductShipment', {productID: input.id});
      setSingleFile([]);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
          marginBottom: 100,
        }}>
        {/* Product Specification */}
        <View
          style={{
            marginTop: SIZES.radius,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            Product Specification
          </Text>
          <TextInput
            autoFocus={false}
            onChangeText={setProductSpec}
            value={productSpec}
            multiline={true}
            placeholder="Add a specification"
            placeholderTextColor={COLORS.gray}
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
              marginTop: SIZES.base,
              paddingTop: SIZES.base,
              height: 140,
              fontWeight: '500',
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.base,
              borderWidth: 0.5,
              borderColor: COLORS.Neutral7,
            }}
          />
        </View>

        {/* Supply capacity */}
        <FormInput
          label="Supply Capacity"
          name="supply"
          control={control}
          placeholder="Add supply capacity e.g. 10 Tonnes"
          rules={{
            required: 'Supply capacity is required',
          }}
          containerStyle={{marginTop: SIZES.semi_margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

        {/* MOQ */}
        <FormInput
          label="Minimum Order Quantity (MOQ)"
          name="moq"
          control={control}
          rules={{
            required: 'MOQ is required',
          }}
          placeholder="E.g. 3 Tonnes"
          containerStyle={{marginTop: SIZES.semi_margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

        {/* Packaging Type */}
        <FormInput
          label="Packaging Type"
          name="packageType"
          control={control}
          rules={{
            required: 'Packaging is required',
          }}
          placeholder="e.g Bags, Crate e.t.c."
          containerStyle={{marginTop: SIZES.semi_margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

        {/* upload docs */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: SIZES.base,
          }}>
          {singleFile?.length >= 1 ? (
            <FileSection
              title="Product Specification"
              file={singleFile}
              setSingleFile={setSingleFile}
            />
          ) : (
            <UploadDocs
              title="Attach Relevant Documents"
              selectFile={() => selectFile2(setSingleFile, singleFile)}
              containerStyle={{marginHorizontal: 1}}
            />
          )}
        </View>
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'Product Specification'} />

        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <QuotationProgress1
          bgColor1={COLORS.primary1}
          bgColor2={COLORS.primary1}
          bgColor4={COLORS.white}
          color1={COLORS.primary1}
          color2={COLORS.primary1}
          item1={COLORS.white}
          item2={COLORS.white}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={150}
          bounces={false}
          extraScrollHeight={150}
          enableOnAndroid={true}>
          <View style={{margin: SIZES.semi_margin}}>
            <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
              Add Product Specification
            </Text>
          </View>

          {requestForm()}
        </KeyboardAwareScrollView>

        <View
          style={{
            justifyContent: 'flex-end',
            top: Platform.OS === 'android' ? 10 : 0,
          }}>
          <TextButton
            buttonContainerStyle={{marginBottom: SIZES.padding, marginTop: 0}}
            label="Continue"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Root>
  );
};

export default ProductSpecification;
