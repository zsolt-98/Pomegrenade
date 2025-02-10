/* eslint-disable */ // temporary

import axios from "axios";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AppContextType {
  backendUrl: string;
  isLoggedin: boolean;
  setIsLoggedin: (value: boolean) => void;
  userData: false | { name: string };
  setUserData: (value: false | { name: string }) => void;
  getUserData: () => void;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const defaultContextValue: AppContextType = {
  backendUrl,
  isLoggedin: false,
  setIsLoggedin: () => {},
  userData: false,
  setUserData: () => {},
  getUserData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState<false | { name: string }>(false);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
      }
    } catch (error) {
      console.log(error); // Temporary
      toast.error("An error occurred");
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      console.log(error); // Temporary
      toast.error("An error has occurred.");
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
