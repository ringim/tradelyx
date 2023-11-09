import {View, Text, Platform, ActivityIndicator} from 'react-native';
import React, {useState, useCallback} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {v4 as uuidV4} from 'uuid';
import DropDownPicker from 'react-native-dropdown-picker';
import {useForm} from 'react-hook-form';
import {Asset} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {useAuthContext} from '../../../context/AuthContext';
import {
  FormInput,
  Header,
  ImageUpload,
  ProductImage,
  QuotationProgress1,
  TextButton,
  UploadDocs,
  ViewProductImage,
  Tags as RenderTags,
  RequestTags,
  FileSection,
  MultipleImages,
  OneImage,
} from '../../../components';
import {
  createProduct,
  listCategories,
  listCommodityCategories,
} from '../../../queries/ProductQueries';
import {
  CreateProductInput,
  CreateProductMutation,
  CreateProductMutationVariables,
  ListCategoriesQuery,
  ListCategoriesQueryVariables,
  ListCommodityCategoriesQuery,
  ListCommodityCategoriesQueryVariables,
} from '../../../API';
import {
  onChangePhoto,
  openImageGallery,
  selectFile,
  uploadFile,
  uploadMedia,
} from '../../../utilities/service';

interface IAddProduct {
  title: string;
  desc: string;
  cert: string;
  file: any;
}

const AddProducts = () => {
  const navigation = useNavigation<any>();
  const {userID} = useAuthContext();
  const {control, handleSubmit}: any = useForm();

  // LIST PRODUCT CATEGORIES
  const {data, loading: onLoad} = useQuery<
    ListCategoriesQuery,
    ListCategoriesQueryVariables
  >(listCategories);

  // console.log(allCategories);

  // LIST COMMODITY CATEGORIES
  const {data: newData, loading: newLoad} = useQuery<
    ListCommodityCategoriesQuery,
    ListCommodityCategoriesQueryVariables
  >(listCommodityCategories);

  const [productImage, setProductImage] = useState<any | Asset>('');
  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>('');
  const [selectedPhotos, setSelectedPhotos] = useState<any | Asset>([]);
  const [loading, setLoading] = useState(false);
  const [singleFile, setSingleFile] = useState<any>([]);
  const [initialTags, setInitialTags] = useState([]);

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState<any>('');
  const [jobType, setJobType] = useState<any>();

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [type2, setType2] = useState<any>('');
  const [jobType2, setJobType2] = useState<any>();
  const [ccID, setCCID] = useState<any>('');
  const [cID, setCID] = useState<any>('');

  // console.log('singleFile', singleFile);

  useFocusEffect(
    useCallback(() => {
      const allCommodityCategories: any =
        newData?.listCommodityCategories?.items.filter(
          (item: any) => !item?._deleted,
        ) || [];
      setJobType2(allCommodityCategories);
    }, [newLoad]),
  );

  useFocusEffect(
    useCallback(() => {
      const allCategories: any =
        data?.listCategories?.items.filter((item: any) => !item?._deleted) ||
        [];
      setJobType(allCategories);
    }, [onLoad]),
  );

  // CREATE REQUEST QUOTATION
  const [doCreateProduct] = useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(createProduct);

  const onSubmit = async ({cert, file, desc, title}: IAddProduct) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: CreateProductInput = {
        id: uuidV4(),
        image: selectedPhoto,
        images: selectedPhotos,
        productImage: productImage,
        categoriesID: cID,
        tags: initialTags,
        title,
        description: desc,
        documents: file,
        productCertification: cert,
        commoditycategoryID: ccID,
        category: type?.title,
        commodityCategory: type2?.title,
        userID,
      };

      // upload file or multiple files
      if (productImage) {
        input.productImage = await uploadMedia(productImage.uri);
      }

      if (singleFile) {
        const fileKeys = await Promise.all(
          singleFile.map((singleFile: any) => uploadFile(singleFile?.uri)),
        );
        input.documents = fileKeys;
      }

      // single or multiple image brochures upload
      if (selectedPhoto) {
        const imageKey = await uploadMedia(selectedPhoto);
        input.image = imageKey;
      } else if (selectedPhotos) {
        const imageKeys = await Promise.all(
          selectedPhotos.map((img: any) => uploadMedia(img?.uri)),
        );
        input.images = imageKeys;
      }

      await doCreateProduct({
        variables: {
          input,
        },
      });
      // console.log('product data', input);
      navigation.navigate('ProductSpecification', {productID: input.id});
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        autoClose: 15000,
      });
    } finally {
      setLoading(false);
    }
  };

  const onTagPress = (deleted: any) => {
    return deleted ? 'deleted' : 'not deleted';
  };

  const onChangeTags = (tags: any) => {
    setInitialTags(tags);
  };

  const renderTag = ({tag, index, onPress}: any) => {
    return <RenderTags index={index} tag={tag} onPress={onPress} />;
  };

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
          marginBottom: 100,
        }}>
        {/* ProductImage */}
        <View>
          {!productImage ? (
            <ProductImage onChange={() => onChangePhoto(setProductImage)} />
          ) : (
            <ViewProductImage
              setSelectedPhoto={setProductImage}
              selectedPhoto={productImage}
            />
          )}
        </View>

        {/* Commodity Category Type */}
        <View>
          <Text
            style={{
              marginTop: SIZES.margin,
              color: COLORS.Neutral1,
              ...FONTS.body3,
              fontWeight: '500',
            }}>
            Product Type
          </Text>
          <DropDownPicker
            schema={{
              label: 'title',
              value: 'id',
            }}
            open={open2}
            showArrowIcon={true}
            placeholder="Select product category"
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
              setCCID(value);
            }}
            onSelectItem={(value: any) => {
              setType2(value);
            }}
          />
        </View>

        {/* Category Type */}
        <View>
          <Text
            style={{
              marginTop: SIZES.padding,
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
              setCID(value);
            }}
            onSelectItem={(value: any) => {
              setType(value);
            }}
          />
        </View>

        {/* Product name */}
        <FormInput
          label="Product Title"
          name="title"
          control={control}
          placeholder="e.g. Fresh Tomato"
          rules={{
            required: 'Product title is required',
          }}
          containerStyle={{marginTop: SIZES.margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
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
          containerStyle={{marginTop: SIZES.radius}}
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
          containerStyle={{marginTop: SIZES.radius}}
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
              title="Product Brochures"
              file={singleFile}
              setSingleFile={setSingleFile}
            />
          ) : (
            <UploadDocs
              title="Attach Supporting Document"
              selectFile={() => selectFile(setSingleFile, singleFile)}
              containerStyle={{marginHorizontal: 10}}
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
            <OneImage
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

  if (onLoad) {
    <ActivityIndicator
      style={{flex: 1, justifyContent: 'center'}}
      size={'large'}
      color={COLORS.primary6}
    />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'Add Product'} tintColor={COLORS.Neutral1} />

        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <QuotationProgress1
          bgColor1={COLORS.primary1}
          bgColor2={COLORS.white}
          bgColor3={COLORS.white}
          bgColor4={COLORS.white}
          color1={COLORS.primary1}
          item1={COLORS.white}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={150}
          extraScrollHeight={150}
          enableOnAndroid={true}>
          <View style={{margin: SIZES.semi_margin}}>
            <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
              Product Information
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

export default AddProducts;
