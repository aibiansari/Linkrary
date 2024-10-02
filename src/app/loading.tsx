import Image from "next/image";
import React from "react";

// This component will handle the loading screen globally
export default function Loading() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src="/logo.svg"
        alt="Linkrary Logo"
        height={48}
        width={48}
        className="w-12 h-12 absolute invert dark:invert-0"
      />
      <Image
        src="/logo.svg"
        alt="Linkrary Logo"
        height={48}
        width={48}
        className="w-12 h-12 anim invert dark:invert-0"
      />
    </div>
  );
}
