import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {Asset} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useMutation} from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';
import {v4 as uuidV4} from 'uuid';
import DropDownPicker from 'react-native-dropdown-picker';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, constants, icons} from '../../../../../constants';
import {HomeStackNavigatorParamList} from '../../../../../components/navigation/SellerNav/type/navigation';
import {
  FormInput,
  Header,
  ImageUpload,
  QuotationProgress2,
  TextButton,
  Tags as RenderTags,
  RequestTags,
  MultipleImages,
  ViewProductImage,
  ProductImage,
  SourceLocationItem,
} from '../../../../../components';
import {
  CreateSellOfferInput,
  CreateSellOfferMutation,
  CreateSellOfferMutationVariables,
} from '../../../../../API';
import {useAuthContext} from '../../../../../context/AuthContext';
import {createSellOffer} from '../../../../../queries/SellOfferQueries';
import {referralCode} from '../../../../../utilities/Utils';
import {
  onChangePhoto,
  openImageGallery,
  uploadMedia,
} from '../../../../../utilities/service';
import {crateTypes} from '../../../../../../types/types';

interface ISellOffer {
  sellOffer: string;
  productName: string;
  desc: string;
}

const SellOffer = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const {userID} = useAuthContext();
  const {control, handleSubmit}: any = useForm();

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState<any>('');
  const [jobType, setJobType] = useState<any>(crateTypes);
  const [item, setItem] = useState<any>('');
  const [selectedItem, setSelectedItem] = useState<any>('');

  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>('');
  const [selectedPhotos, setSelectedPhotos] = useState<any | Asset>([]);
  const [sellOfferImage, setSellOfferImage] = useState<any | Asset>('');
  const [loading, setLoading] = useState(false);
  const [initialTags, setInitialTags] = useState([]);

  const onTagPress = (deleted: any) => {
    return deleted ? 'deleted' : 'not deleted';
  };

  const onChangeTags = (tags: any) => {
    setInitialTags(tags);
  };

  const renderTag = ({tag, index, onPress}: any) => {
    return <RenderTags key={index} tag={tag} onPress={onPress} />;
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
        sellOfferID: referralCode(),
        title: sellOffer,
        rfqType: item,
        requestCategory: type,
        tags: initialTags,
        productName,
        image: selectedPhoto,
        images: selectedPhotos,
        sellOfferImage: sellOfferImage,
        description: desc,
        userID,
      };

      if (sellOfferImage) {
        input.sellOfferImage = await uploadMedia(sellOfferImage.uri);
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

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
          marginBottom: 100,
        }}>
        {/* source location */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.padding,
          }}>
          {constants.sourceLocation.map((item, index) => {
            return (
              <SourceLocationItem
                key={`SourceLocationItem-${index}`}
                item={item}
                selected={item.id == selectedItem}
                onPress={() => {
                  setSelectedItem(item.id);
                  setItem(item?.label);
                }}
              />
            );
          })}
        </View>

        {/* sellOfferImage */}
        <View style={{marginTop: SIZES.radius}}>
          {!sellOfferImage ? (
            <ProductImage
              title={'Sell Offer Thumbnail'}
              onChange={() => onChangePhoto(setSellOfferImage)}
            />
          ) : (
            <ViewProductImage
              setSelectedPhoto={setSellOfferImage}
              selectedPhoto={sellOfferImage}
            />
          )}
        </View>

        {/* Commodity Category Type */}
        <Controller
          control={control}
          name="category"
          rules={{
            required: 'Category type is required',
          }}
          render={({field: {onChange}, fieldState: {error}}: any) => (
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
                  label: 'type',
                  value: 'id',
                }}
                open={open}
                showArrowIcon={true}
                placeholder="Select Category"
                onChangeValue={onChange}
                showTickIcon={true}
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

        {/* Sell offer title */}
        <FormInput
          label="Sell Offer Title"
          name="sellOffer"
          control={control}
          placeholder="50 bags of Fresh Tomatoes"
          rules={{
            required: 'Sell Offer title is required',
          }}
          containerStyle={{marginTop: SIZES.margin}}
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
          label="Product Title"
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
          rules={{
            required: 'Description is required',
          }}
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
          bounces={false}
          extraScrollHeight={150}
          enableOnAndroid={true}>
          <View style={{margin: SIZES.semi_margin}}>
            <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
              Sell Offer Information
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
