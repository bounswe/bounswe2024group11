export type User = {
	id: number;
	username: string;
	email: string;
	password: string;
	date_joined: string;
	last_login: string | null;
};
export type UserCreate = {
	username: string;
	email: string;
	password: string;
};

export type UserLogin = {
	username: string;
	password: string;
};

export type UserResponse = {
	token: string;
	user: User;
};
