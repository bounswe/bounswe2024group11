import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { LoggedinUser } from "../types/user";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    user: LoggedinUser | null;
  };
  onRegister?: (
    username: string,
    fullname: string,
    email: string,
    password: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: (navigation: any) => Promise<void>;
}

const TOKEN_KEY = "my-jwt";
const USER_KEY = "loggedin-user";
// export const API_URL = "http://54.247.125.93/api/v1";
export const API_URL = "http://10.0.2.2:8000/api/v1";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    user: LoggedinUser | null;
  }>({
    token: null,
    authenticated: null,
    user: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const user = await SecureStore.getItemAsync(USER_KEY);
      console.log("stored:", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
          user: user ? JSON.parse(user) : null,
        });
      }
    };
    loadToken();
  }, []);

  const register = async (
    username: string,
    fullname: string,
    email: string,
    password: string
  ) => {
    console.log(
      `Registering username: '${username}', fullname:'${fullname}' email: '${email}' and password: '${password}'`
    );
    try {
      return await axios.post(`${API_URL}/auth/register/`, {
        username,
        password,
        email,
        full_name: fullname,
      });
    } catch (e) {
      return { error: true, message: (e as any).response.data.msg };
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login/`, {
        username,
        password,
      });

      setAuthState({
        token: result.data.access,
        authenticated: true,
        user: result.data.user,
      });

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${result.data.access}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.access);
      await SecureStore.setItemAsync(
        USER_KEY,
        JSON.stringify(result.data.user)
      );

      return result;
    } catch (e) {
      return { error: true, message: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
      user: null,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
