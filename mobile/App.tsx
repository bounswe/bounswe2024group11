import React from "react";

import { View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import Home from "./screens/Home";
import UserProvider from "./context/UserContext";
import ThemeProvider from "./context/ThemeContext";
import { styles } from "./components/Styles";

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <PaperProvider theme={{ version: 2 }}>
          <View style={styles.container}>
            <Home />
          </View>
        </PaperProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
