import React from "react";

import { Provider as PaperProvider } from "react-native-paper";

import Home from "./screens/Home";
import UserProvider from "./context/UserContext";
import ThemeProvider from "./context/ThemeContext";



export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <PaperProvider theme={{ version: 2 }}>
          <Home />
        </PaperProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
