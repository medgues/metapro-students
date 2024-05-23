/* eslint-disable react/prop-types */
import { useState } from "react";
import { createContext } from "react";

export const GlobalState = createContext();

export const GlobalStateContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const [isSuccess, setIsSuccess] = useState("");
  const [succuessMessage, setSuccuessMessage] = useState("");

  return (
    <GlobalState.Provider
      value={{
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        error,
        setError,
        isSuccess,
        setIsSuccess,
        succuessMessage,
        setSuccuessMessage,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};
