import {View, Text, Platform, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation} from '@react-navigation/native';
import {v4 as uuidV4} from 'uuid';
import DropDownPicker from 'react-native-dropdown-picker';
import {Controller, useForm} from 'react-hook-form';
import {Asset} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../../../../constants';
import {useAuthContext} from '../../../../../context/AuthContext';
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
} from '../../../../../components';
import {createProduct} from '../../../../../queries/ProductQueries';
import {
  CreateProductInput,
  CreateProductMutation,
  CreateProductMutationVariables,
} from '../../../../../API';
import {
  onChangePhoto,
  openImageGallery,
  selectFile2,
  uploadMedia,
  uploadFile2,
} from '../../../../../utilities/service';
import {allCategories} from '../../../../../../types/types';

interface IAddProduct {
  title: string;
  desc: string;
  file: any;
}

const AddProducts = () => {
  const navigation = useNavigation<any>();
  const {userID} = useAuthContext();
  const {control, handleSubmit}: any = useForm();

  const [productImage, setProductImage] = useState<any | Asset>('');
  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>('');
  const [selectedPhotos, setSelectedPhotos] = useState<any | Asset>([]);
  const [loading, setLoading] = useState(false);
  const [singleFile, setSingleFile] = useState<any>([]);
  const [initialTags, setInitialTags] = useState([]);
  const [fileNames, setFileNames] = useState<any>([]);
  const [productCert, setProductCert] = useState('');

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState<any>('');
  const [jobType, setJobType] = useState<any>(allCategories);

  const uriName = fileNames?.map((name: {name: string}) => name?.name);

  // CREATE REQUEST QUOTATION
  const [doCreateProduct] = useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(createProduct);

  const onSubmit = async ({file, desc, title}: IAddProduct) => {
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
        tags: initialTags,
        title,
        description: desc,
        productCertDocs: file,
        productCert,
        category: type,
        rating: 0,
        userID,
      };

      if (productImage) {
        input.productImage = await uploadMedia(productImage.uri);
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

      // upload file or multiple files
      if (singleFile) {
        const fileKeys = await Promise.all(
          singleFile.map((singleFile: any) => uploadFile2(singleFile?.uri)),
        );
        input.productCertDocs = fileKeys;
      }

      await doCreateProduct({
        variables: {
          input,
        },
      });
      // console.log('product data', input);
      navigation.navigate('ProductSpecification', {productID: input.id});
      setSingleFile([]);
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
    return <RenderTags key={index} tag={tag} onPress={onPress} />;
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
            <ProductImage
              title={'Product Thumbnail'}
              onChange={() => onChangePhoto(setProductImage)}
            />
          ) : (
            <ViewProductImage
              setSelectedPhoto={setProductImage}
              selectedPhoto={productImage}
            />
          )}
        </View>

        {/* Category Type */}
        <Controller
          control={control}
          name="category"
          rules={{
            required: 'Category is required',
          }}
          render={({field: {onChange}, fieldState: {error}}: any) => (
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
                  label: 'type',
                  value: 'id',
                }}
                open={open}
                showArrowIcon={true}
                placeholder="Select Category"
                showTickIcon={true}
                onChangeValue={onChange}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value1}
                items={jobType}
                setOpen={setOpen}
                setValue={setValue1}
                setItems={setJobType}
                style={{
                  borderRadius: SIZES.base,
                  height: 40,
                  marginTop: SIZES.base,
                  borderColor: COLORS.Neutral7,
                  borderWidth: 0.5,
                }}
                activityIndicatorSize={50}
                activityIndicatorColor={COLORS.primary6}
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
                modalTitle="Select Product Category"
                modalTitleStyle={{
                  fontWeight: '600',
                }}
                onSelectItem={(value: any) => {
                  setType(value?.type);
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
            Product Certification
          </Text>
          <TextInput
            autoFocus={false}
            onChangeText={setProductCert}
            value={productCert}
            placeholder="e.g Organic, Non-GMO, SON, ISO"
            placeholderTextColor={COLORS.gray}
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
              marginTop: SIZES.base,
              height: 50,
              fontWeight: '500',
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.base,
              borderWidth: 0.5,
              borderColor: COLORS.Neutral7,
            }}
          />
        </View>

        {/* upload docs */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          {singleFile?.length >= 1 ? (
            <FileSection
              title="Product Certification"
              file={singleFile}
              indexKey={singleFile}
              setSingleFile={setSingleFile}
            />
          ) : (
            <UploadDocs
              title="Add Product Certification Docs"
              selectFile={() => selectFile2(setSingleFile, singleFile)}
              containerStyle={{marginHorizontal: 0}}
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
            <View style={{marginTop: SIZES.padding}}>
              <FastImage
                source={{
                  uri: selectedPhoto,
                  priority: FastImage.priority.high,
                }}
                style={{
                  height: 100,
                  width: 100,
                  overflow: 'hidden',
                  borderRadius: SIZES.radius,
                }}
              />
              <TouchableOpacity
                onPress={() => setSelectedPhoto(null)}
                style={{
                  padding: SIZES.base,
                  top: -18,
                  left: 90,
                  borderRadius: SIZES.margin,
                  backgroundColor: COLORS.NeutralBlue10,
                  position: 'absolute',
                }}>
                <FastImage
                  source={icons.remove}
                  style={{width: 20, height: 20}}
                  tintColor={COLORS.Rose5}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacity>
            </View>
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
        <Header title={'Add Product'} tintColor={COLORS.Neutral1} />

        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <QuotationProgress1
          bgColor1={COLORS.primary1}
          bgColor2={COLORS.white}
          bgColor4={COLORS.white}
          color1={COLORS.primary1}
          item1={COLORS.white}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={150}
          extraScrollHeight={150}
          bounces={false}
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
