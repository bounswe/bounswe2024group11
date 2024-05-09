import type { User } from "@/schema/user";
import { createContext, useState } from "react";

export const UserContext = createContext<{
	user: User | null;
	setUser: (user: User | null) => void;
}>({ user: null, setUser: () => {} });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
