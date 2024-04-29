import type { User } from "@/schema/user";
import type React from "react";
import { createContext, useState } from "react";

const UserContext = createContext<User | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);

	const updateUser = (newUser: User) => {
		setUser(newUser);
	};

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
