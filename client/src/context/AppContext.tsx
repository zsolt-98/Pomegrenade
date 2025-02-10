/* eslint-disable */ // temporary

import { createContext, PropsWithChildren, useState } from "react";

interface AppContextType {
  backendUrl: string;
  isLoggedin: boolean;
  setIsLoggedin: (value: boolean) => void;
  userData: boolean;
  setUserData: (value: boolean) => void; // temporary any
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const defaultContextValue: AppContextType = {
  backendUrl,
  isLoggedin: false,
  setIsLoggedin: () => {},
  userData: false,
  setUserData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
