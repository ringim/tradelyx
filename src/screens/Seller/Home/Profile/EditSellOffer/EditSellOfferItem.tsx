import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useMutation, useQuery} from '@apollo/client';
import {Controller, useForm} from 'react-hook-form';
import Tags from 'react-native-tags';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FlatList} from 'react-native-gesture-handler';
import {Root, ALERT_TYPE, Toast} from 'react-native-alert-notification';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';

import {
  FormInput,
  Header,
  ImageUpload,
  SingleImage,
  TextButton,
  Tags as RenderTags,
  RequestTags,
  ViewMultipleImages,
} from '../../../../../components';
import {COLORS, FONTS, icons, SIZES} from '../../../../../constants';
import {
  EditSellOfferItemRouteProp,
  ProfileStackNavigatorParamList,
} from '../../../../../components/navigation/SellerNav/type/navigation';
import {
  getSellOffer,
  updateSellOffer,
} from '../../../../../queries/RequestQueries';
import {
  GetSellOfferQuery,
  GetSellOfferQueryVariables,
  UpdateSellOfferInput,
  UpdateSellOfferMutation,
  UpdateSellOfferMutationVariables,
  ListCommodityCategoriesQuery,
  ListCommodityCategoriesQueryVariables,
} from '../../../../../API';
import {listCommodityCategories} from '../../../../../queries/ProductQueries';
import {uploadMedia} from '../../../../../utilities/service';

interface SellOffData {
  sellOffer: string;
  productName: string;
  desc: string;
  category: string;
}

const EditSellOfferItem = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<EditSellOfferItemRouteProp>();

  const {id}: any = route?.params?.sellOffer;

  const {control, handleSubmit, setValue} = useForm<SellOffData>();

  // GET PRODUCT DETAIL
  const {loading, data} = useQuery<
    GetSellOfferQuery,
    GetSellOfferQueryVariables
  >(getSellOffer, {
    variables: {id: id},
  });
  const sellOfferDetails: any = data?.getSellOffer;

  // LIST COMMODITY CATEGORIES
  const {data: onData, loading: onLoad} = useQuery<
    ListCommodityCategoriesQuery,
    ListCommodityCategoriesQueryVariables
  >(listCommodityCategories);

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState<any>('');
  const [jobType, setJobType] = useState<any>();
  const [ccID, setCCID] = useState<any>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>('');
  const [selectedPhotos, setSelectedPhotos] = useState<any | Asset>([]);
  const [initialTags, setInitialTags] = useState(sellOfferDetails?.tags);
 
  // UPDATE USER DETAILS
  const [doUpdateSellOffer] = useMutation<
    UpdateSellOfferMutation,
    UpdateSellOfferMutationVariables
  >(updateSellOffer);

  useFocusEffect(
    useCallback(() => {
      const allCommodityCategories: any =
        onData?.listCommodityCategories?.items.filter(
          (item: any) => !item?._deleted,
        ) || [];
      setJobType(allCommodityCategories);
    }, [onLoad]),
  );

  const onSubmit = async ({sellOffer, desc, productName}: SellOffData) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const input: UpdateSellOfferInput = {
        id: sellOfferDetails?.id,
        title: sellOffer,
        requestCategory: type?.title,
        tags: initialTags,
        productName,
        image: selectedPhoto,
        images: selectedPhotos,
        description: desc,
        commoditycategoryID: ccID,
      };

      if (selectedPhoto) {
        const imageKey = await uploadMedia(selectedPhoto);
        input.image = imageKey;
      } else if (selectedPhotos) {
        const imageKeys = await Promise.all(
          selectedPhotos.map((img: any) => uploadMedia(img?.uri)),
        );
        input.images = imageKeys;
      }

      await doUpdateSellOffer({
        variables: {
          input,
        },
      });

      // console.log('product updated 1', input);
      navigation.navigate('EditSellOfferShipment', {
        sellOffer: sellOfferDetails,
      });
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
    if (sellOfferDetails && isCurrent) {
      setValue('sellOffer', sellOfferDetails?.title);
      setValue('productName', sellOfferDetails?.productName);
      setValue('desc', sellOfferDetails?.description);
      setValue('category', sellOfferDetails?.commoditycategoryID);
    }
    return () => {
      isCurrent = false;
    };
  }, [sellOfferDetails, setValue]);

  const onTagPress = (deleted: any) => {
    return deleted ? 'deleted' : 'not deleted';
  };

  const onChangeTags = (tags: any) => {
    setInitialTags(tags);
  };

  const renderTag = ({tag, index, onPress}: any) => {
    return <RenderTags index={index} tag={tag} onPress={onPress} />;
  };

  const openImageGallery = () => {
    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 7, quality: 0.4},
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

  // Delete a single image
  const deleteItem = (itemId: any) => {
    setSelectedPhotos((prevData: any) =>
      prevData.filter((item: any) => item.uri !== itemId),
    );
  };

  function renderFormSection() {
    return (
      <View
        style={{
          marginTop: SIZES.semi_margin,
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Commodity Category Type */}
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
                  marginTop: SIZES.semi_margin,
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
                open={open}
                showArrowIcon={true}
                placeholder="Select Category"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value1 || value}
                items={jobType}
                loading={onLoad}
                setOpen={setOpen}
                setValue={setValue1}
                setItems={setJobType}
                style={{
                  borderRadius: SIZES.base,
                  height: 40,
                  marginTop: SIZES.radius,
                  borderColor: COLORS.Neutral7,
                  borderWidth: 0.5,
                }}
                placeholderStyle={{color: COLORS.Neutral6, ...FONTS.body3}}
                textStyle={{color: COLORS.Neutral1}}
                closeIconStyle={{
                  width: 24,
                  height: 24,
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
                onChangeValue={(value: any) => {
                  setCCID(value);
                }}
                onSelectItem={(value: any) => {
                  setType(value);
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

        {/* Sell offer title */}
        <FormInput
          label="Sell Offer Title"
          name="sellOffer"
          control={control}
          placeholder="50 bags of Fresh Tomatoes"
          rules={{
            required: 'Sell Offer is required',
          }}
          containerStyle={{marginTop: SIZES.padding}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

        {/* Tags or Keywords */}
        <RequestTags
          initialTags={initialTags}
          onChangeTags={onChangeTags}
          onTagPress={onTagPress}
          renderTag={renderTag}
          title={'Tags or Keywords'}
        />

        {/* Product name */}
        <FormInput
          label="Product Name"
          name="productName"
          control={control}
          placeholder="e.g. Fresh Tomato"
          rules={{
            required: 'Sell Offer is required',
          }}
          containerStyle={{marginTop: SIZES.semi_margin}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

        {/* Description */}
        <FormInput
          label="Detailed Description"
          name="desc"
          control={control}
          multiline={true}
          placeholder="Add a description"
          containerStyle={{marginTop: SIZES.semi_margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{
            marginTop: SIZES.base,
            height: 140,
            padding: SIZES.base,
          }}
        />

        {/* product images */}
        <View
          style={{
            marginTop: SIZES.margin,
            marginHorizontal: 4,
            marginBottom: 50,
          }}>
          <Text
            style={{...FONTS.body3, fontWeight: '500', color: COLORS.Neutral1}}>
            Product Images
          </Text>
          {sellOfferDetails?.image ? (
            <SingleImage
              product={sellOfferDetails}
              onPress={() =>
                navigation.navigate('EditSellOfferImages', {
                  sellOfferID: sellOfferDetails?.id,
                })
              }
            />
          ) : (
            <View
              style={{
                marginTop: SIZES.base,
              }}>
              <FlatList
                data={sellOfferDetails?.images}
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
                    productID: sellOfferDetails?.id,
                  })
                }
              />
            </View>
          )}
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size={'large'}
        color={COLORS.primary4}
      />
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Edit Sell Offer'}
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
              marginTop: 60,
            }}
            onPress={handleSubmit(onSubmit)}
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};
export default EditSellOfferItem;
