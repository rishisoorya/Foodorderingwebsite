import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosInstance from "../../config/axiosInstance.jsx";
import { toast } from "react-hot-toast";

function MenuCreateForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    isAvailable: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurant = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        "/restaurant/get/restaurant/profile"
      );
      setRestaurant(data.findRestaurant);
      setIsLoading(false);
    } catch (err) {
      setError("Error loading data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      isAvailable: true,
    });
    setImageFile(null);
    setEditId(null);
  };

  const createMenu = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("isAvailable", formData.isAvailable);
      form.append("image", imageFile);

      await axiosInstance.post("/menuitems/create", form);
      toast.success("Menu item created");
      resetForm();
      fetchRestaurant();
    } catch (error) {
      console.error("Create Error:", error);
      toast.error("Failed to create menu item");
    }
  };

  const updateMenu = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("isAvailable", formData.isAvailable);
      if (imageFile) {
        form.append("image", imageFile);
      }

      await axiosInstance.put(`/menuitems/update/${editId}`, form);
      toast.success("Menu item updated");
      resetForm();
      fetchRestaurant();
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update menu item");
    }
  };

  const deleteMenu = async (menuItemId) => {
    try {
      await axiosInstance.delete(`/menuitems/delete/${menuItemId}`);
      toast.success("Menu item deleted");
      fetchRestaurant();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete menu item");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      isAvailable: item.isAvailable,
    });
    setImageFile(null);
    setEditId(item._id);
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="bg-white max-w-6xl mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">🍔 Menu Management</h2>

      {/* Create / Update Form */}
      <div className="bg-pink-50 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {editId ? "✏️ Edit Menu Item" : "➕ Add New Menu Item"}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Margherita Pizza"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Classic pizza with tomato sauce and mozzarella"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 12.99"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">Available</label>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              onClick={editId ? updateMenu : createMenu}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              {editId ? "Update Menu Item" : "Create Menu Item"}
            </button>
            {editId && (
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-pink-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">📋 Your Menu Items</h3>
        
        {restaurant?.menu?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {restaurant.menu.map((item) => (
              <div
                key={item._id}
                className="flex bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1 p-4">
                  <div className="flex justify-between">
                    <h4 className="text-lg font-bold text-gray-900">{item.name}</h4>
                    <span className="font-semibold text-pink-600">₹{item.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <p className={`text-sm mt-2 ${item.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    {item.isAvailable ? "✅ Available" : "❌ Not Available"}
                  </p>
                </div>
                <div className="flex flex-col p-2 space-y-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMenu(item._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg">
            <p className="text-gray-500">No menu items available yet.</p>
            <p className="text-sm text-gray-400 mt-1">Add your first menu item above</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuCreateForm;