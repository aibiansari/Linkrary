/* eslint-disable @next/next/no-img-element */
"use client";
import { useCategoryContext } from "@/contexts/useCategoryContext";
import { useFavoriteCardsContext } from "@/contexts/useFavoriteCardsContext";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { cards } from "@/data/Cards";

interface CardsProps {
  collection: boolean;
}

const Cards = ({ collection }: CardsProps) => {
  const { selectedCategory } = useCategoryContext();
  const [visibleCards, setVisibleCards] = useState<string[]>([]);
  const { favCards, setFavCards } = useFavoriteCardsContext();
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [showSave, setShowSave] = useState(false);

  // Prevent rendering until after hydration
  useEffect(() => {
    if (collection) {
      setHydrated(true); // Set hydration to true only for collection
    }
  }, [collection]);

  // Fetch favorites from localStorage or initialize it
  useEffect(() => {
    if (collection && typeof window !== "undefined") {
      const collection = JSON.parse(
        window.localStorage.getItem("Collection") || "[]"
      );
      setFavCards(collection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  const handleSaveToggle = (title: string) => {
    const isFavorite = favCards.includes(title);
    const delCard = title;
    setFavCards((prevFavCards) => {
      const updatedFavCards = isFavorite
        ? prevFavCards.filter((fav) => fav !== title)
        : [...prevFavCards, title];
      return updatedFavCards;
    });
    if (isFavorite) {
      toast.info(`${title} removed from collection`, {
        action: {
          label: "Undo",
          onClick: () => {
            setFavCards((prevFavCards) => {
              if (!prevFavCards.includes(delCard)) {
                const updatedFavCards = [...prevFavCards, delCard];
                return updatedFavCards;
              }
              return prevFavCards;
            });
          },
        },
      });
    } else {
      toast.success(`${title} added to collection`);
    }
  };

  let filteredCards =
    selectedCategory === "All Apps"
      ? cards
      : cards.filter((card) => card.categories.includes(selectedCategory));

  // Filter further to include only favorite cards
  if (collection) {
    filteredCards = filteredCards.filter((card) =>
      favCards.includes(card.title)
    );
  }

  useEffect(() => {
    const currentRefs = cardRefs.current; // Copy refs for the effect

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = (entry.target as HTMLElement).dataset.index;
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...prev, cardIndex!]);
          } else {
            setVisibleCards((prev) => prev.filter((i) => i !== cardIndex));
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the card is visible
    );

    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Cleanup observer on unmount
    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [filteredCards]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSave(true);
    }, 100);
    return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts
  }, []);

  if (!hydrated && collection) {
    return null; // Prevent rendering on the server
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 px-8 py-2">
      {filteredCards.length === 0 ? (
        <p className="text-center text-neutral-600 italic dark:text-neutral-400 col-span-full">
          No favorite cards available. Add some to your{" "}
          {selectedCategory === "All Apps"
            ? "collection"
            : `${selectedCategory} collection`}
          !
        </p>
      ) : (
        filteredCards.map((card, index) => (
          <div key={index} className="relative group font-sans">
            <a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-index={index.toString()}
              className={`bg-stone-100 dark:bg-element rounded-lg shadow-md p-4 flex items-center space-x-4 dark:hover:bg-hover 
        ${
          visibleCards.includes(index.toString())
            ? "opacity-100"
            : "opacity-0 translate-y-5"
        } 
        group-hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-black/40 hover:shadow-black/20 shadow-black/30 
        dark:shadow-black/50 transition-all duration-300`}
            >
              <img
                src={card.image}
                alt={card.title}
                draggable="false"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="overflow-hidden -translate-y-0.5">
                <h1 className="text-xl text-hover dark:text-white font-semibold transition-colors duration-300">
                  {card.title}
                </h1>
                <p
                  title={card.description}
                  className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2"
                >
                  {card.description}
                </p>
              </div>
            </a>
            {showSave && (
              <span
                title={
                  favCards?.includes(card.title)
                    ? "Remove from Collection"
                    : "Add to Collection"
                }
                className="absolute top-2 right-2"
              >
                <svg
                  fill="currentColor"
                  className="cursor-pointer text-black dark:text-white w-5 h-5 opacity-100 md:opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 hover:scale-105 focus:scale-75 transition-all duration-300"
                  viewBox="0 0 16 16"
                  onClick={() => handleSaveToggle(card.title)}
                >
                  {favCards.includes(card.title) ? (
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                  ) : (
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                  )}
                </svg>
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Cards;
