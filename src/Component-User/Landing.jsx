import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900">
      <div className="container mx-auto px-6 py-32">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-8 animate-fade-in">
            Welcome to MyStore
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl text-white/90 mb-12 leading-relaxed">
              Discover our amazing collection of products. From trending fashion to cutting-edge electronics, 
              find everything you need at unbeatable prices.
            </p>
            <div className="space-y-4">
              <p className="text-xl text-white/80">Premium Quality Products</p>
              <p className="text-xl text-white/80">🚚 Fast & Free Delivery</p>
              <p className="text-xl text-white/80">24/7 Customer Support</p>
            </div>
            <div className="flex justify-center gap-4 mt-12">
              <Link
                to="/dashboard"
                className="px-12 py-4 text-xl font-semibold text-black bg-blue-500 rounded-full hover:bg-blue-400 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Start Shopping
              </Link>
              <Link
                to="/admin"
                className="px-12 py-4 text-xl font-semibold text-white bg-gray-800 rounded-full hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
