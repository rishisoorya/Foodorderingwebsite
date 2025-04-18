import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative py-32 px-4 bg-gradient-to-r from-pink-50 to-pink-100 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920')] bg-cover bg-center"></div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            More than just <span className="text-pink-600">food delivery</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We're passionate about connecting people with the best local restaurants and creating delicious experiences
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-24 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Founded in 2018, we started with a simple idea: make restaurant-quality food accessible to everyone, wherever they are. What began as a small local service has grown into a platform connecting thousands of customers with hundreds of restaurants across multiple cities.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our team of food enthusiasts, tech experts, and logistics professionals work tirelessly to ensure every meal delivered meets our high standards of quality, freshness, and presentation.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                alt="Our team" 
                className="rounded-xl object-cover h-64 w-full shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                alt="Delivery rider" 
                className="rounded-xl object-cover h-64 w-full shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 bg-pink-600 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-sm font-medium">Restaurant Partners</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold mb-2">10K+</div>
            <div className="text-sm font-medium">Daily Deliveries</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold mb-2">98%</div>
            <div className="text-sm font-medium">On-Time Rate</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold mb-2">15</div>
            <div className="text-sm font-medium">Cities Served</div>
          </div>
        </div>
      </div>

      {/* How We Work Section */}
      <div className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-16">Our Delivery Promise</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🍴",
                title: "Carefully Selected",
                description: "We partner only with top-rated restaurants that meet our quality standards"
              },
              {
                icon: "⏱️",
                title: "Fast & Reliable",
                description: "Average delivery time under 35 minutes with real-time tracking"
              },
              {
                icon: "🌱",
                title: "Sustainable",
                description: "Eco-friendly packaging and optimized delivery routes"
              }
            ].map((step, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 px-4 bg-pink-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-16">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "The food always arrives hot and fresh, exactly as it would be in the restaurant. I'm consistently impressed!",
                author: "Sarah K.",
                location: "Regular Customer"
              },
              {
                quote: "As someone who works late, this service has been a lifesaver. The variety and quality are unmatched.",
                author: "Michael T.",
                location: "Business Professional"
              },
              {
                quote: "I love discovering new restaurants through the app. The recommendations are always spot on!",
                author: "Priya M.",
                location: "Food Blogger"
              },
              {
                quote: "The delivery team is so friendly and professional. They really care about the customer experience.",
                author: "James L.",
                location: "Local Resident"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-gray-700 mb-6 relative">
                  <svg className="absolute -top-1 -left-1 w-8 h-8 text-pink-200" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                  </svg>
                  <p className="pl-6">{testimonial.quote}</p>
                  <svg className="float-right w-8 h-8 text-pink-200" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M22.648 28c4.896-3.456 8.352-9.12 8.352-15.36 0-5.088-3.072-8.064-6.624-8.064-3.36 0-5.856 2.688-5.856 5.856 0 3.168 2.208 5.472 5.088 5.472.576 0 1.344-.096 1.536-.192-.48 3.264-3.552 7.104-6.624 9.024L22.648 28zm-16.512 0c4.8-3.456 8.256-9.12 8.256-15.36 0-5.088-3.072-8.064-6.624-8.064-3.264 0-5.856 2.688-5.856 5.856 0 3.168 2.304 5.472 5.184 5.472.576 0 1.248-.096 1.44-.192-.48 3.264-3.456 7.104-6.528 9.024L6.136 28z"/>
                  </svg>
                </div>
                <div className="font-medium text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-pink-600">{testimonial.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Section */}
      <div className="py-24 px-4 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join thousands of happy customers</h2>
          <p className="text-xl text-gray-700">
            Experience the convenience of restaurant-quality meals delivered to your door
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;