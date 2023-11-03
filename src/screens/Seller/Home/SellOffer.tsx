import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React, {useState, useCallback} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Tags from 'react-native-tags';
import {useMutation, useQuery} from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';
import {v4 as uuidV4} from 'uuid';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  ALERT_TYPE,
  Root,
  Toast,
} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {HomeStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  FormInput,
  Header,
  ImageUpload,
  QuotationProgress2,
  SingleImage,
  TextButton,
} from '../../../components';
import {
  CreateSellOfferInput,
  CreateSellOfferMutation,
  CreateSellOfferMutationVariables,
  ListCommodityCategoriesQuery,
  ListCommodityCategoriesQueryVariables,
} from '../../../API';
import {useAuthContext} from '../../../context/AuthContext';
import {createSellOffer} from '../../../queries/RequestQueries';
import {referralCode} from '../../../utilities/Utils';
import {uploadMedia} from '../../../utilities/service';
import {listCommodityCategories} from '../../../queries/ProductQueries';
import {FlatList} from 'react-native-gesture-handler';

interface ISellOffer {
  sellOffer: string;
  productName: string;
  desc: string;
}

const SellOffer = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const {userID} = useAuthContext();
  const {control, handleSubmit}: any = useForm();

  // LIST COMMODITY CATEGORIES
  const {data, loading: onLoad} = useQuery<
    ListCommodityCategoriesQuery,
    ListCommodityCategoriesQueryVariables
  >(listCommodityCategories);

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState<any>('');
  const [jobType, setJobType] = useState<any>();
  const [ccID, setCCID] = useState<any>('');

  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>('');
  const [selectedPhotos, setSelectedPhotos] = useState<any | Asset>([]);
  const [loading, setLoading] = useState(false);
  const [initialTags, setInitialTags] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const allCommodityCategories: any =
        data?.listCommodityCategories?.items.filter(
          (item: any) => !item?._deleted,
        ) || [];
      setJobType(allCommodityCategories);
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

  // CREATE REQUEST QUOTATION
  const [doCreateSellOffer] = useMutation<
    CreateSellOfferMutation,
    CreateSellOfferMutationVariables
  >(createSellOffer);

  const onSubmit = async ({sellOffer, desc, productName}: ISellOffer) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: CreateSellOfferInput = {
        id: uuidV4(),
        SType: 'SELLOFFER',
        sellOfferID: referralCode(),
        title: sellOffer,
        requestCategory: type?.title,
        tags: initialTags,
        productName,
        image: selectedPhoto,
        images: selectedPhotos,
        description: desc,
        commoditycategoryID: ccID,
        userID,
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

      await doCreateSellOffer({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      navigation.navigate('PackingShipment', {sellOfferID: input.id});
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

  // Delete a image
  const deleteItem = (itemId: any) => {
    setSelectedPhotos((prevData: any) =>
      prevData.filter((item: any) => item.uri !== itemId),
    );
  };

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
          marginBottom: 100,
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
          containerStyle={{marginTop: SIZES.semi_margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
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

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Create Sell Offer'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />
        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <QuotationProgress2
          bgColor1={COLORS.primary1}
          bgColor2={COLORS.white}
          bgColor3={COLORS.white}
          color1={COLORS.primary1}
          color2={COLORS.Neutral6}
          color3={COLORS.Neutral6}
          item2={COLORS.Neutral6}
          item3={COLORS.Neutral6}
          type={'Packaging'}
          type2={'Payment'}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={150}
          extraScrollHeight={150}
          enableOnAndroid={true}>
          <View style={{margin: SIZES.semi_margin}}>
            <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
              Additional Information
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

export default SellOffer;
