import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext'; // Assuming you have an auth context
import Cookies from 'js-cookie';

const SignOutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function from your auth context

  const handleSignOut = () => {
    // Perform sign out operations
    logout(); // Clear auth state
    Cookies.remove('authToken'); // Remove auth cookie
    localStorage.clear(); // Clear any stored user data
    
    // Redirect to home after sign out
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign Out
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Are you sure you want to sign out?
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleSignOut}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Yes, Sign Out
            </button>
            
            <button
              onClick={handleCancel}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOutPage;