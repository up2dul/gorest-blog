import { Unauthorized } from "@/components/layout/unauthorized";
import type { UserAuth } from "@/lib/types";
import {
  clearUserAuth,
  getUserAuth,
  setUserAuth,
} from "@/services/auth-storage";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  userAuth: UserAuth | null;
  setUserAuth: (userAuth: UserAuth) => void;
  clearUserAuth: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userAuthState, setUserAuthState] = useState<UserAuth | null>(
    getUserAuth(),
  );
  const [isMounted, setIsMounted] = useState(false);

  // avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSetUserAuth = (newUserAuth: UserAuth) => {
    setUserAuth(newUserAuth);
    setUserAuthState(newUserAuth);
  };

  const handleClearUserAuth = () => {
    clearUserAuth();
    setUserAuthState(null);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        userAuth: userAuthState,
        setUserAuth: handleSetUserAuth,
        clearUserAuth: handleClearUserAuth,
      }}
    >
      {/* conditionally render children based on whether userAuth is null or not */}
      {Boolean(userAuthState?.token) ? children : <Unauthorized />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
