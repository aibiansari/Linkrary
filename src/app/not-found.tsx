import Link from "next/link";

// Page shown when the user tries to access a page that doesn't exist
export default function NotFound() {
  return (
    <div className="min-h-screen font-mono flex flex-col items-center justify-center">
      <h1 className="text-8xl mb-4">404</h1>
      <h1 className="text-4xl font-medium mb-6">Lost in the Linkrary!</h1>
      <Link
        href="/"
        className="px-6 py-3 text-white rounded-full bg-neutral-600 hover:bg-neutral-700 transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
