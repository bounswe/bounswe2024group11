// Description: The schema for the user.
export type User = {
	id: number;
	username: string;
	email: string;
	date_joined: string | null;
	last_login: string | null;
};

// Login
export type LoginPayload = {
	username: string;
	password: string;
};

export type LoginResponse = LoginSuccess | LoginError;

export type LoginSuccess = {
	token: string;
	user: User;
};

export type LoginError = {
	message: string;
};

// Register
export type RegisterPayload = {
	fullname: string;
	username: string;
	email: string;
	password: string;
};

export type RegisterResponse = RegisterSuccess | RegisterError;

export type RegisterSuccess = {
	token: string;
	user: User;
};

export type RegisterError = {
	res: string;
};
