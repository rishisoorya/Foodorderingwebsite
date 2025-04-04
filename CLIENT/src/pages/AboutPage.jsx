import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-pink-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Story</h1>
        <p className="text-xl mb-8">From humble beginnings to becoming your favorite food destination</p>
        <div className="flex justify-center gap-4">
          <Link
            to="/menu"
            className="px-6 py-3 bg-white text-pink-600 rounded-md font-medium"
          >
            View Menu
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border border-white text-white rounded-md font-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2 text-pink-600">Our Mission</h2>
        <h3 className="text-3xl font-bold text-center mb-6">Connecting People Through Food</h3>
        <p className="text-lg text-gray-600 text-center mb-12">
          We believe good food has the power to bring people together. Our mission is to deliver not just meals, but memorable experiences.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Fast Delivery',
              description: 'Get your favorite meals delivered in record time',
              icon: '⏱️'
            },
            {
              name: 'Quality Food',
              description: 'Using only the freshest ingredients',
              icon: '🍴'
            },
            {
              name: 'Easy Ordering',
              description: 'Simple process from order to delivery',
              icon: '📱'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-bold mb-2">{feature.name}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2 text-pink-600">Our Team</h2>
          <h3 className="text-3xl font-bold text-center mb-8">The People Behind the Scenes</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Alex Johnson',
                role: 'Founder & Chef',
                image: 'https://randomuser.me/api/portraits/men/32.jpg'
              },
              {
                name: 'Maria Garcia',
                role: 'Head of Operations',
                image: 'https://randomuser.me/api/portraits/women/44.jpg'
              },
              {
                name: 'James Wilson',
                role: 'Customer Service',
                image: 'https://randomuser.me/api/portraits/men/75.jpg'
              }
            ].map((person, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow">
                <img 
                  src={person.image} 
                  alt={person.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold text-lg">{person.name}</h4>
                  <p className="text-pink-600">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-pink-700 text-white py-12 px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Customers Love Us</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <div className="text-4xl font-bold mb-2">5,000+</div>
            <p>Meals Served</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">98%</div>
            <p>Customer Satisfaction</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <p>Support Available</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to try our food?</h2>
        <Link
          to="/menu"
          className="inline-block bg-pink-600 text-white px-8 py-3 rounded-md text-lg font-medium"
        >
          Order Now
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;