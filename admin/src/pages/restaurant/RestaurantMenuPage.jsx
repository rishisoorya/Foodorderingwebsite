import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2, FiPlus, FiX, FiSave, FiImage } from 'react-icons/fi';

const RestaurantMenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fetch menu items
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axiosInstance.get('/restaurant/menu');
      setMenuItems(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch menu items');
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('category', data.category);
      if (data.image[0]) formData.append('image', data.image[0]);

      if (editingItem) {
        await axiosInstance.put(`/restaurant/menu/${editingItem._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Menu item updated successfully');
      } else {
        await axiosInstance.post('/restaurant/menu', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Menu item added successfully');
      }

      fetchMenuItems();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      await axiosInstance.delete(`/restaurant/menu/${id}`);
      toast.success('Menu item deleted successfully');
      fetchMenuItems();
    } catch (error) {
      toast.error('Failed to delete menu item');
    }
  };

  const resetForm = () => {
    reset();
    setImagePreview(null);
    setIsAdding(false);
    setEditingItem(null);
  };

  const startEditing = (item) => {
    setEditingItem(item);
    reset(item);
    setImagePreview(item.image);
    setIsAdding(true);
  };

  const categories = [
    'Starters',
    'Main Course',
    'Desserts',
    'Beverages',
    'Specials'
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-pink-800">Menu Management</h1>
        <button
          onClick={() => {
            resetForm();
            setIsAdding(true);
          }}
          className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
        >
          <FiPlus className="mr-2" /> Add Menu Item
        </button>
      </div>

      {/* Add/Edit Menu Item Form */}
      {isAdding && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-pink-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-pink-700">
              {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h2>
            <button 
              onClick={resetForm} 
              className="text-pink-500 hover:text-pink-700 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Item Name */}
              <div>
                <label className="block text-sm font-medium text-pink-700 mb-2">
                  Item Name *
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-400' : 'border-pink-200'} focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all`}
                  {...register('name', { required: 'Item name is required' })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-pink-700 mb-2">
                  Category *
                </label>
                <select
                  className={`w-full px-4 py-3 rounded-lg border ${errors.category ? 'border-red-400' : 'border-pink-200'} focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all`}
                  {...register('category', { required: 'Category is required' })}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-2">{errors.category.message}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-pink-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.price ? 'border-red-400' : 'border-pink-200'} focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all`}
                  {...register('price', {
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be positive' },
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-2">{errors.price.message}</p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-pink-700 mb-2">
                  Item Image {!editingItem && '*'}
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-20 h-20 rounded-lg object-cover border-2 border-pink-100"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-pink-50 border-2 border-dashed border-pink-200 flex items-center justify-center">
                        <FiImage className="text-pink-400 text-xl" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="menu-item-image"
                      {...register('image')}
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="menu-item-image"
                      className="absolute -bottom-2 -right-2 bg-white border-2 border-pink-300 rounded-full p-1.5 cursor-pointer hover:bg-pink-50 transition-all shadow-sm"
                    >
                      <FiEdit size={16} className="text-pink-600" />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="menu-item-image"
                      className="text-sm font-medium text-pink-600 hover:text-pink-700 cursor-pointer transition-colors"
                    >
                      {imagePreview ? 'Change image' : 'Upload image'}
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-pink-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  {...register('description')}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 border border-pink-300 rounded-lg text-pink-600 hover:bg-pink-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-lg hover:from-pink-700 hover:to-pink-600 shadow-md hover:shadow-lg transition-all flex items-center"
              >
                <FiSave className="mr-2" />
                {editingItem ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Menu Items List */}
      <div className="space-y-8">
        {categories.map((category) => {
          const itemsInCategory = menuItems.filter(item => item.category === category);
          if (itemsInCategory.length === 0) return null;

          return (
            <div key={category} className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100">
              <div className="bg-gradient-to-r from-pink-50 to-pink-100 px-6 py-4 border-b border-pink-200">
                <h2 className="text-xl font-bold text-pink-700">{category}</h2>
              </div>
              <div className="divide-y divide-pink-100">
                {itemsInCategory.map((item) => (
                  <div key={item._id} className="p-6 hover:bg-pink-50 transition-colors">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden border-2 border-pink-100">
                        <img
                          src={item.image || '/food-placeholder.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-pink-800">{item.name}</h3>
                        <p className="text-pink-600 mt-2">{item.description}</p>
                        <p className="text-pink-700 font-bold text-lg mt-3">₹{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => startEditing(item)}
                          className="p-2.5 text-pink-600 hover:text-white hover:bg-pink-600 rounded-lg transition-all"
                          title="Edit"
                        >
                          <FiEdit size={20} />
                        </button>
                        <button
                          onClick={() => deleteMenuItem(item._id)}
                          className="p-2.5 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-all"
                          title="Delete"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenuPage;