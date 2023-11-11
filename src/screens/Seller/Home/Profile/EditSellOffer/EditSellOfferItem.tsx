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
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Toast,
} from 'react-native-alert-notification';
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
  const [initialTags, setInitialTags] = useState([
    'vegetable',
    'grains',
    'agriculture',
  ]);

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
    if (sellOfferDetails) {
      setValue('sellOffer', sellOfferDetails?.title);
      setValue('productName', sellOfferDetails?.productName);
      setValue('desc', sellOfferDetails?.description);
    }
  }, [sellOfferDetails, setValue]);

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
        <View>
          <Text
            style={{
              marginTop: SIZES.semi_margin,
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
              setType(value);
            }}
          />
        </View>

        {/* Sell offer title */}
        <FormInput
          label="Sell Offer Title"
          name="sellOffer"
          control={control}
          placeholder="50 bags of Fresh Tomatoes"
          rules={{
            required: 'Sell Offer is required',
          }}
          containerStyle={{marginTop: SIZES.margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
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

        {/* Product name */}
        <FormInput
          label="Product Name"
          name="productName"
          control={control}
          placeholder="e.g. Fresh Tomato"
          rules={{
            required: 'Sell Offer is required',
          }}
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

        {/* Description */}
        <FormInput
          label="Detailed Description"
          name="desc"
          control={control}
          multiline={true}
          placeholder="Add a description"
          containerStyle={{marginTop: SIZES.radius}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{
            marginTop: SIZES.base,
            height: 140,
            padding: SIZES.base,
          }}
        />

        {/* product images */}
        <View style={{marginTop: SIZES.semi_margin}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
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
    <AlertNotificationRoot>
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
    </AlertNotificationRoot>
  );
};
export default EditSellOfferItem;
