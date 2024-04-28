import {
	Container,
	MantineProvider,
	Button,
	Flex,
	Input,
	useMantineTheme,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { Link } from "react-router-dom";
import { href } from "../router";

export const Home = () => {
	return (
		<Container>
			<Link to={href({ path: "/login" })}> Log In </Link>
		</Container>
	);
};
