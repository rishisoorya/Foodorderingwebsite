import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const cuisines = [
    {
      name: "Italian",
      restaurants: [
        {
          name: "La Bella Italia",
          rating: "5",
          image:
            "http://res.cloudinary.com/dutf0dgga/image/upload/v1745163348/zgg8dljq8ghlykfgcnik.jpg",
        },
      ],
    },
    {
      name: "Japanese",
      restaurants: [
        {
          name: "Tokyo Sushi",
          rating: "5",
          image:
            "http://res.cloudinary.com/dutf0dgga/image/upload/v1745163948/agb9mmjmcabejtod36xc.jpg",
        },
      ],
    },
    {
      name: "American",
      restaurants: [
        {
          name: "Burger Joint",
          rating: "5",
          image:
            "http://res.cloudinary.com/dutf0dgga/image/upload/v1745164642/fkdmromaxzwhyrbqmpm9.jpg",
        },
      ],
    },
    {
      name: "Indian",
      restaurants: [
        {
          name: "Malabar Cafe",
          rating: "4.6",
          image:
            "http://res.cloudinary.com/dutf0dgga/image/upload/v1745165570/mbwtxynqd9spzz8goaj8.jpg",
        },
      ],
    },
    {
      name: "Fine Dining",
      restaurants: [
        {
          name: "Latest Recipe",
          rating: "4.2",
          image:
            "http://res.cloudinary.com/dutf0dgga/image/upload/v1745165981/wtcvop6qbsq0xadx5u9a.jpg",
        },
      ],
    },
    {
      name: "Kerala",
      restaurants: [
        {
          name: "Pepper House",
          rating: "4.9",
          image:
            "http://res.cloudinary.com/dutf0dgga/image/upload/v1745166366/irstxwznvahpgk63mpmm.jpg",
        },
      ],
    },
  ];

  const featuredRestaurants = [
    {
      name: "La Bella Italia",
      cuisine: "Italian",
      rating: "5",
      image:
        "http://res.cloudinary.com/dutf0dgga/image/upload/v1745163348/zgg8dljq8ghlykfgcnik.jpg",
    },
    {
      name: "Tokyo Sushi",
      cuisine: "Japanese",
      rating: "5",
      image:
        "http://res.cloudinary.com/dutf0dgga/image/upload/v1745163948/agb9mmjmcabejtod36xc.jpg",
    },
    {
      name: "Burger Joint",
      cuisine: "American",
      rating: "5",
      image:
        "http://res.cloudinary.com/dutf0dgga/image/upload/v1745164642/fkdmromaxzwhyrbqmpm9.jpg",
    },
  ];

  const foodGallery = [
    "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  ];

  return (
    <div className="bg-white">
      <div className="bg-pink-50 p-8 md:p-12 lg:p-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover the best restaurants near you
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Order from top-rated restaurants with just a few taps
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/restaurants"
              className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700"
            >
              Order Now
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 bg-white text-pink-600 border border-pink-600 rounded-md hover:bg-pink-50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <div className="py-12 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Popular Cuisines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cuisines.map((cuisine, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={cuisine.restaurants[0].image}
                  alt={cuisine.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {cuisine.name}
                </h3>
                <div className="space-y-4">
                  {cuisine.restaurants.map((restaurant, rIndex) => (
                    <div key={rIndex} className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{restaurant.name}</h4>
                        <div className="flex items-center text-pink-600">
                          <span>★</span>
                          <span className="ml-1 text-gray-700">
                            {restaurant.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-12 bg-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Featured Restaurants
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden shadow-lg group"
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {restaurant.rating} ★
                    </span>
                    <span className="ml-3 text-white">
                      {restaurant.cuisine}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-12 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Food Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {foodGallery.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={image}
                alt={`Food ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="py-16 bg-pink-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to order?</h2>
          <p className="mt-4 text-lg text-pink-100">
            Download our app for faster ordering and exclusive deals
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800">
              <span className="mr-2">App Store</span>
              <span>→</span>
            </button>
            <button className="flex items-center justify-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800">
              <span className="mr-2">Google Play</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
