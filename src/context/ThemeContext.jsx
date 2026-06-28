import { createContext, useContext, useState } from "react";
import { darkTheme, lightTheme } from "../theme/theme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{ theme, darkMode, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}