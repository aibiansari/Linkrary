import { useFilterButtonContext } from "@/contexts/useFilterButtonContext";
import { useCategoryContext } from "@/contexts/useCategoryContext";
import Dropdown from "./dropdown";
import Link from "next/link";

type PageProps = {
  page: "home" | "collection" | "about";
};

const Navbar = ({ page = "home" }: PageProps) => {
  const { buttonState, setButtonState } = useFilterButtonContext();
  const { setSelectedCategory, setCategoryToScroll } = useCategoryContext();

  const handleClick = () => {
    setSelectedCategory("All Apps");
    setCategoryToScroll("All Apps");
  };

  return (
    <nav
      className={`bg-white dark:bg-body fixed top-0 h-16 w-screen z-20 max-w-screen-2xl text-black dark:text-white px-4 md:px-8 flex flex-wrap items-center justify-between transition-colors duration-300 ${
        page === "about"
          ? "border-b-[1px] border-neutral-400 dark:border-neutral-800"
          : ""
      }`}
    >
      <div className="flex-shrink-0 w-12 md:w-52 flex items-center mb-2 md:mb-0">
        <Link
          onClick={handleClick}
          href="/"
          className="flex items-center gap-2"
        >
          <picture>
            <img
              src="./logo.svg"
              alt="Linkrary Logo"
              loading="lazy"
              draggable={false}
              className="w-6 h-6 invert dark:invert-0 transition-all duration-300"
            />
          </picture>
          <span className="hidden md:block text-2xl font-bold transition-colors duration-100">
            Linkrary
          </span>
        </Link>
      </div>

      <div className="flex flex-grow justify-center mb-2 md:mb-0">
        {page === "home" || page === "collection" ? (
          // Search section
          <div
            onClick={() => setButtonState(!buttonState)}
            className="relative bg-stone-200 dark:bg-element flex items-center justify-start gap-4 w-56 md:w-72 xl:w-96 p-1 md:p-2 rounded-full hover:bg-neutral-300 dark:hover:bg-hover transition-colors duration-100 ease-in cursor-pointer"
          >
            <svg
              className="w-5 h-5 text-black dark:text-gray-300 ml-2 transition-colors duration-100"
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
            <span className="text-black dark:text-neutral-500 italic font-medium transition-colors duration-100">
              {page === "home"
                ? "Search on Linkrary..."
                : page === "collection"
                ? "Search in Collection..."
                : ""}
            </span>
            <div className="absolute hidden lg:flex right-4 items-center gap-1.5 text-neutral-500 text-sm">
              <kbd className="ring-neutral-400 dark:ring-neutral-600 ring-1 px-1 rounded transition-colors duration-300">
                Ctrl
              </kbd>
              <kbd className="ring-neutral-400 dark:ring-neutral-600 ring-1 px-1 rounded transition-colors duration-300">
                K
              </kbd>
            </div>
          </div>
        ) : page === "about" ? (
          // About section with links
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="hover:text-black dark:hover:text-neutral-300 text-neutral-800 dark:text-white hover:-translate-y-0.5 transition-all duration-300 font-semibold text-lg"
            >
              Discover
            </Link>
            <Link
              href="/collection"
              className="hover:text-black dark:hover:text-neutral-300 text-neutral-800 dark:text-white hover:-translate-y-0.5 transition-all duration-300 font-semibold text-lg"
            >
              Collection
            </Link>
          </div>
        ) : null}
      </div>

      <div className="flex w-12 md:w-52 md:space-x-4 mb-2 md:mb-0">
        <a
          href="https://github.com/aibiansari/Linkrary"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center text-black dark:text-white dark:hover:text-neutral-300 transition-colors duration-300 ease-in-out group"
        >
          <svg
            fill="currentColor"
            className="w-5 h-5 text-black dark:text-white mr-1.5 transition-colors duration-300"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
          <span className="font-sans">GitHub Repo</span>
          <svg
            fill="currentColor"
            className="w-8 h-8 translate-y-[1px] transition-transform duration-300 ease-linear group-hover:-rotate-45"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
            />
          </svg>
        </a>
        <Dropdown />
      </div>
    </nav>
  );
};

export default Navbar;
