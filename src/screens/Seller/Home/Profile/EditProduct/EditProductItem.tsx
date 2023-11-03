import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useMutation, useQuery} from '@apollo/client';
import {Controller, useForm} from 'react-hook-form';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import {Asset} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Tags from 'react-native-tags';
import FastImage from 'react-native-fast-image';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Root,
  ALERT_TYPE,
  Toast,
} from 'react-native-alert-notification';

import {COLORS, SIZES, FONTS, icons} from '../../../../../constants';
import {
  FileSection,
  FormInput,
  Header,
  ImageUpload,
  MultipleImages,
  ProductImage,
  SingleImage,
  TextButton,
  UploadDocs,
  ViewProductImage,
} from '../../../../../components';
import {
  EditProductPriceRouteProp,
  ProfileStackNavigatorParamList,
} from '../../../../../components/navigation/SellerNav/type/navigation';
import {
  getProduct,
  listCategories,
  listCommodityCategories,
  updateProduct,
} from '../../../../../queries/ProductQueries';
import {
  UpdateProductMutation,
  UpdateProductMutationVariables,
  GetProductQuery,
  GetProductQueryVariables,
  ListCategoriesQueryVariables,
  ListCommodityCategoriesQuery,
  ListCommodityCategoriesQueryVariables,
  ListCategoriesQuery,
  UpdateProductInput,
} from '../../../../../API';
import {
  onChangePhoto,
  openImageGallery,
  selectFile,
  uploadFile,
  uploadMedia,
} from '../../../../../utilities/service';

interface ProductData {
  title: string;
  cert: string;
  desc: string;
  file: any;
  image: string;
  pCat: string;
  category: string;
}

const EditProductItem = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<EditProductPriceRouteProp>();

  const {id}: any = route?.params?.product;

  const {control, handleSubmit, setValue} = useForm<ProductData>();

  // GET PRODUCT DETAIL
  const {loading, data} = useQuery<GetProductQuery, GetProductQueryVariables>(
    getProduct,
    {
      variables: {id: id},
    },
  );
  const productDetails: any = data?.getProduct;

  // LIST PRODUCT CATEGORIES
  const {data: onData, loading: onLoad} = useQuery<
    ListCategoriesQuery,
    ListCategoriesQueryVariables
  >(listCategories);

  // LIST COMMODITY CATEGORIES
  const {data: newData, loading: newLoad} = useQuery<
    ListCommodityCategoriesQuery,
    ListCommodityCategoriesQueryVariables
  >(listCommodityCategories);

  const [productImage, setProductImage] = useState<any | Asset>('');
  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>('');
  const [selectedPhotos, setSelectedPhotos] = useState<any | Asset>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [singleFile, setSingleFile] = useState<any>([]);

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>();

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [type2, setType2] = useState('');
  const [jobType2, setJobType2] = useState<any>();

  const [initialTags, setInitialTags] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const allCommodityCategories: any =
        newData?.listCommodityCategories?.items.filter(
          (item: any) => !item?._deleted,
        ) || [];
      setJobType(allCommodityCategories);
    }, [newLoad]),
  );

  useFocusEffect(
    useCallback(() => {
      const allCategories: any =
        onData?.listCategories?.items.filter((item: any) => !item?._deleted) ||
        [];
      setJobType2(allCategories);
    }, [onLoad]),
  );

  // UPDATE USER DETAILS
  const [doUpdateProduct] = useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(updateProduct);

  const onSubmit = async ({title, desc, file, cert}: ProductData) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const input: UpdateProductInput = {
        id: productDetails?.id,
        title: title,
        productCertification: cert,
        description: desc,
        image: selectedPhoto,
        images: selectedPhotos,
        productImage: productImage,
        documents: file,
        categoriesID: type,
        commoditycategoryID: type2,
      };

      if (singleFile) {
        const fileKeys = await Promise.all(
          singleFile.map((singleFile: any) => uploadFile(singleFile?.uri)),
        );
        input.documents = fileKeys;
      }

      if (selectedPhoto) {
        const imageKey = await uploadMedia(selectedPhoto);
        input.image = imageKey;
      } else if (selectedPhotos) {
        const imageKeys = await Promise.all(
          selectedPhotos.map((img: any) => uploadMedia(img?.uri)),
        );
        input.images = imageKeys;
      }

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
    if (productDetails) {
      setValue('title', productDetails?.title);
      setValue('cert', productDetails?.productCertification);
      setValue('desc', productDetails?.description);
      setValue('image', productDetails?.image);
    }
  }, [productDetails, setValue]);

  if (loading) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size={'large'}
        color={COLORS.primary4}
      />
    );
  }

  const onTagPress = (index: any, tagLabel: any, event: any, deleted: any) => {
    return {
      index,
      tagLabel,
      event,
      deleted: deleted ? 'deleted' : 'not deleted',
    };
  };

  const onChangeTags = (tags: any) => {
    setInitialTags(tags);
  };

  const renderTag = ({tag, index, onPress}: any) => {
    return (
      <TouchableOpacity
        key={`${tag}-${index}`}
        onPress={onPress}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: COLORS.NeutralBlue6,
          borderRadius: SIZES.semi_margin,
          padding: SIZES.base,
          paddingVertical: 5,
          margin: SIZES.base,
          marginRight: 2,
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{color: COLORS.white, ...FONTS.cap1, fontWeight: '500'}}>
            {tag}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            padding: 5,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.padding,
            marginLeft: 4,
          }}>
          <FastImage
            source={icons.close}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={COLORS.NeutralBlue5}
            style={{width: 6, height: 6}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  function renderFormSection() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* ProductImage */}
        <View style={{marginTop: SIZES.semi_margin}}>
          {!productImage ? (
            <ProductImage onChange={() => onChangePhoto(setProductImage)} />
          ) : (
            <ViewProductImage
              setSelectedPhoto={setProductImage}
              selectedPhoto={productImage}
            />
          )}
        </View>

        {/* Product title */}
        <FormInput
          label="Product title"
          name="title"
          control={control}
          placeholder="Enter product title"
          rules={{
            required: 'product title is required',
          }}
          containerStyle={{marginTop: SIZES.margin}}
          inputContainerStyle={{marginTop: SIZES.base}}
        />

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
              label: 'title',
              value: 'id',
            }}
            open={open2}
            showArrowIcon={true}
            placeholder="Select Product Category"
            showTickIcon={true}
            loading={newLoad}
            dropDownDirection="AUTO"
            listMode="MODAL"
            value={value2}
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
              <FastImage source={icons.down} style={{width: 15, height: 15}} />
            )}
            modalContentContainerStyle={{
              paddingHorizontal: SIZES.padding * 3,
            }}
            modalTitle="Select your category"
            modalTitleStyle={{
              fontWeight: '600',
            }}
            onChangeValue={(value: any) => {
              setType2(value);
            }}
          />
        </View>

        {/* Category Type */}
        <View>
          <Text
            style={{
              marginTop: SIZES.margin,
              color: COLORS.Neutral1,
              ...FONTS.body3,
              fontWeight: '500',
            }}>
            Category
          </Text>
          <DropDownPicker
            schema={{
              label: 'title',
              value: 'id',
            }}
            open={open}
            showArrowIcon={true}
            placeholder="Select Category"
            showTickIcon={true}
            dropDownDirection="AUTO"
            listMode="MODAL"
            value={value1}
            items={jobType}
            setOpen={setOpen}
            setValue={setValue1}
            setItems={setJobType}
            loading={onLoad}
            style={{
              borderRadius: SIZES.base,
              height: 40,
              marginTop: SIZES.base,
              borderColor: COLORS.Neutral7,
              borderWidth: 0.5,
            }}
            activityIndicatorSize={50}
            activityIndicatorColor={COLORS.primary4}
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
              <FastImage source={icons.down} style={{width: 15, height: 15}} />
            )}
            modalContentContainerStyle={{
              paddingHorizontal: SIZES.padding * 3,
            }}
            modalTitle="Select your category"
            modalTitleStyle={{
              fontWeight: '600',
            }}
            onChangeValue={(value: any) => {
              setType(value);
            }}
          />
        </View>

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
        <View style={{marginTop: SIZES.semi_margin}}>
          <Text
            style={{
              color: COLORS.Neutral1,
              ...FONTS.body3,
            }}>
            Tags or Keywords
          </Text>

          <View
            style={{
              flex: 1,
              marginTop: 10,
              borderWidth: 0.5,
              borderColor: COLORS.Neutral7,
              borderRadius: SIZES.semi_margin,
            }}>
            <Tags
              containerStyle={{
                margin: 4,
                borderRadius: SIZES.base,
                justifyContent: 'flex-start',
              }}
              initialText={''}
              textInputProps={{
                placeholderTextColor: COLORS.Neutral7,
                placeholder:
                  'Add any type of item e.g. vegetables, agriculture',
              }}
              inputStyle={{
                backgroundColor: COLORS.white,
                color: COLORS.black,
                ...FONTS.body3,
              }}
              initialTags={initialTags}
              onChangeTags={onChangeTags}
              onTagPress={onTagPress}
              renderTag={renderTag}
            />
          </View>
        </View>

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
          {singleFile?.length >= 1 ? (
            <FileSection file={singleFile} setSingleFile={setSingleFile} />
          ) : (
            <UploadDocs
              title={'Product Brochure'}
              selectFile={() => selectFile(setSingleFile, singleFile)}
              containerStyle={{
                marginTop: SIZES.semi_margin,
                marginHorizontal: 3,
              }}
            />
          )}
        </View>

        {/* product images */}
        <View
          style={{
            marginTop: singleFile?.length >= 1 ? SIZES.margin : SIZES.margin,
            marginHorizontal: singleFile?.length >= 1 ? 0 : 4,
            marginBottom: 100,
          }}>
          <Text
            style={{...FONTS.body3, fontWeight: '500', color: COLORS.Neutral1}}>
            Product Images
          </Text>
          {!selectedPhoto && selectedPhotos?.length === 0 ? (
            <ImageUpload
              onPress={() =>
                openImageGallery(setSelectedPhoto, setSelectedPhotos)
              }
            />
          ) : selectedPhoto ? (
            <SingleImage
              selectedPhoto={selectedPhoto}
              setSelectedPhoto={setSelectedPhoto}
            />
          ) : (
            <MultipleImages
              selectedPhotos={selectedPhotos}
              setSelectedPhotos={setSelectedPhotos}
            />
          )}
        </View>
      </View>
    );
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
          enableOnAndroid={true}>
          <View
            style={{
              marginHorizontal: SIZES.margin,
            }}>
            <Text style={{...FONTS.h4, color: COLORS.black}}>
              Update all fields
            </Text>
          </View>

          {renderFormSection()}
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
