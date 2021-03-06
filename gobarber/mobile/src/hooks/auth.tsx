import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface User {
  id: string;
  avatar_url: string;
  email: string;
  name: string;
}

interface IAuthState {
  token: string;
  user: User;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDataFromAS = async (): Promise<void> => {
      const [token, user] = await AsyncStorage.multiGet(['@token', '@user']);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer: ${token[1]}`;

        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }
      setLoading(false);
    };
    loadDataFromAS();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@token', token],
      ['@user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer: ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@token', '@user']);

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
