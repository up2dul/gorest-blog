import { ConfigProvider, theme } from "antd";
import { type ReactNode, createContext, useContext, useState } from "react";

type AntdConfigContextType = {
  theme: "light" | "dark";
  setTheme: (newTheme: "light" | "dark") => void;
};

const AntdConfigContext = createContext<AntdConfigContextType | null>(null);

export const AntdConfigProvider = ({ children }: { children: ReactNode }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const storedTheme =
    localStorage.getItem("theme") === "dark" ? "dark" : "light";
  const [themeState, setThemeState] = useState<"light" | "dark">(() => {
    return storedTheme === "dark" ? "dark" : "light";
  });

  const handleSetThemeMode = (newTheme: "light" | "dark") => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <AntdConfigContext.Provider
      value={{
        theme: themeState,
        setTheme: handleSetThemeMode,
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
