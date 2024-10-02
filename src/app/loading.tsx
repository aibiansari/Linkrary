import React from "react";

// This component will handle the loading screen globally
export default function Loading() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <picture>
        <img
          src="/logo.svg"
          alt="Linkrary Logo"
          loading="lazy"
          className="w-12 h-12 absolute invert dark:invert-0"
        />
      </picture>
      <picture>
        <img
          src="/logo.svg"
          alt="Linkrary Logo"
          loading="lazy"
          className="w-12 h-12 anim invert dark:invert-0"
        />
      </picture>
    </div>
  );
}
