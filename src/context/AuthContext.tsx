import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from 'react';

import {HubCallback} from '@aws-amplify/core';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {Auth, Hub} from 'aws-amplify';

type UserType = CognitoUser | null | undefined;

type AuthContextType = {
  authUser: UserType;
  userID: string;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  authUser: undefined,
  userID: '',
});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [authUser, setAuthUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = async () => {
    try {
      setIsLoading(true);
      const userToken = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setAuthUser(userToken);
    } catch (error) {
      setAuthUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  useEffect(() => {
    const listener: HubCallback = data => {
      const {event} = data.payload;
      if (event === 'signOut') {
        setAuthUser(null);
      }
      if (event === 'signIn') {
        isAuthenticated();
      }
    };
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        authUser,
        userID: authUser?.attributes?.sub || '',
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);