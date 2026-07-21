import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { successToast, errorToast } from "../utils/toast";

const API = "/products";

const initialForm = {
  name: "",
  price: "",
  image: "",
  description: "",
  category: "",
  stock: "",
};

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const [stats, setStats] = useState({
  totalProducts: 0,
  totalOrders: 0,
  totalRevenue: 0,
  totalCustomers: 0,
});

const fetchProducts = async () => {
  try {
    setLoading(true);

    console.log("Fetching products...");

    const res = await api.get(API);

    console.log("Response:", res);

    setProducts(res.data);
  } catch (err) {
    console.log("ERROR:", err);
    console.log(err.response);
    alert("Failed to fetch products");
  } finally {
    setLoading(false);
  }
};

const fetchStats = async () => {
  try {
    const res = await api.get("/dashboard");

    setStats(res.data);
  } catch (error) {
    console.log(error);
  }
};

 useEffect(() => {
  fetchProducts();
  fetchStats();
}, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "price" || e.target.name === "stock"
          ? Number(e.target.value)
          : e.target.value,
    });
  };
  const uploadImage = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const data = new FormData();
  data.append("image", file);

  try {
    const res = await api.post("/upload", data);

    setForm({
      ...form,
      image: res.data.imageUrl,
    });

    successToast(
      "Image Uploaded 📸",
      "Image uploaded successfully."
    );
  } catch (error) {
    console.log(error);

    errorToast(
      "Upload Failed",
      "Please try again."
    );
  }
};

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`${API}/${editingId}`, form);
        successToast(
  "Product Updated",
  "Product updated successfully."
);
      } else {
        await api.post(`${API}/add`, form);
       successToast(
  "Product Added",
  "New product added successfully."
);
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      stock: product.stock,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`${API}/${id}`);
      alert("Product Deleted");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          ShopSphere Admin Dashboard
        </h1>
   
<div className="flex justify-center gap-4 mb-8">
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

  <div className="bg-white rounded-xl shadow-lg p-6">
    <p className="text-gray-500">Products</p>
    <h2 className="text-3xl font-bold text-blue-600">
      {stats.totalProducts}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow-lg p-6">
    <p className="text-gray-500">Orders</p>
    <h2 className="text-3xl font-bold text-green-600">
      {stats.totalOrders}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow-lg p-6">
    <p className="text-gray-500">Customers</p>
    <h2 className="text-3xl font-bold text-purple-600">
      {stats.totalCustomers}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow-lg p-6">
    <p className="text-gray-500">Revenue</p>
    <h2 className="text-3xl font-bold text-orange-600">
      ₹{stats.totalRevenue.toLocaleString()}
    </h2>
  </div>

</div>
  <Link
    to="/orders"
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
  >
    📦 Manage Orders
  </Link>
</div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            {editingId ? "Edit Product" : "Add Product"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              required
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
              className="border rounded-lg p-3"
            />

            <div className="space-y-3">
  <input
    type="file"
    accept="image/*"
    onChange={uploadImage}
    className="border rounded-lg p-3 w-full"
  />

  {form.image && (
    <img
      src={form.image}
      alt="Preview"
      className="w-32 h-32 object-cover rounded-lg border"
    />
  )}
</div>

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              required
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              required
              className="border rounded-lg p-3"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
              rows="4"
              className="border rounded-lg p-3 md:col-span-2"
            />

            <div className="flex gap-3 md:col-span-2">
              <button
type="submit"
disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                loading
? "Saving..."
: editingId
? "Update Product"
: "Add Product"
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Description</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center p-8">
                    Loading...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-8">
                    No Products Found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 text-center"
                  >
                    <td className="p-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded mx-auto"
                      />
                    </td>

                    <td className="p-3 font-medium">{product.name}</td>

                    <td className="p-3">{product.category}</td>

                    <td className="p-3">₹{product.price}</td>

                    <td className="p-3">

{product.stock===0 ? (

<span className="text-red-600 font-bold">
Out of Stock
</span>

):product.stock<=5?(

<span className="text-orange-500 font-bold">
{product.stock} Left
</span>

):(

<span className="text-green-600 font-bold">
{product.stock}
</span>

)}

</td>

                    <td className="p-3 max-w-xs line-clamp-2">
                      {product.description}
                    </td>

                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;