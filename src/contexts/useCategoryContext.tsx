"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context value
type CategoryContextType = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  categoryToScroll: string | null;
  setCategoryToScroll: React.Dispatch<React.SetStateAction<string | null>>;
};

// Initialize the context with the correct type
export const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Apps");
  const [categoryToScroll, setCategoryToScroll] = useState<string | null>(null);

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        categoryToScroll,
        setCategoryToScroll,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};
