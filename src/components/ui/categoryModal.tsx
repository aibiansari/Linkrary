import { useCategoryModalContext } from "@/contexts/useCategoryModalContext";
import { useCategoryContext } from "@/contexts/useCategoryContext";
import { AnimatePresence, motion } from "framer-motion";
import { categories } from "@/data/Categories";
import React from "react";

interface CatProps {
  collection: boolean;
}

const CategoryModal = ({ collection }: CatProps) => {
  const { buttonState, setButtonState } = useCategoryModalContext();
  const { setSelectedCategory, setCategoryToScroll } = useCategoryContext();

  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Filter logic that matches tags intelligently
  const filteredCats =
    search.length >= 2
      ? categories.filter((category) =>
          category.name.toLowerCase().includes(search.toLowerCase())
        )
      : categories; // Show all categories when search is less than 2

  const handleClose = () => {
    setButtonState(false);
    setSearch(""); // Clear search input when modal is closed
  };

  const handleClick = (categoryName: string) => {
    setButtonState(false);
    setSelectedCategory(categoryName);
    setCategoryToScroll(categoryName);
    setSearch(""); // Clear search input when modal is closed
  };

  React.useEffect(() => {
    if (buttonState && inputRef.current) {
      inputRef.current.focus();
    }
  }, [buttonState]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, translateY: 8 },
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
            className="dark:bg-body bg-white text-black dark:text-white p-6 rounded-3xl w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10 max-h-[90vh] md:max-h-[70vh]">
              <h3 className="text-center pb-2 mx-4 mt-2 mb-3 border-b-neutral-200 dark:border-b-hover border-b-2 flex items-baseline justify-between">
                <svg
                  className="w-5 h-5 translate-y-1 text-black dark:text-neutral-500"
                  width="24"
                  height="24"
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
                  placeholder="Search Categories"
                  value={search}
                  ref={inputRef}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-1.5 pl-4 placeholder:italic text-black dark:text-neutral-200 bg-white dark:bg-body border border-none rounded-lg focus:outline-none"
                />
              </h3>

              {filteredCats.length === 0 ? (
                <p className="text-center h-screen text-neutral-500 italic py-4">
                  No matching categories found for {search}.
                </p>
              ) : (
                <motion.ul
                  className="h-screen font-sans space-y-3 p-4 pb-52 md:pb-80"
                  style={{ scrollbarWidth: "none", overflowY: "scroll" }}
                  initial="hidden"
                  animate="visible"
                  variants={listVariants}
                >
                  {filteredCats.map((category, index) => (
                    <motion.li
                      key={index}
                      onClick={() => handleClick(category.name)}
                      className="p-2 flex items-center justify-between hover:bg-stone-200 dark:hover:bg-neutral-800 rounded-lg cursor-pointer transition-all duration-300"
                      variants={cardVariants}
                      transition={{ duration: 0.3, ease: "easeIn" }}
                    >
                      <div className="flex items-center gap-3">
                        {category.icon}
                        {category.name}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {!collection && category.count}
                      </div>
                    </motion.li>
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

export default CategoryModal;
