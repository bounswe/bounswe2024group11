import React, { createContext, useContext } from "react";

type Theme = {
  colors: {
    [key: string]: string[];
  };
};

const DEFAULT_THEME: Theme = {
  colors: {
    neutral: [
      "#FFFFFF",
      "#F6F8FA",
      "#E2E4EA",
      "#CCD0D6",
      "#858C99",
      "#515867",
      "#303540",
      "#1F232E",
      "#121823",
      "#090D15",
    ],
    cyan: ["#E7FBFF", "#B6F1FF", "#00BCEE", "#0089B1", "#004667"],
    orange: ["#FFF3EA", "#FFD8BE", "#FF7300", "#D14B00", "#772F00"],
    green: ["#ECFAF6", "#C0F7E4", "#00CA8F", "#00A272", "#006646"],
    red: ["#FFECF0", "#FFC7D2", "#F4003A", "#BF0034", "#7C001E"],
    blue: ["#EAF1FF", "#BDD7FF", "#295EFF", "#1C3FAD", "#112768"],
  },
};

const ThemeContext = createContext<Theme>(DEFAULT_THEME);

const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

const ThemeProvider = (props: {
  children: React.ReactNode;
}): React.ReactNode => {
  return <ThemeContext.Provider value={DEFAULT_THEME} {...props} />;
};

export { useTheme };

export default ThemeProvider;
