import { useState, useEffect } from 'react';
import axiosInstance from '../axios/axiosInstance.js'; // Adjust the import path as needed

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
          setFormData(addressData); // Pre-fill form with existing data
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
      setFormData(address); // Reset form to saved values
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
    return <div className="text-center py-8">Loading address information...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Your Address</h1>
      
      {address && !isEditing ? (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Saved Address</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {address.name}</p>
            <p><span className="font-medium">Address:</span> {address.houseName}, {address.streetName}</p>
            {address.landmark && <p><span className="font-medium">Landmark:</span> {address.landmark}</p>}
            <p><span className="font-medium">City:</span> {address.city}</p>
            <p><span className="font-medium">State:</span> {address.state}</p>
            <p><span className="font-medium">Pincode:</span> {address.pincode}</p>
            <p><span className="font-medium">Phone:</span> {address.phone}</p>
          </div>
          <button
            onClick={handleEditClick}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Edit Address
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {address ? "Update Address" : "Add New Address"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number (10 digits)*
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="houseName" className="block text-sm font-medium text-gray-700 mb-1">
              House/Flat/Apartment No.*
            </label>
            <input
              type="text"
              id="houseName"
              name="houseName"
              value={formData.houseName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="streetName" className="block text-sm font-medium text-gray-700 mb-1">
              Street/Colony Name*
            </label>
            <input
              type="text"
              id="streetName"
              name="streetName"
              value={formData.streetName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-1">
              Landmark (Optional)
            </label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City*
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State*
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                Pincode (6 digits)*
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                maxLength="6"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelClick}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {address ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddressPage;