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
};

export type UserType = {
  refresh: string;
  token: string; // only this is useful
  user: User;
};

type UserContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = (props: { children: ReactNode }): ReactElement => {
  const [user, setUser] = useState<UserType | null>(null);

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
