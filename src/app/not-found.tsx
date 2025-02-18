'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    // This ensures that the code runs only on the client side
    if (!router) return;
  }, [router]);

  return (
    <div className="min-h-screen mt-10 py-11 lg:py-20 mx-auto flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-9xl font-bold text-green-600">404</h1>
      <h2 className="text-2xl font-bold text-center text-gray-800 mt-4">
        OOPS! PAGE NOT FOUND
      </h2>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        Sorry, but the page you are looking for does not exist, has been
        removed, its name changed, or is temporarily unavailable.
      </p>
      <div className="mt-6 w-full max-w-md">
        <div className="flex items-center border rounded-md shadow-sm overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-gray-600 outline-none"
          />
          <button className="bg-gray-200 px-4 py-2 text-gray-600 hover:bg-gray-300">
            🔍
          </button>
        </div>
      </div>
      <button
        onClick={() => router.push('/')} // Navigate to home page
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700"
      >
        BACK TO HOME PAGE
      </button>
    </div>
  );
};

export default Custom404;
 