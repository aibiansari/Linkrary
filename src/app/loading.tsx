import React from "react";

// This component will handle the loading screen globally
export default function Loading() {
  return (
    <div className="relative bg-transparent min-h-screen flex items-center justify-center">
      <picture className="absolute">
        <img
          src="./logo.svg"
          alt="Linkrary Logo"
          loading="lazy"
          className="w-12 h-12 invert dark:invert-0"
        />
      </picture>
      <picture>
        <img
          src="./logo.svg"
          alt="Linkrary Logo"
          loading="lazy"
          className="w-12 h-12 anim invert dark:invert-0"
        />
      </picture>
    </div>
  );
}
