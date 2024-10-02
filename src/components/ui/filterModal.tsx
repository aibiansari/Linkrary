import { useFilterButtonContext } from "@/contexts/useFilterButtonContext";
import { useFavoriteCardsContext } from "@/contexts/useFavoriteCardsContext";
import { AnimatePresence, motion } from "framer-motion";
import { cards } from "@/data/Cards";
import React from "react";

interface FilterProps {
  collection: boolean;
}

const FilterModal = ({ collection }: FilterProps) => {
  const { buttonState, setButtonState } = useFilterButtonContext();
  const { favCards } = useFavoriteCardsContext();
  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Filter logic that matches tags intelligently
  const filteredCards =
    search.length >= 2
      ? cards.filter(
          (card) =>
            (card.tags.some((tag) =>
              tag.toLowerCase().includes(search.toLowerCase())
            ) ||
              card.description.toLowerCase().includes(search.toLowerCase()) ||
              card.title.toLowerCase().includes(search.toLowerCase())) &&
            (!collection || favCards.includes(card.title))
        )
      : [];

  const handleClose = () => {
    setButtonState(false);
    setSearch(""); // Clear search input when modal is closed
  };

  React.useEffect(() => {
    if (buttonState && inputRef.current) {
      inputRef.current.focus();
    }
  }, [buttonState]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + K key press
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setButtonState(true);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }

      // Escape key press
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, translateY: 16 },
    visible: { opacity: 1, translateY: 0 },
  };

  return (
    <AnimatePresence>
      {buttonState && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="dark:bg-black/50 bg-black/20 fixed inset-0 z-50 grid place-items-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="dark:bg-body bg-white  text-black dark:text-white p-6 rounded-3xl w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10 max-h-[90vh] md:max-h-[70vh]">
              <h3 className="text-center pb-2 mx-4 mt-2 mb-6 border-b-neutral-200 dark:border-b-hover border-b-2 flex items-baseline justify-between">
                <svg
                  className="w-5 h-5 translate-y-1 text-black dark:text-neutral-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder={
                    collection ? "Search in Collection" : "Search on Linkrary"
                  }
                  value={search}
                  ref={inputRef}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-1.5 pl-4 placeholder:italic text-black dark:text-neutral-200 bg-white dark:bg-body border border-none rounded-lg focus:outline-none focus:border-neutral-600"
                />
              </h3>

              {search === "" ? (
                <p className="text-center h-screen text-neutral-500 italic py-4">
                  Start typing to search tools by keywords or categories.
                </p>
              ) : search.length < 2 ? (
                <p className="text-center h-screen text-neutral-500 italic py-4">
                  Please enter at least 2 characters to search.
                </p>
              ) : filteredCards.length === 0 ? (
                <p className="text-center h-screen text-neutral-500 italic py-4">
                  No matching apps found for {search}.
                </p>
              ) : (
                <motion.ul
                  className="h-screen space-y-3 p-4 pb-52 md:pb-80"
                  style={{ scrollbarWidth: "none", overflowY: "scroll" }}
                  initial="hidden"
                  animate="visible"
                  variants={listVariants}
                >
                  {filteredCards.map((card, index) => (
                    <motion.a
                      key={index}
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative bg-stone-100 dark:bg-element rounded-lg shadow-md p-4 flex items-center space-x-4 hover:bg-white dark:hover:bg-body hover:shadow-none hover:ring-1 ring-stone-300 dark:ring-element shadow-black/10 dark:shadow-black/40 transition-all duration-300 group"
                      variants={cardVariants}
                      transition={{ duration: 0.3, ease: "easeIn" }}
                    >
                      <picture>
                        <img
                          src={card.image}
                          alt={card.title}
                          loading="lazy"
                          draggable="false"
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </picture>
                      <div className="flex-1">
                        <h3 className="text-xl font-sans text-hover dark:text-white font-semibold">
                          {card.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 pr-3">
                          {card.description}
                        </p>
                      </div>
                      <svg
                        className="w-6 h-6 absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-hover dark:text-white"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                      >
                        <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                      </svg>
                    </motion.a>
                  ))}
                </motion.ul>
              )}
            </div>
            <div className="hidden md:block absolute bg-white dark:bg-body h-6 w-full bottom-0 left-0 z-50"></div>
            <div
              onClick={handleClose}
              className="block text-center font-bold p-2 md:hidden absolute bg-neutral-900 hover:bg-neutral-800 transition-colors duration-300 cursor-pointer h-10 w-full bottom-0 left-0 z-50"
            >
              Close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterModal;
