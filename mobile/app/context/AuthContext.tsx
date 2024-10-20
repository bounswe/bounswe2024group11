import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import { useNavigation } from "@react-navigation/native";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (username: string, fullname: string, email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: (navigation: any) => Promise<void>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://api.developbetterapps.com';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log('stored:', token);

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    }
    loadToken();
  }, []);

  const register = async (username: string, fullname: string, email: string, password: string) => {
    console.log(`Registering username: '${username}', fullname:'${fullname}' email: '${email}' and password: '${password}'`);
    try {
      const result = await axios.post(`${API_URL}/users`, { email, password });
      
      setAuthState({
        token: result.data.token,
        authenticated: true,
      });
  
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
  
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
  
      return result;
  
    } catch (e) {
      return { error: true, message: (e as any).response.data.msg };
    }
  };
  

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth`, { email, password });

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      return result;

    } catch (e) {
      return { error: true, message: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      axios.defaults.headers.common["Authorization"] = '';
  
      setAuthState({
        token: null,
        authenticated: false,
      });
  
    } catch (error) {
      console.error("Failed to logout:", error);
      throw new Error("Logout failed.");
    }
  };
  


  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
