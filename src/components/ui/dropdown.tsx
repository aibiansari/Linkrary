"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useThemeContext } from "@/contexts/useThemeContext";
import Link from "next/link";

const wrapperVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 20,
      staggerChildren: 0.02,
    },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: {
      duration: 0.15,
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      type: "tween",
      duration: 0.15,
    },
  },
};

const dropdownItems = [
  {
    icon: () => (
      <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
      </svg>
    ),
    label: "System",
    theme: "system",
  },
  {
    icon: (isSelected: boolean) => (
      <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
        {isSelected ? <circle cx="8" cy="8" r="3.4" /> : null}
      </svg>
    ),
    label: "Light",
    theme: "light",
  },
  {
    icon: (isSelected: boolean) => (
      <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
        {isSelected ? (
          <path
            d="M6.3,15.3c0,0-5.8-1.3-5.8-7.1s4.4-7.3,4.4-7.3l0.6-0.2c0,0-2.2,4.7,0.6,8.5s8.1,3.4,8.2,3.2C14.5,12.3,12.2,16.6,6.3,15.3z
	"
          />
        ) : null}
      </svg>
    ),
    label: "Dark",
    theme: "dark",
  },
];

const DropDown = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useThemeContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div ref={dropdownRef} className="relative">
      <svg
        fill="currentColor"
        className="w-8 h-8 text-black dark:text-white cursor-pointer transition-colors duration-500"
        onClick={() => setOpen((pv) => !pv)}
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
        />
      </svg>
      <motion.div
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={wrapperVariants}
        style={{ originY: "top", translateX: "-50%" }}
        className="flex flex-col p-1 rounded-md bg-white dark:bg-neutral-950 border border-neutral-400 dark:border-neutral-800 text-black dark:text-white shadow-xl shadow-black/10 dark:shadow-black/30 absolute top-[120%] left-[-220%] w-48 overflow-hidden transition-colors duration-500"
      >
        <Link
          onClick={() => setOpen(false)}
          className="w-full flex items-center gap-2 p-1.5 text-sm font-semibold rounded-md hover:bg-neutral-400 dark:hover:bg-neutral-800 transition-colors duration-100 cursor-pointer"
          href="/collection"
        >
          <svg fill="currentColor" className="w-3.5 h-3.5" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
          </svg>
          Collection
        </Link>

        <Link
          onClick={() => setOpen(false)}
          className="w-full flex items-center gap-2 p-1.5 text-sm rounded-md hover:bg-neutral-400 dark:hover:bg-neutral-800 transition-colors duration-100 cursor-pointer"
          href="/about"
        >
          <svg fill="currentColor" className="w-3.5 h-3.5" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
          About
        </Link>

        <hr className="border-t my-1 border-neutral-400 dark:border-neutral-800" />

        <motion.div
          variants={itemVariants}
          className="w-full p-1.5 text-xs pointer-events-none select-none"
        >
          Select a theme
        </motion.div>

        <motion.ul
          variants={itemVariants}
          className="flex items-center justify-center gap-2 p-1.5"
        >
          {dropdownItems.map((item, index) => (
            <motion.li
              key={index}
              onClick={() => setTheme(item.theme)}
              className={`flex pt-1.5 pb-1 text-[10px] font-medium cursor-pointer flex-col w-12 ring-1 ring-neutral-400 dark:ring-neutral-900 rounded-md items-center justify-center space-y-1.5 transition-colors duration-500 ease-out ${
                theme === item.theme
                  ? "bg-neutral-400 dark:bg-neutral-700"
                  : "hover:bg-neutral-300 dark:hover:bg-element"
              }`}
              variants={itemVariants}
            >
              {item.icon(theme === item.theme)}
              <span>{item.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

export default DropDown;
