import React, { createContext, useState, useContext, Dispatch, SetStateAction, ReactElement, ReactNode } from "react";


type UserContextType = {
    user: { [key: string]: any };
    setUser: Dispatch<SetStateAction<{ [key: string]: any }>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within an UserProvider");
    }
    return context;
}

const UserProvider = (props: { children: ReactNode }): ReactElement => {
    const [user, setUser] = useState<{ [key: string]: any }>({
        isLogged: false,
        username: "",
        email: "",
        token: "",
    });

    return <UserContext.Provider {...props} value={{ user, setUser }} />;
};

export { useUser };
export default UserProvider;