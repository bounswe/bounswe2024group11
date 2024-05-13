import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactElement,
  ReactNode,
} from "react";

export type User = {
  id: number;
  username: string;
  email: string;
  last_login: string | null;
  date_joined: string;
  fullname: string;
};

export const DEFAULT_USER: User = {
  id: 0,
  username: "mobile_test_user",
  email: "mobile_test_user@test.com",
  last_login: "0101010",
  date_joined: "0101010",
  fullname: "10101",
};

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = (props: { children: ReactNode }): ReactElement => {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider value={{ user, setUser }} {...props} />;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default UserProvider;
