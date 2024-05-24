import { createContext, useContext } from "react";
import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

export default function DarkModeContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    "DARK-MODE",
    window.matchMedia(`(prefers-color-scheme:dark)`).matches
  );
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);
  function handleDarkMode() {
    setIsDarkMode((darkMode) => !darkMode);
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, handleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("your created context used outside context porvider");
  return context;
}
//window.matchMedia('(prefers-color-scheme:dark)').matches
