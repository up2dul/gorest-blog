import { ConfigProvider, message, theme } from "antd";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AntdConfigContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const AntdConfigContext = createContext<AntdConfigContextType | null>(null);

export const AntdConfigProvider = ({ children }: { children: ReactNode }) => {
  const [contextHolder] = message.useMessage();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const storedTheme =
    localStorage.getItem("theme") === "dark" ? "dark" : "light";
  const [themeState, setThemeState] = useState<"light" | "dark">(() => {
    return storedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    if (themeState === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeState]);

  const handleToggleThemeMode = () => {
    setThemeState(prev => (prev === "dark" ? "light" : "dark"));
    localStorage.setItem("theme", storedTheme === "dark" ? "light" : "dark");
  };

  return (
    <AntdConfigContext.Provider
      value={{
        theme: themeState,
        toggleTheme: handleToggleThemeMode,
      }}
    >
      <ConfigProvider
        theme={{
          algorithm: themeState === "dark" ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </AntdConfigContext.Provider>
  );
};

export const useAntdConfig = () => {
  const context = useContext(AntdConfigContext);
  if (!context) {
    throw new Error("useAntdConfig must be used within an AntdConfigProvider");
  }
  return context;
};
