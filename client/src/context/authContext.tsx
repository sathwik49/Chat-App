import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import request from "../request/request";

type AuthUserType = {
  message: string;
  success: boolean;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContext = createContext<{
  authUser: AuthUserType | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUserType | null>>;
  isLoading: boolean;
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [isLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await axios.get(`${request.basrUrl}/auth/me`);
        setMessage(res.data.message),setSuccess(res.data.success)
        setAuthUser(res.data)
      } catch (error: any) {
        //toast.error(error.response.data.message)
        setMessage(error.response.data.message),setSuccess(error.response.data.success)
      }
    };

    fetchAuthUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
