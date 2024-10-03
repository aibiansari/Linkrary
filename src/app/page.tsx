"use client";
import Cards from "@/components/ui/Cards";
import CategoryModal from "@/components/ui/categoryModal";
import { useCategoryContext } from "@/contexts/useCategoryContext";
import FilterModal from "@/components/ui/filterModal";
import Navbar from "@/components/ui/navbar";
import HorizontalScroll from "@/components/ui/ScrollX";
import React from "react";

const Home: React.FC = () => {
  const { setSelectedCategory } = useCategoryContext();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedCategory("All Apps");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pb-4 bg-white dark:bg-body transition-colors duration-300">
        <FilterModal collection={false} />
        <CategoryModal collection={false} />
        <Navbar page="home" />
        <HorizontalScroll />
        <div className="max-w-screen-2xl mt-16 w-full">
          <h1 className="p-8 mt-2 text-3xl md:text-4xl text-black dark:text-white font-bold transition-colors duration-100">
            Discover
          </h1>
          <Cards collection={false} />
        </div>
      </div>
      <div className="border-b-4 border-white dark:border-body"></div>
    </div>
  );
};

export default Home;
