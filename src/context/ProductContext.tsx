import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import { CreateWishlistMutation, CreateWishlistMutationVariables, WishlistsByUserIDQuery, WishlistsByUserIDQueryVariables } from '../API';
import { useMutation, useQuery } from '@apollo/client';
import { createWishlist,  } from '../queries/ProductQueries';

type ProductContextType = {
  storeProductId: Function;
  removeProductItem: Function;
  savedProductItem: string;
  removeItem: Function;
};

const ProductContext = createContext<ProductContextType>({
  storeProductId: Function,
  removeProductItem: Function,
  removeItem: Function,
  savedProductItem: '',
});

const ProductContextProvider = ({children}: {children: ReactNode}) => {
  const [savedProductItem, setSavedProductItem] = useState<any>([]);

  const getBookmarkItem = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@PRODUCT_ITEM');
      setSavedProductItem(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: (e as Error).message,
        autoClose: 1500,
      });
    }
  };

  const storeProductId = async (product: any) => {
    try {
      const productItem = [...savedProductItem, product];
      const jsonValue = JSON.stringify(productItem);
      await AsyncStorage.setItem('@PRODUCT_ITEM', jsonValue);
      setSavedProductItem(productItem);
    } catch (e) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: (e as Error).message,
        autoClose: 1500,
      });
    }
  };

  const removeProductItem = async (product: any) => {
    const newItem = savedProductItem.filter(
      (productIdValue: any) => productIdValue !== product,
    );
    const jsonValue = JSON.stringify(newItem);
    await AsyncStorage.setItem('@product', jsonValue);
    setSavedProductItem(newItem);
  };

  const removeItem = async (itemId: any) => {
    const updatedData = savedProductItem.filter(
      (item: {id: any}) => item.id !== itemId,
    );
    setSavedProductItem(updatedData);
    try {
      await AsyncStorage.setItem('@PRODUCT_ITEM', JSON.stringify(updatedData));
    } catch (e) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: (e as Error).message,
        autoClose: 1500,
      });
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    // console.log('Done.');
  };

  // GET USER WISHLIST
  // const {data: onData, loading: onLoad} = useQuery<
  //   WishlistsByUserIDQuery,
  //   WishlistsByUserIDQueryVariables
  // >(wishlistsByUserID, {
  //   variables: {userID},
  //    pollInterval: 500,
  // });
  // const userWishList: any = onData?.wishlistsByUserID;

  // const containsValue = userWishList?.items.some(
  //   (obj: {title: string}) => obj?.title === title,
  // );
  // console.log(containsValue);

  // // CREATE WISHLIST
  // const [doCreateWishlist] = useMutation<
  //   CreateWishlistMutation,
  //   CreateWishlistMutationVariables
  // >(createWishlist);
  // const onCreateWishlist = async () => {
  //   try {
  //     const res = await doCreateWishlist({
  //       variables: {
  //         input: {
  //           basePrice,
  //           minOrderQty,
  //           SType: 'WISHLIST',
  //           title,
  //           productID: id,
  //           productImage,
  //           supplyCapacity,
  //           userID,
  //         },
  //       },
  //     });
  //     console.log('wish listed created', res);
  //   } catch (error) {
  //     Toast.show({
  //       type: ALERT_TYPE.WARNING,
  //       title: (error as Error).message,
  //       autoClose: 1500,
  //     });
  //   }
  // };

  useEffect(() => {
    let isCurrent = true;
    isCurrent && getBookmarkItem();
    // clearAll();
    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <Root>
      <ProductContext.Provider
        value={{
          storeProductId,
          savedProductItem,
          removeItem,
          removeProductItem,
        }}>
        {children}
      </ProductContext.Provider>
    </Root>
  );
};

export default ProductContextProvider;

export const useProductContext = () => useContext(ProductContext);
