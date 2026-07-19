import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { successToast, errorToast } from "../utils/toast";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        form
      );

      localStorage.setItem("userToken", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      successToast(
        `Welcome Back, ${res.data.user.name} 👋`,
        "Glad to see you again!"
      );

      navigate("/");

    } catch (err) {
      console.log(err);

      errorToast(
        "Login Failed",
        err.response?.data?.message ||
          "Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          User Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-5 focus:ring-2 focus:ring-blue-500 outline-none transition"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm sm:text-base mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;