import React from "react";

export default function Navbar() {
  return (
    <header className="bg-white py-4 px-6 w-full shadow-md mb-8">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-gray-800 font-bold text-xl">
          dribbble
        </a>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800">
                Inspiration
              </a>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
        <div className="flex items-center">
          <a href="/" className="text-gray-600 hover:text-gray-800 mr-4">
            Upload
          </a>
          <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center">
            <span className="text-sm font-bold">A</span>
          </div>
        </div>
      </div>
    </header>
  );
}
