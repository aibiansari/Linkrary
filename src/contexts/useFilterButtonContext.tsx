"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type FilterButtonContextType = {
  buttonState: boolean;
  setButtonState: React.Dispatch<React.SetStateAction<boolean>>;
};

// Initialize the context with the correct type or `null`
export const FilterButtonContext =
  createContext<FilterButtonContextType | null>(null);

export const FilterButtonProvider = ({ children }: { children: ReactNode }) => {
  const [buttonState, setButtonState] = useState(false);

  return (
    <FilterButtonContext.Provider value={{ buttonState, setButtonState }}>
      {children}
    </FilterButtonContext.Provider>
  );
};

export const useFilterButtonContext = () => {
  const context = useContext(FilterButtonContext);
  if (!context) {
    throw new Error(
      "useFilterButtonContext must be used within a FilterButtonProvider"
    );
  }
  return context;
};
