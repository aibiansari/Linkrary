"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the shape of the context value
type FavoriteCardsContextType = {
  favCards: string[];
  setFavCards: React.Dispatch<React.SetStateAction<string[]>>;
};

// Initialize the context with the correct type
export const FavoriteCardsContext =
  createContext<FavoriteCardsContextType | null>(null);

export const FavoriteCardsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [favCards, setFavCards] = useState<string[]>(() => {
    // Fetch favorites from localStorage or initialize it
    if (typeof window !== "undefined") {
      return JSON.parse(window.localStorage.getItem("Collection") || "[]");
    }
    return [];
  });

  // Update localStorage whenever favCards changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("Collection", JSON.stringify(favCards));
    }
  }, [favCards]);

  return (
    <FavoriteCardsContext.Provider value={{ favCards, setFavCards }}>
      {children}
    </FavoriteCardsContext.Provider>
  );
};

export const useFavoriteCardsContext = () => {
  const context = useContext(FavoriteCardsContext);
  if (!context) {
    throw new Error(
      "useFavoriteCardsContext must be used within a FavoriteCardsProvider"
    );
  }
  return context;
};
