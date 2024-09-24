import React, { useState } from "react";

import { View } from "react-native";

import type { StackNavigationProp } from "@react-navigation/stack";

import Login from "./Login";
import Signup from "./Signup";
import type { RootStackParamList } from "../components/Types";
import { styles } from "../components/Styles";

type AuthNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;

const Auth = ({ navigation }: { navigation: AuthNavigationProp }) => {
	const [login, setLogin] = useState(true);
	return (
		<View style={styles.container}>
			{login ? (
				<Login navigation={navigation} toggle={setLogin} />
			) : (
				<Signup navigation={navigation} toggle={setLogin} />
			)}
		</View>
	);
};

export default Auth;
