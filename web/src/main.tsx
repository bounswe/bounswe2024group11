import React from "react";
import ReactDOM from "react-dom/client";
import { theme } from "./theme";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<MantineProvider classNamesPrefix="znt" theme={theme}>
			<UserProvider>
				<RouterProvider router={router} />
			</UserProvider>
		</MantineProvider>
	</React.StrictMode>,
);
