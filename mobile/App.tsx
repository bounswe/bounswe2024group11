import React, { version } from "react";

import { Provider as PaperProvider } from "react-native-paper";

import Home from "./screens/Home";
import Login from "./screens/Login";
import UserProvider from "./context/UserContext";

export default function App() {
  return (
    <UserProvider>
      <PaperProvider theme={{version: 2}}>
        <Home />
      </PaperProvider>
    </UserProvider>
  );
}


