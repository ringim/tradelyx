import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

type ProductContextType = {
  storeProductId: Function;
  removeProductItem: Function;
  savedProductItem: string;
};

const ProductContext = createContext<ProductContextType>({
  storeProductId: Function,
  removeProductItem: Function,
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

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    // console.log('Done.');
  };

  useEffect(() => {
    getBookmarkItem();
    // clearAll();
  }, []);

  return (
    <Root>
      <ProductContext.Provider
        value={{storeProductId, savedProductItem, removeProductItem}}>
        {children}
      </ProductContext.Provider>
    </Root>
  );
};

export default ProductContextProvider;

export const useProductContext = () => useContext(ProductContext);
