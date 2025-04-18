import { useState, useEffect } from 'react';
import axiosInstance from '../axios/axiosInstance.js';

const AddressPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    houseName: "",
    streetName: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [address, setAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axiosInstance.get("/address/get/getAllAddress");
        if (response.data.address) {
          const { _id, ...addressData } = response.data.address;
          setAddress(addressData);
          setFormData(addressData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching address:", error);
        setLoading(false);
      }
    };
    fetchAddress();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "phone" || name === "pincode") && !/^[0-9]*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10 || formData.pincode.length !== 6) {
      alert("Phone number must be 10 digits and pincode must be 6 digits.");
      return;
    }
    try {
      const endpoint = address ? "/address/put/updateAddress" : "/address/create";
      await axiosInstance[address ? "put" : "post"](endpoint, formData);
      alert(address ? "Address Updated successfully!" : "Address Added successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to process address. Please try again.");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    if (address) {
      setFormData(address);
    } else {
      setFormData({
        name: "",
        houseName: "",
        streetName: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-pink-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-pink-700">Loading your address...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {address && !isEditing ? 'Your Address' : address ? 'Update Address' : 'Add New Address'}
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            {address && !isEditing ? 'Manage your delivery address' : 'Enter your delivery details'}
          </p>
        </div>

        {address && !isEditing ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-5 bg-gradient-to-r from-pink-500 to-pink-600">
              <h2 className="text-xl font-bold text-white">Saved Address</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-pink-100 p-2 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{address.name}</p>
                    <p className="text-gray-600">{address.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-100 p-2 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{address.houseName}, {address.streetName}</p>
                    {address.landmark && <p className="text-gray-600">{address.landmark}</p>}
                    <p className="text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleEditClick}
                  className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Edit Address
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-5 bg-gradient-to-r from-pink-500 to-pink-600">
              <h2 className="text-xl font-bold text-white">
                {address ? 'Update Address' : 'Add New Address'}
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number*
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength="10"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="houseName" className="block text-sm font-medium text-gray-700 mb-2">
                    House/Flat/Apartment No.*
                  </label>
                  <input
                    type="text"
                    id="houseName"
                    name="houseName"
                    value={formData.houseName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="streetName" className="block text-sm font-medium text-gray-700 mb-2">
                    Street/Colony Name*
                  </label>
                  <input
                    type="text"
                    id="streetName"
                    name="streetName"
                    value={formData.streetName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-2">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    id="landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    State*
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode*
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength="6"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  {address ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddressPage;