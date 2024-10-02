"use client";
import { useEffect, useRef } from "react";
import { useCategoryModalContext } from "@/contexts/useCategoryModalContext";
import { useCategoryContext } from "@/contexts/useCategoryContext";
import { categories } from "@/data/Categories";

const HorizontalScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { buttonState, setButtonState } = useCategoryModalContext();
  const {
    selectedCategory,
    setSelectedCategory,
    categoryToScroll,
    setCategoryToScroll,
  } = useCategoryContext();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (name: string) => {
    setSelectedCategory(name);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const index = categories.findIndex((category) => category.name === name);
    if (index !== -1 && categoryRefs.current[index] && scrollRef.current) {
      const categoryButton = categoryRefs.current[index];
      const { left, right, width } = categoryButton!.getBoundingClientRect();
      const { left: containerLeft, right: containerRight } =
        scrollRef.current.getBoundingClientRect();

      if (left < containerLeft) {
        scrollRef.current.scrollBy({
          left: left - containerLeft - width / 2,
          behavior: "smooth",
        });
      } else if (right > containerRight) {
        scrollRef.current.scrollBy({
          left: right - containerRight + width / 2,
          behavior: "smooth",
        });
      }
    }
  };

  // Scroll to the selected category when categoryToScroll is updated
  useEffect(() => {
    if (categoryToScroll) {
      handleCategoryClick(categoryToScroll);
      setCategoryToScroll(null); // Reset after scrolling
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryToScroll, setCategoryToScroll]);

  return (
    <div className="sticky top-16 z-10 bg-white dark:bg-body border-y-[1px] border-neutral-300 dark:border-neutral-800 transition-colors duration-500">
      <div className="relative flex items-center w-[96vw] md:w-[98vw] lg:w-[99vw] max-w-screen-2xl py-1.5 md:py-0 md:px-4">
        <button
          onClick={() => setButtonState(!buttonState)}
          className="hidden md:flex py-2 px-3 items-center justify-center gap-2 bg-neutral-200 dark:bg-element hover:bg-neutral-300 dark:hover:bg-hover transition-colors duration-300 rounded-full text-neutral-900 dark:text-neutral-200 font-semibold"
        >
          <svg
            width="16"
            height="16"
            fill="currentColor"
            className="text-neutral-800 dark:text-neutral-200 -translate-y-[1px] transition-colors duration-300"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"
            />
          </svg>
          Filters
        </button>
        <div className="hidden md:block h-9 w-[1.4px] shrink-0 bg-neutral-300 dark:bg-element ml-5 mr-1"></div>
        <button
          onClick={() => scroll("left")}
          className="hidden md:block p-2"
          aria-label="Scroll Left"
        >
          <svg
            fill="currentColor"
            className="w-10 h-10 p-1.5 text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-element transition-all duration-200 rounded-full"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
            />
          </svg>
        </button>
        <div
          ref={scrollRef}
          className="flex font-sans overflow-x-auto text-sm md:text-base space-x-2 md:space-x-6"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((category, index) => (
            <button
              key={index}
              ref={(el) => {
                categoryRefs.current[index] = el;
              }}
              className={`flex items-center gap-1.5 py-2 px-3 rounded-full transition-colors duration-300 whitespace-nowrap ${
                selectedCategory === category.name
                  ? "bg-neutral-300 dark:bg-hover text-black dark:text-neutral-300"
                  : "text-neutral-800 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-hover"
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="hidden md:block p-2"
          aria-label="Scroll Right"
        >
          <svg
            fill="currentColor"
            className="w-10 h-10 p-1.5 text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-element transition-all duration-200 rounded-full"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HorizontalScroll;
