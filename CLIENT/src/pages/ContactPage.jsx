import React from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-pink-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl">We're here to help with any questions</p>
      </div>

      {/* Contact Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-pink-600 mr-4 mt-1">📞</div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9am-5pm</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-pink-600 mr-4 mt-1">✉️</div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">hello@restaurant.com</p>
                  <p className="text-sm text-gray-500">Typically reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-pink-600 mr-4 mt-1">📍</div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">123 Food Street</p>
                  <p className="text-gray-600">San Francisco, CA 94107</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-pink-600 hover:text-pink-700">Facebook</a>
                <a href="#" className="text-pink-600 hover:text-pink-700">Instagram</a>
                <a href="#" className="text-pink-600 hover:text-pink-700">Twitter</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Message</label>
                <textarea 
                  rows="4" 
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-gray-200 p-4">
        <div className="max-w-4xl mx-auto h-64 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=123%20Food%20Street,%20San%20Francisco+(Restaurant)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
          ></iframe>
        </div>
      </div>

      {/* Simple FAQ */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: "What are your opening hours?",
              answer: "We're open daily from 11am to 10pm."
            },
            {
              question: "Do you offer delivery?",
              answer: "Yes, we deliver within a 5-mile radius."
            },
            {
              question: "Can I make reservations?",
              answer: "Yes, please call us or book online."
            }
          ].map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="font-medium text-lg">{faq.question}</h3>
              <p className="text-gray-600 mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;