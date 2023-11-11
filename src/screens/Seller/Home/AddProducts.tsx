import {
  View,
  Text,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {v4 as uuidV4} from 'uuid';
import DropDownPicker from 'react-native-dropdown-picker';
import {Controller, useForm} from 'react-hook-form';
import Tags from 'react-native-tags';
import DocumentPicker from 'react-native-document-picker';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {FlatList} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {useAuthContext} from '../../../context/AuthContext';
import {
  FormInput,
  Header,
  ImageUpload,
  ProductImage,
  QuotationProgress1,
  SingleImage,
  TextButton,
  UploadDocs,
  ViewProductImage,
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
import {onChangePhoto, uploadMedia} from '../../../utilities/service';

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
  const [initialTags, setInitialTags] = useState([
    'vegetable',
    'grains',
    'agriculture',
  ]);

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

  const openImageGallery = () => {
    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 7, quality: 0.5},
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          if (assets.length === 1) {
            setSelectedPhoto(assets[0].uri);
          } else if (assets.length > 1) {
            assets.map(asset => asset.uri) as string[];
            setSelectedPhotos(assets);
          }
        }
      },
    );
  };

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
        SType: 'JOB',
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
      if (singleFile) {
        input.productImage = await uploadMedia(productImage.uri);
        const fileKeys = await Promise.all(
          singleFile.map((singleFile2: any) => uploadFile(singleFile2?.uri)),
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

  // Delete a single image
  const deleteItem = (itemId: any) => {
    setSelectedPhotos((prevData: any) =>
      prevData.filter((item: any) => item.uri !== itemId),
    );
  };
  // Delete a single image
  const deleteItem2 = (itemId: any) => {
    setSingleFile((prevData: any) =>
      prevData.filter((item: any) => item.uri !== itemId),
    );
  };

  const selectFile = async (setSingleFile: any) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText],
        allowMultiSelection: true,
      });
      setSingleFile([...singleFile, ...res]);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        return;
      } else {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Unknown Error: ' + JSON.stringify(err),
          autoClose: 1500,
        });
        throw err;
      }
    }
  };

  // UPLOAD FILE TO STORAGE
  const uploadFile = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response?.blob();

      // file extension splitting
      const uriParts = uri.split('.');
      const extension = uriParts[uriParts.length - 1];

      // upload file (blob) to s3
      const s3Response = await Storage.put(`${uuidV4()}.${extension}`, blob);
      return s3Response.key;
    } catch (err) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: (err as Error).message,
        autoClose: 2000,
      });
    }
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
            Product Category
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
        <View style={{marginTop: SIZES.semi_margin}}>
          <Text
            style={{
              color: COLORS.Neutral1,
              ...FONTS.body3,
              fontWeight: '500',
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
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

        {/* upload docs */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          {singleFile?.length >= 1 ? (
            <View style={{marginTop: SIZES.radius}}>
              <Text
                style={{
                  ...FONTS.body3,
                  fontWeight: '500',
                  color: COLORS.Neutral1,
                }}>
                Product Brochure
              </Text>

              <FlatList
                data={singleFile}
                keyExtractor={item => item.uri}
                renderItem={({item}) => (
                  <View style={{marginTop: SIZES.semi_margin}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.white,
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                        }}>
                        <FastImage
                          tintColor={COLORS.secondary1}
                          source={icons.summary}
                          style={{width: 20, height: 20}}
                        />
                      </View>

                      {/* file name and date of upload */}
                      <View
                        style={{
                          flex: 1,
                          marginLeft: SIZES.base,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{...FONTS.h5, color: COLORS.primary1}}
                          numberOfLines={2}>
                          {item?.name}
                        </Text>
                      </View>

                      {/* delete file */}
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          marginRight: SIZES.base,
                        }}
                        onPress={() => deleteItem2(item?.uri)}>
                        <FastImage
                          tintColor={COLORS.Rose4}
                          source={icons.remove}
                          style={{width: 20, height: 20}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          ) : (
            <UploadDocs
              title={'Product Brochure'}
              selectFile={() => selectFile(setSingleFile)}
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
            <ImageUpload onPress={openImageGallery} />
          ) : selectedPhoto ? (
            <SingleImage
              selectedPhoto={selectedPhoto}
              setSelectedPhoto={setSelectedPhoto}
            />
          ) : (
            <View
              style={{
                marginTop: selectedPhotos ? SIZES.semi_margin : SIZES.radius,
              }}>
              <FlatList
                data={selectedPhotos}
                keyExtractor={(item: any) => `${item.uri}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: 100,
                        height: 100,
                        marginLeft: index == 0 ? 2 : 15,
                        marginRight:
                          index == selectedPhotos.length - 1
                            ? SIZES.padding
                            : 0,
                        marginTop: SIZES.radius,
                      }}>
                      <FastImage
                        source={item}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: SIZES.base,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                      <TouchableOpacity
                        onPress={() => deleteItem(item?.uri)}
                        style={{
                          padding: 6,
                          top: -18,
                          right: -10,
                          borderRadius: SIZES.margin,
                          backgroundColor: COLORS.white,
                          position: 'absolute',
                        }}>
                        <FastImage
                          source={icons.remove}
                          style={{width: 17, height: 17}}
                          tintColor={COLORS.Rose5}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
                ListFooterComponent={
                  <View style={{marginBottom: selectedPhotos?.length - 100}} />
                }
              />
            </View>
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
    <AlertNotificationRoot>
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
    </AlertNotificationRoot>
  );
};

export default AddProducts;
