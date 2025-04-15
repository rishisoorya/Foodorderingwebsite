import React from 'react';

const FoodCardPage = () => {
  const foods = [
    {
      id: 1,
      name: 'Truffle Mushroom Pasta',
      description: 'Creamy fettuccine with wild mushrooms, black truffle oil, and parmesan',
      price: 18.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      deliveryTime: '25-35 min',
      isVeg: false
    },
    {
      id: 2,
      name: 'Avocado Veggie Bowl',
      description: 'Healthy bowl with quinoa, roasted veggies, avocado and tahini dressing',
      price: 14.50,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1546069901-456196073499?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      deliveryTime: '20-30 min',
      isVeg: true
    },
    {
      id: 3,
      name: 'Spicy Tuna Sushi Roll',
      description: 'Fresh tuna, spicy mayo, cucumber, and sesame seeds wrapped in seaweed',
      price: 22.75,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      deliveryTime: '30-40 min',
      isVeg: false
    },
    {
      id: 4,
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil leaves',
      price: 16.99,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      deliveryTime: '15-25 min',
      isVeg: true
    },
    {
      id: 5,
      name: 'Beef Burger Deluxe',
      description: 'Juicy beef patty with cheddar, bacon, caramelized onions, and special sauce',
      price: 15.25,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      deliveryTime: '20-30 min',
      isVeg: false
    },
    {
      id: 6,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
      price: 8.99,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      deliveryTime: '10-15 min',
      isVeg: true
    }
  ];

  // Star rating component
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Our Delicious Menu
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-600">
            Discover amazing flavors from top-rated restaurants
          </p>
        </div>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <div 
              key={food.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Food Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={food.image}
                  alt={food.name}
                />
                {/* Veg/Non-Veg Tag */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${food.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {food.isVeg ? 'VEG' : 'NON-VEG'}
                </div>
                {/* Delivery Time */}
                <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs font-medium">
                  ⏱️ {food.deliveryTime}
                </div>
              </div>

              {/* Food Details */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900">{food.name}</h3>
                  <span className="text-lg font-bold text-pink-600">${food.price.toFixed(2)}</span>
                </div>
                
                <p className="mt-2 text-gray-600">{food.description}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <StarRating rating={food.rating} />
                  
                  <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg transition-all duration-300">
            View Full Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCardPage;