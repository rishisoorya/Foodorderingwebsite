import { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance.js";

function ShowAddress({ selectedAddressId, setSelectedAddressId }) {
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
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axiosInstance.get("/address/get/getAllAddress");
        if (response.data.address) {
          const { _id, ...filteredAddress } = response.data.address;
          setAddress(filteredAddress);
          setSelectedAddressId(_id);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, [setSelectedAddressId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "phone" || name === "pincode") && !/^[0-9]*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10 || formData.pincode.length !== 6) {
      alert("Phone number must be 10 digits and pincode must be 6 digits");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await axiosInstance.post("/address/create", formData);
      alert("Address added successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to save address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white rounded-xl">
      {address ? (
        <div className="space-y-6 w-full">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-2xl font-bold text-gray-800">Your Address</h3>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              Saved
            </span>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 w-full">
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-lg font-medium text-gray-800">{address.name}</p>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <p className="text-gray-600">
                  {address.houseName}, {address.streetName}
                </p>
              </div>
              
              {address.landmark && (
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600">{address.landmark}</p>
                </div>
              )}
              
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-gray-600">
                  {address.city}, {address.state} - {address.pincode}
                </p>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-gray-600">{address.phone}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Add New Address</h3>
            <p className="text-gray-500">Please enter your complete delivery address</p>
          </div>
          
          <div className="space-y-5 w-full">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                maxLength="10"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">House/Flat No. and Building</label>
              <input
                type="text"
                name="houseName"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Name</label>
              <input
                type="text"
                name="streetName"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
              <input
                type="text"
                name="landmark"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  maxLength="6"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-sm transition-all 
              ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Address
              </span>
            ) : 'Save Address'}
          </button>
        </form>
      )}
    </div>
  );
}

export default ShowAddress;