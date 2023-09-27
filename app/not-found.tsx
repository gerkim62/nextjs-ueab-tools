import Link from "next/link"; // Assuming you're using Next.js

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-200">
      <div className=" text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Page Not Found</p>
        
        <Link
          className="bg-pink-500 text-white hover:bg-pink-400 text-lg font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out"
          href="/"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
