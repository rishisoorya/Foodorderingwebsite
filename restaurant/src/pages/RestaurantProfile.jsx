import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';
import toast from 'react-hot-toast';
import SellerHeader from './SellerHeader';

const RestaurantProfileAndMenu = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    openingHours: '',
    cuisineType: '',
    deliveryRadius: '',
    logo: null,
    banner: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [restaurantRes, menuRes] = await Promise.all([
          axiosInstance.get('/seller/restaurant'),
          axiosInstance.get('/seller/menu')
        ]);
        setRestaurant(restaurantRes.data.restaurant);
        setMenuItems(menuRes.data.menuItems);
        setFormData({
          name: restaurantRes.data.restaurant.name,
          description: restaurantRes.data.restaurant.description,
          address: restaurantRes.data.restaurant.address,
          phone: restaurantRes.data.restaurant.phone,
          email: restaurantRes.data.restaurant.email,
          openingHours: restaurantRes.data.restaurant.openingHours,
          cuisineType: restaurantRes.data.restaurant.cuisineType,
          deliveryRadius: restaurantRes.data.restaurant.deliveryRadius
        });
      } catch (error) {
        toast.error('Failed to fetch data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await axiosInstance.put('/seller/restaurant', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setRestaurant(response.data.restaurant);
      toast.success('Restaurant updated successfully');
      setEditMode(false);
    } catch (error) {
      toast.error('Failed to update restaurant');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMenuItem = async (itemId) => {
    try {
      await axiosInstance.delete(`/seller/menu/${itemId}`);
      setMenuItems(prev => prev.filter(item => item._id !== itemId));
      toast.success('Menu item deleted successfully');
    } catch (error) {
      toast.error('Failed to delete menu item');
      console.error(error);
    }
  };

  if (loading && !restaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SellerHeader />
        <div className="container mx-auto py-8 px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading restaurant data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerHeader />
      
      <div className="container mx-auto py-8 px-4">
        {/* Banner */}
        <div className="relative rounded-xl overflow-hidden h-64 mb-8">
          {restaurant?.banner ? (
            <img 
              src={restaurant.banner} 
              alt="Restaurant banner" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{restaurant?.name}</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-end">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden mr-4 -mb-8">
                {restaurant?.logo ? (
                  <img 
                    src={restaurant.logo} 
                    alt="Restaurant logo" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{restaurant?.name}</h1>
                <p className="text-gray-200">{restaurant?.cuisineType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('profile')}
          >
            Restaurant Profile
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'menu' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('menu')}
          >
            Menu Management
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Restaurant Information</h2>
              {editMode ? (
                <div className="space-x-2">
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="p-6">
              {editMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine Type</label>
                    <input
                      type="text"
                      name="cuisineType"
                      value={formData.cuisineType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Opening Hours</label>
                    <input
                      type="text"
                      name="openingHours"
                      value={formData.openingHours}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Radius (km)</label>
                    <input
                      type="number"
                      name="deliveryRadius"
                      value={formData.deliveryRadius}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                    <input
                      type="file"
                      name="logo"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
                    <input
                      type="file"
                      name="banner"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                      <div className="mt-2 space-y-2">
                        <p><span className="font-medium">Name:</span> {restaurant?.name}</p>
                        <p><span className="font-medium">Cuisine Type:</span> {restaurant?.cuisineType}</p>
                        <p><span className="font-medium">Description:</span> {restaurant?.description}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                      <div className="mt-2 space-y-2">
                        <p><span className="font-medium">Address:</span> {restaurant?.address}</p>
                        <p><span className="font-medium">Phone:</span> {restaurant?.phone}</p>
                        <p><span className="font-medium">Email:</span> {restaurant?.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
                      <div className="mt-2">
                        <p>{restaurant?.openingHours || 'Not specified'}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Delivery Information</h3>
                      <div className="mt-2">
                        <p><span className="font-medium">Delivery Radius:</span> {restaurant?.deliveryRadius} km</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Restaurant Images</h3>
                      <div className="mt-4 flex space-x-4">
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200">
                            {restaurant?.logo ? (
                              <img src={restaurant.logo} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                              </div>
                            )}
                          </div>
                          <span className="text-sm mt-1 text-gray-500">Logo</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                            {restaurant?.banner ? (
                              <img src={restaurant.banner} alt="Banner" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                              </div>
                            )}
                          </div>
                          <span className="text-sm mt-1 text-gray-500">Banner</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Menu Items</h2>
              <button
                onClick={() => navigate('/seller/menu/create')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add New Item
              </button>
            </div>

            {menuItems.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No menu items yet</h3>
                <p className="mt-1 text-gray-500">Get started by adding your first menu item</p>
                <button
                  onClick={() => navigate('/seller/menu/create')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Menu Item
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="grid grid-cols-1 divide-y divide-gray-200">
                  {menuItems.map((item) => (
                    <div key={item._id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden border border-gray-200">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                            <span className="text-lg font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <span className="mr-3">Category: {item.category}</span>
                            {item.isVegetarian && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Vegetarian
                              </span>
                            )}
                            {item.isVegan && (
                              <span className="ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Vegan
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex space-x-2">
                          <button
                            onClick={() => navigate(`/seller/menu/edit/${item._id}`)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteMenuItem(item._id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantProfileAndMenu;