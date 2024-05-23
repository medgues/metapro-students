/* eslint-disable react/prop-types */
import { useState } from "react";
import { createContext } from "react";

// Create a context for global state management
export const GlobalState = createContext();

export const GlobalStateContextProvider = ({ children }) => {
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(false);

  // State to manage error status
  const [isError, setIsError] = useState(false);
  // State to store the error message
  const [error, setError] = useState("");

  // State to manage success status
  const [isSuccess, setIsSuccess] = useState("");
  // State to store the success message
  const [succuessMessage, setSuccuessMessage] = useState("");

  return (
    // Provide the state and setters to the rest of the app
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
