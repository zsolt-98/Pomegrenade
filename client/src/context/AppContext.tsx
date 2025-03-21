/* eslint-disable */ // temporary

import axios from "axios";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AppContextType {
  backendUrl: string;
  isLoggedin: boolean;
  setIsLoggedin: (value: boolean) => void;
  isAuthLoading: boolean;

  userData: false | { name: string; isAccountVerified: boolean };
  setUserData: (
    value: false | { name: string; isAccountVerified: boolean },
  ) => void;
  getUserData: () => void;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const defaultContextValue: AppContextType = {
  backendUrl,
  isLoggedin: false,
  isAuthLoading: true,
  setIsLoggedin: () => {},
  userData: false,
  setUserData: () => {},
  getUserData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  axios.defaults.withCredentials = true;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userData, setUserData] = useState<
    false | { name: string; isAccountVerified: boolean }
  >(false);

  const getAuthState = async () => {
    try {
      setIsAuthLoading(true);
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      console.log(error); // Temporary
      toast.error("An error has occurred.");
    } finally {
      setIsAuthLoading(false);
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
    isAuthLoading,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>
      <div className="flex min-h-screen flex-col">{children}</div>
    </AppContext.Provider>
  );
};
