import React, { useState } from "react";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 to-purple-900 pt-20 pb-32">
        {/* Decorative wave */}
        <div className="absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="-mb-1 w-full text-white"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">It's not just Food,</span>
              <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                It's an Experience
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover delicious flavors from around the world, delivered fast and fresh to your door.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex shadow-lg rounded-lg overflow-hidden">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for restaurants or cuisines..."
                    className="flex-1 px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-6 text-white font-semibold transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <span className="text-xs text-indigo-200">Popular searches:</span>
                <button
                  onClick={() => setSearchQuery("Pizza")}
                  className="text-xs text-white hover:text-pink-300 transition-colors"
                >
                  Pizza
                </button>
                <span className="text-xs text-indigo-200">•</span>
                <button
                  onClick={() => setSearchQuery("Sushi")}
                  className="text-xs text-white hover:text-pink-300 transition-colors"
                >
                  Sushi
                </button>
                <span className="text-xs text-indigo-200">•</span>
                <button
                  onClick={() => setSearchQuery("Burger")}
                  className="text-xs text-white hover:text-pink-300 transition-colors"
                >
                  Burger
                </button>
                <span className="text-xs text-indigo-200">•</span>
                <button
                  onClick={() => setSearchQuery("Pasta")}
                  className="text-xs text-white hover:text-pink-300 transition-colors"
                >
                  Pasta
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Food Images Grid (Background) */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="grid grid-cols-3 gap-1 h-full">
            {[
              "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
              "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
              "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
              "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
              "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            ].map((img, index) => (
              <div
                key={index}
                className="bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      
    </div>
  );
}

export default HomePage;