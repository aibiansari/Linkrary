import Link from "next/link";

// Page shown when the user tries to access a page that doesn't exist
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" flex flex-col items-center justify-center border-2 border-neutral-400 dark:border-neutral-950 p-12 rounded-xl shadow-lg shadow-black/50">
        <div className="mb-4">
          <picture>
            <img
              src="./logo.svg"
              alt="Linkrary Logo"
              loading="lazy"
              className="w-24 h-24 invert dark:invert-0"
            />
          </picture>
        </div>
        <h1 className="text-4xl font-medium mb-6">Lost in the Linkrary!</h1>

        <Link
          href="/"
          className="px-6 py-3 bg-neutral-300 hover:bg-neutral-400 rounded-full dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-all"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
