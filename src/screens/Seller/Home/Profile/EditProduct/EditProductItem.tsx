import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useMutation, useQuery} from '@apollo/client';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import DropDownPicker from 'react-native-dropdown-picker';
import {Root, ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {FlatList} from 'react-native-gesture-handler';

import {COLORS, SIZES, FONTS, icons} from '../../../../../constants';
import {
  FormInput,
  Header,
  SingleImage,
  TextButton,
  Tags as RenderTags,
  RequestTags,
  ViewProductImageEdit,
  ViewMultipleImages,
  ShowFiles,
  LoadingIndicator,
} from '../../../../../components';
import {
  EditProductItemRouteProp,
  ProfileStackNavigatorParamList,
} from '../../../../../components/navigation/SellerNav/type/navigation';
import {getProduct, updateProduct} from '../../../../../queries/ProductQueries';
import {
  UpdateProductMutation,
  UpdateProductMutationVariables,
  GetProductQuery,
  GetProductQueryVariables,
  UpdateProductInput,
} from '../../../../../API';
import {allCategories} from '../../../../../../types/types';

interface ProductData {
  title: string;
  cert: string;
  desc: string;
  image: string;
  pCat: string;
  category: string;
  type: string;
}

const EditProductItem = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<EditProductItemRouteProp>();
  const {id}: any = route?.params?.product;

  const {control, handleSubmit, setValue} = useForm<ProductData>();

  // GET PRODUCT DETAIL
  const {loading, data} = useQuery<GetProductQuery, GetProductQueryVariables>(
    getProduct,
    {
      pollInterval: 500,
      variables: {id: id},
    },
  );
  const productDetails: any = data?.getProduct;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialTags, setInitialTags] = useState(productDetails?.tags);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [type2, setType2] = useState(productDetails?.commodityCategory);
  const [jobType2, setJobType2] = useState<any>(allCategories);

  // UPDATE USER DETAILS
  const [doUpdateProduct] = useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(updateProduct);

  const onSubmit = async ({title, desc, cert}: ProductData) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const input: UpdateProductInput = {
        id: productDetails?.id,
        title: title,
        productCert: cert,
        description: desc,
        tags: initialTags,
        commodityCategory: type2,
      };

      await doUpdateProduct({
        variables: {
          input,
        },
      });

      // console.log('product updated 1', input);
      navigation.navigate('EditProductSpec', {product: productDetails});
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        textBody: 'Please complete all fields',
        autoClose: 1500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    let isCurrent = true;
    if (productDetails && isCurrent) {
      setValue('title', productDetails?.title);
      setValue('cert', productDetails?.productCert);
      setValue('desc', productDetails?.description);
      setValue('image', productDetails?.image);
      setValue('category', productDetails?.category);
    }
    return () => {
      isCurrent = false;
    };
  }, [productDetails, setValue]);

  const onTagPress = (deleted: any) => {
    return deleted ? 'deleted' : 'not deleted';
  };

  const onChangeTags = (tags: any) => {
    setInitialTags(tags);
  };

  const renderTag = ({tag, index, onPress}: any) => {
    return <RenderTags key={index} tag={tag} onPress={onPress} />;
  };

  function renderFormSection() {
    return (
      <View>
        {/* ProductImage */}
        <ViewProductImageEdit
          product={productDetails}
          onPress={() =>
            navigation.navigate('EditProductImage', {
              productID: productDetails?.id,
            })
          }
        />

        {/* Product title */}
        <FormInput
          label="Product title"
          name="title"
          control={control}
          placeholder="Enter Product Title"
          rules={{
            required: 'product title is required',
          }}
          containerStyle={{marginTop: SIZES.margin}}
          inputContainerStyle={{marginTop: SIZES.base}}
        />

        {/* Product category */}
        <Controller
          control={control}
          name="category"
          rules={{
            required: 'Category type is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <View>
              <Text
                style={{
                  marginTop: SIZES.radius,
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                  fontWeight: '500',
                }}>
                Product Category
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                  icon: 'icon',
                }}
                onChangeValue={onChange}
                open={open2}
                showArrowIcon={true}
                placeholder="Select Product Category"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value2 || value}
                items={jobType2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setJobType2}
                style={{
                  borderRadius: SIZES.base,
                  height: 40,
                  marginTop: SIZES.base,
                  borderColor: COLORS.Neutral7,
                  borderWidth: 0.5,
                }}
                placeholderStyle={{color: COLORS.Neutral6, ...FONTS.body3}}
                textStyle={{color: COLORS.Neutral1}}
                closeIconStyle={{
                  width: 25,
                  height: 25,
                }}
                modalProps={{
                  animationType: 'fade',
                }}
                ArrowDownIconComponent={({style}) => (
                  <FastImage
                    source={icons.down}
                    style={{width: 15, height: 15}}
                  />
                )}
                modalContentContainerStyle={{
                  paddingHorizontal: SIZES.padding * 3,
                }}
                modalTitle="Select your category"
                modalTitleStyle={{
                  fontWeight: '600',
                }}
                onSelectItem={(value: any) => {
                  setType2(value?.type);
                }}
              />
              {error && (
                <Text
                  style={{
                    ...FONTS.cap1,
                    color: COLORS.Rose4,
                    top: 14,
                    left: 5,
                    marginBottom: 2,
                  }}>
                  This field is required.
                </Text>
              )}
            </View>
          )}
        />

        {/* Description */}
        <FormInput
          label="Product Description"
          name="desc"
          control={control}
          multiline={true}
          placeholder="Add a description"
          rules={{
            required: 'Product description is required',
          }}
          containerStyle={{marginTop: SIZES.padding}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{
            marginTop: SIZES.base,
            height: 140,
            padding: SIZES.base,
          }}
        />

        {/* Tags or Keywords */}
        <RequestTags
          initialTags={initialTags}
          onChangeTags={onChangeTags}
          onTagPress={onTagPress}
          renderTag={renderTag}
          title={'Tags or Keywords'}
        />

        {/* Certification */}
        <FormInput
          label="Product Certification"
          name="cert"
          control={control}
          rules={{
            required: 'Product certification is required',
          }}
          placeholder="e.g Organic, Non-GMO, SON, ISO"
          containerStyle={{marginTop: SIZES.margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

        {/* upload docs */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          {productDetails?.productCertDocs && (
            <ShowFiles
              title="Product Certifications"
              file={productDetails?.productCertDocs}
              showEdit={true}
              contentStyle={{marginTop: SIZES.semi_margin}}
              onPress={() =>
                navigation.navigate('EditProductDoc', {
                  productDoc: productDetails?.id,
                })
              }
            />
          )}
        </View>
      </View>
    );
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Edit Product'}
          nav={true}
          onPress={() => navigation.goBack()}
        />

        <Spinner
          visible={isSubmitting}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          extraHeight={150}
          extraScrollHeight={150}
          bounces={false}
          enableOnAndroid={true}>
          <View
            style={{
              marginHorizontal: SIZES.radius,
            }}>
            <Text style={{...FONTS.h4, color: COLORS.black}}>
              Update all fields
            </Text>

            {renderFormSection()}

            {/* product images */}
            <View
              style={{
                marginTop: SIZES.padding,
                marginHorizontal: 4,
                marginBottom: 50,
              }}>
              <Text
                style={{
                  ...FONTS.body3,
                  fontWeight: '500',
                  color: COLORS.Neutral1,
                }}>
                Product Images
              </Text>
              {productDetails?.image ? (
                <SingleImage
                  showEdit={true}
                  product={productDetails}
                  onPress={() =>
                    navigation.navigate('EditProductImages', {
                      productID: productDetails?.id,
                    })
                  }
                />
              ) : (
                <View
                  style={{
                    marginTop: SIZES.base,
                  }}>
                  <FlatList
                    data={productDetails?.images}
                    keyExtractor={(item: any) => `${item}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return (
                        <ViewMultipleImages
                          key={index}
                          index={index}
                          images={item}
                        />
                      );
                    }}
                  />
                  <TextButton
                    label={'Edit photos'}
                    labelStyle={{
                      ...FONTS.body3,
                      fontWeight: 'bold',
                      color: COLORS.primary1,
                    }}
                    buttonContainerStyle={{
                      alignSelf: 'flex-start',
                      width: 120,
                      height: 35,
                      borderRadius: SIZES.base,
                      borderWidth: 1,
                      borderColor: COLORS.primary1,
                      backgroundColor: COLORS.white,
                    }}
                    onPress={() =>
                      navigation.navigate('EditProductImages', {
                        productID: productDetails?.id,
                      })
                    }
                  />
                </View>
              )}
            </View>
          </View>

          <TextButton
            label={isSubmitting ? 'Loading...' : 'Continue'}
            buttonContainerStyle={{
              alignSelf: 'center',
              marginBottom: 100,
            }}
            onPress={handleSubmit(onSubmit)}
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default EditProductItem;
