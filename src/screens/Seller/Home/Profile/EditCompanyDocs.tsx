import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useMutation} from '@apollo/client';
import {Root, ALERT_TYPE, Toast} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';
import DocumentPicker from 'react-native-document-picker';
import {FlatList} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  EditCompanyDocsRouteProp,
  ProfileStackNavigatorParamList,
} from '../../../../components/navigation/SellerNav/type/navigation';
import {COLORS, FONTS, SIZES, icons} from '../../../../constants';
import {
  UpdateUserMutation,
  UpdateUserInput,
  UpdateUserMutationVariables,
} from '../../../../API';
import {updateUser} from '../../../../queries/UserQueries';
import {uploadFile2, selectFile2} from '../../../../utilities/service';
import {Header, TextButton} from '../../../../components';

interface UserData {
  file: any;
}

const EditCompanyDocs = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<EditCompanyDocsRouteProp>();
  const {idDoc}: any = route?.params;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [singleFile, setSingleFile] = useState<any>([]);

  // UPDATE USER DETAILS
  const [doUpdateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUser);

  const onSubmit = async ({file}: UserData) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const input: UpdateUserInput = {
        id: idDoc,
        certsDoc: file,
      };

      if (singleFile) {
        const fileKeys = await Promise.all(
          singleFile.map((singleFile: any) => uploadFile2(singleFile?.uri)),
        );
        input.certsDoc = fileKeys;
      }

      await doUpdateUser({
        variables: {
          input,
        },
      });

      // console.log('User doc updated', input);
      navigation.goBack();
      setSingleFile([]);
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

  // Delete a file
  const deleteItem2 = (itemId: any) => {
    setSingleFile((prevData: any) =>
      prevData.filter((item: any) => item.uri !== itemId),
    );
  };

  return (
    <Root>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <Header
          title={'Update Company Document'}
          nav={true}
          onPress={() => navigation.goBack()}
          contentStyle={{
            paddingTop: SIZES.padding,
            height: 40,
          }}
        />

        <Spinner
          visible={isSubmitting}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        {singleFile?.length >= 1 ? (
          <View
            style={{
              marginTop: SIZES.padding * 2,
              marginHorizontal: SIZES.padding,
            }}>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '600',
                color: COLORS.Neutral1,
              }}>
              Company Documents
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
          <View
            style={{
              marginTop: SIZES.padding * 2,
              marginHorizontal: SIZES.padding,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  ...FONTS.body3,
                  fontWeight: '500',
                  color: COLORS.Neutral1,
                }}>
                Upload Company Documents
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => selectFile2(singleFile, setSingleFile)}
              style={{
                justifyContent: 'center',
                padding: SIZES.base,
                backgroundColor: COLORS.white,
                borderWidth: 2,
                borderColor: COLORS.primary1,
                borderRadius: SIZES.radius,
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View style={{justifyContent: 'center'}}>
                  <FastImage
                    tintColor={COLORS.primary1}
                    source={icons.clip}
                    style={{width: 24, height: 24}}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View
                  style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
                  <Text
                    style={{
                      ...FONTS.h5,
                      color: COLORS.primary1,
                    }}>
                    Browse
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <TextButton
          label={isSubmitting ? 'Saving...' : 'Save'}
          buttonContainerStyle={{
            alignSelf: 'center',
            marginTop: 40,
            width: 120,
            height: 40,
            borderRadius: SIZES.base,
          }}
          onPress={onSubmit}
        />
      </View>
    </Root>
  );
};

export default EditCompanyDocs;
