import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const RestaurantVerification = () => {
  const { verificationToken } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyRestaurant = async () => {
      try {
        const response = await axios.get(
          `http://localhost:6900/api/admin/verify/${verificationToken}`
        );
        
        if (response.data.success) {
          setVerificationStatus('verified');
          toast.success('Restaurant verified successfully!');
        } else {
          setVerificationStatus('failed');
          toast.error(response.data.message || 'Verification failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('failed');
        toast.error(
          error.response?.data?.message || 
          'An error occurred during verification'
        );
      } finally {
        setLoading(false);
      }
    };

    verifyRestaurant();
  }, [verificationToken]);

  const renderStatus = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center">
          <FiLoader className="animate-spin text-4xl text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold">Verifying restaurant...</h2>
          <p className="text-gray-600 mt-2">Please wait while we verify your restaurant</p>
        </div>
      );
    }

    if (verificationStatus === 'verified') {
      return (
        <div className="flex flex-col items-center">
          <FiCheckCircle className="text-4xl text-green-500 mb-4" />
          <h2 className="text-xl font-semibold">Verification Successful!</h2>
          <p className="text-gray-600 mt-2">
            Your restaurant has been successfully verified.
          </p>
          <button
            onClick={() => navigate('/admin/restaurants')}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Restaurants
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        <FiXCircle className="text-4xl text-red-500 mb-4" />
        <h2 className="text-xl font-semibold">Verification Failed</h2>
        <p className="text-gray-600 mt-2 text-center">
          The verification link is invalid or has expired. Please contact support for assistance.
        </p>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Contact Support
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Restaurant Verification
          </h1>
          <div className="my-8">{renderStatus()}</div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantVerification;