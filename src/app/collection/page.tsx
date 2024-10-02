"use client";
import Cards from "@/components/ui/Cards";
import CategoryModal from "@/components/ui/categoryModal";
import { useCategoryContext } from "@/contexts/useCategoryContext";
import { useThemeContext } from "@/contexts/useThemeContext";
import FilterModal from "@/components/ui/filterModal";
import Navbar from "@/components/ui/navbar";
import HorizontalScroll from "@/components/ui/ScrollX";
import React from "react";
import Link from "next/link";

const Collection: React.FC = () => {
  const { theme } = useThemeContext();
  const { setSelectedCategory } = useCategoryContext();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedCategory("All Apps");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div
        className={`flex flex-col items-center min-h-screen pb-4 bg-white dark:bg-body transition-colors duration-500 ${
          theme === "dark" ? "dark" : ""
        }`}
      >
        <FilterModal collection={true} />
        <CategoryModal collection={true} />
        <Navbar page="collection" />
        <HorizontalScroll />
        <div className="max-w-screen-2xl mt-16 w-full">
          <div className="flex mt-2 items-center md:gap-3">
            <h1 className="p-8 text-3xl md:text-4xl text-black dark:text-white font-bold transition-colors duration-500">
              Collection
            </h1>
            <Link
              href="/"
              className="text-sm md:text-base py-2 px-3 bg-black dark:bg-neutral-800 dark:hover:bg-element transition-colors duration-500 rounded-full text-neutral-200 font-semibold"
            >
              Go to Home
            </Link>
          </div>
          <Cards collection={true} />
        </div>
      </div>
      <div className="border-b-4 border-white dark:border-body"></div>
    </div>
  );
};

export default Collection;
