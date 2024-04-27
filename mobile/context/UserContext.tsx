import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactElement,
  ReactNode,
} from "react";

type User = {
  id: number;
  username: string;
  email: string;
  lastLogin: string | null;
  dateJoined: string;
};

export const DEFAULT_USER: User = {
  id: 0,
  username: "mobile_test_user",
  email: "mobile_test_user@test.com",
  lastLogin: "0101010",
  dateJoined: "0101010",
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
