import {View, Text, TouchableOpacity, Alert, Platform} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Tags from 'react-native-tags';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, constants, icons} from '../../../constants';
import {HomeStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  FormInput,
  Header,
  QuotationProgress2,
  TextButton,
} from '../../../components';

interface ISellOffer {
  sellOffer: string;
  productName: string;
  desc: string;
  images: [];
}

const SellOffer = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const {control, handleSubmit}: any = useForm();

  const [initialTags, setInitialTags] = useState([
    'vegetable',
    'grains',
    'agriculture',
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>([
    {
      id: '0',
      type: 'Freight of all kinds',
      icon: () => (
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../../assets/icons/box.png')}
          style={{width: 15, height: 15}}
        />
      ),
    },
    {
      id: '1',
      type: 'Animal & Animal Products',
      icon: () => (
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../../assets/icons/beef.png')}
          style={{width: 15, height: 15}}
        />
      ),
    },
    {
      id: '2',
      type: 'Vegetable Products',
      icon: () => (
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../../assets/icons/avocado.png')}
          style={{width: 15, height: 15}}
        />
      ),
    },
    {
      id: '3',
      type: 'Animal and Vegetable Fats and Oils',
      icon: () => (
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../../assets/icons/sunflower.png')}
          style={{width: 15, height: 15}}
        />
      ),
    },
    {
      id: '4',
      type: 'Foodstuff, Beverages and Tobacco',
      icon: () => (
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../../assets/icons/apple2.png')}
          style={{width: 15, height: 15}}
        />
      ),
    },
    {
      id: '5',
      type: 'Mineral Products',
      icon: () => (
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../../assets/icons/mineral.png')}
          style={{width: 15, height: 15}}
        />
      ),
    },
    {
      id: '6',
      type: 'Chemical & Allied Industries',
      icon: () => (
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../../assets/icons/dna.png')}
          style={{width: 15, height: 15}}
        />
      ),
    },
  ]);

  const openImageGallery = () => {
    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 7, quality: 0.5},
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          const params: {images?: string[]} = {};
          if (assets.length > 1) {
            params.images = assets.map(asset => asset.uri) as string[];
            setSelectedPhoto(assets);
          }
        }
      },
    );
  };

  // Delete a single image
  const deleteItem = (itemId: any) => {
    setPhotos((prevData: any) =>
      prevData.filter((item: any) => item.uri !== itemId),
    );
  };

  const onTagPress = (index: any, tagLabel: any, event: any, deleted: any) => {
    console.log(index, tagLabel, event, deleted ? 'deleted' : 'not deleted');
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

  const onSubmit = async ({
    sellOffer,
    desc,
    productName,
    images,
  }: ISellOffer) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      // console.log('job data', res);
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

  useEffect(() => {
    let unmounted = false;
    try {
      const stores = selectedPhoto.filter((item: any) => !item?._deleted || []);
      setPhotos(stores);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
    return () => {
      unmounted = true;
    };
  }, [selectedPhoto]);

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
          marginBottom: 100,
        }}>
        {/* Category Type */}
        <Controller
          control={control}
          name="category"
          rules={{
            required: 'Job type is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <>
              <Text
                style={{
                  marginTop: SIZES.base,
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
                }}
                onChangeValue={onChange}
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
                  setType(value?.type);
                }}
              />
              {error && (
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Rose1,
                    top: 14,
                    left: 5,
                  }}>
                  This field is required.
                </Text>
              )}
            </>
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
          containerStyle={{marginTop: SIZES.margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

        {/* Tags or Keywords */}
        <View style={{marginTop: SIZES.semi_margin}}>
          <Text
            style={{
              color: COLORS.Neutral4,
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

          {photos?.length <= 0 ? (
            <TouchableOpacity
              style={{
                marginTop: SIZES.radius,
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.white,
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: COLORS.Neutral6,
              }}
              onPress={openImageGallery}>
              <FastImage
                source={icons.imageUpload}
                style={{width: 30, height: 30}}
                resizeMode={FastImage.resizeMode.contain}
                tintColor={COLORS.primary1}
              />
            </TouchableOpacity>
          ) : (
            <View
              style={{
                marginTop: selectedPhoto ? SIZES.margin : SIZES.radius,
              }}>
              <FlatList
                data={photos}
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
                        marginLeft: index == 0 ? 10 : 15,
                        marginRight:
                          index == selectedPhoto.length - 1 ? SIZES.padding : 0,
                        marginTop: SIZES.semi_margin,
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
                        onPress={() => deleteItem(item.uri)}
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
                ListFooterComponent={<View style={{marginBottom: 100}} />}
              />
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <AlertNotificationRoot>
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
            onPress={() => navigation.navigate('PackingShipment')}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default SellOffer;
