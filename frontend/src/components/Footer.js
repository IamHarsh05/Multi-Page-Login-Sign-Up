import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-gray-800 font-bold mb-4">For designers</h3>
            <ul className="text-gray-600">
              <li className="mb-2">
                <a href="/" className="hover:text-gray-800">
                  Go Pro!
                </a>
              </li>
              <li className="mb-2">
                <a href="/" className="hover:text-gray-800">
                  Explore design work
                </a>
              </li>
              <li className="mb-2">
                <a href="/" className="hover:text-gray-800">
                  Design blog
                </a>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>
          <div>
            <h3 className="text-gray-800 font-bold mb-4">Hire designers</h3>
            <ul className="text-gray-600">
              <li className="mb-2">
                <a href="/" className="hover:text-gray-800">
                  Post a job opening
                </a>
              </li>
              <li className="mb-2">
                <a href="/" className="hover:text-gray-800">
                  Post a freelance project
                </a>
              </li>
              <li className="mb-2">
                <a href="/" className="hover:text-gray-800">
                  Search for designers
                </a>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>
          {/* Add more columns as needed */}
        </div>
        <div className="mt-8 border-t border-gray-300 pt-8 flex flex-col md:flex-row md:justify-between">
          <p className="text-gray-600 mb-4 md:mb-0">
            Dribbble is the world's leading community for creatives to share, grow, and
            get hired.
          </p>
          <div className="flex space-x-4">
            <a href="/" className="text-gray-600 hover:text-gray-800">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {/* Twitter icon SVG path */}
              </svg>
            </a>
            {/* Add more social media icons as needed */}
          </div>
        </div>
        <p className="text-gray-600 mt-8 text-center">
          © 2023 Dribbble. All rights reserved. 20,501,853 shots dribbbbled
        </p>
      </div>
    </footer>
  );
};

export default Footer;