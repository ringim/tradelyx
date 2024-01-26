import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useMutation, useQuery} from '@apollo/client';
import {Controller, useForm} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FlatList} from 'react-native-gesture-handler';
import {Root, ALERT_TYPE, Toast} from 'react-native-alert-notification';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  FormInput,
  Header,
  SingleImage,
  TextButton,
  Tags as RenderTags,
  RequestTags,
  ViewMultipleImages,
  LoadingIndicator,
} from '../../../../../components';
import {COLORS, FONTS, icons, SIZES} from '../../../../../constants';
import {
  EditSellOfferItemRouteProp,
  ProfileStackNavigatorParamList,
} from '../../../../../components/navigation/SellerNav/type/navigation';
import {
  getSellOffer,
  updateSellOffer,
} from '../../../../../queries/SellOfferQueries';
import {
  GetSellOfferQuery,
  GetSellOfferQueryVariables,
  UpdateSellOfferInput,
  UpdateSellOfferMutation,
  UpdateSellOfferMutationVariables,
} from '../../../../../API';
import {crateTypes} from '../../../../../../types/types';

interface SellOffData {
  sellOffer: string;
  productName: string;
  desc: string;
  type: string;
}

const EditSellOfferItem = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route: any = useRoute<EditSellOfferItemRouteProp>();

  const {id}: any = route?.params?.sellOffer;

  const {control, handleSubmit, setValue} = useForm<SellOffData>();

  // GET PRODUCT DETAIL
  const {loading, data} = useQuery<
    GetSellOfferQuery,
    GetSellOfferQueryVariables
  >(getSellOffer, {
    pollInterval: 500,
    variables: {id: id},
  });
  const sellOfferDetails: any = data?.getSellOffer;

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState<any>(sellOfferDetails?.requestCategory);
  const [jobType, setJobType] = useState<any>(crateTypes);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialTags, setInitialTags] = useState(sellOfferDetails?.tags);

  // UPDATE USER DETAILS
  const [doUpdateSellOffer] = useMutation<
    UpdateSellOfferMutation,
    UpdateSellOfferMutationVariables
  >(updateSellOffer);

  const onSubmit = async ({sellOffer, desc, productName}: SellOffData) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const input: UpdateSellOfferInput = {
        id: sellOfferDetails?.id,
        title: sellOffer,
        requestCategory: type,
        tags: initialTags,
        productName,
        description: desc,
      };

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
      setValue('type', sellOfferDetails?.requestCategory);
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
    return <RenderTags key={index} tag={tag} onPress={onPress} />;
  };

  function renderFormSection() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Product Type */}
        <Controller
          control={control}
          name="type"
          rules={{
            required: 'Product type is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
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
                  label: 'type',
                  value: 'type',
                  icon: 'icon',
                }}
                onChangeValue={onChange}
                open={open}
                showArrowIcon={true}
                placeholder="Select Product Type"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value1 || value}
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
                modalTitle="Select your type"
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
          label="Product Title"
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
          }}>
          <Text
            style={{...FONTS.body3, fontWeight: '500', color: COLORS.Neutral1}}>
            Product Images
          </Text>
          {sellOfferDetails?.image ? (
            <SingleImage
              showEdit={true}
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
    return <LoadingIndicator />;
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
          bounces={false}
          enableOnAndroid={true}>
          <View
            style={{
              marginHorizontal: SIZES.semi_margin,
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
              marginTop: SIZES.padding * 2,
            }}
            onPress={handleSubmit(onSubmit)}
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};
export default EditSellOfferItem;
