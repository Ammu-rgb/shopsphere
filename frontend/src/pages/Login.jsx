import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { successToast, errorToast } from "../utils/toast";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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
        `${import.meta.env.VITE_API_URL}/api/user/login`,
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
  const handleGoogleLogin = async (credentialResponse) => {
  try {
    const decoded = jwtDecode(credentialResponse.credential);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/user/google-login`,
      {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      }
    );

    localStorage.setItem("userToken", res.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    successToast(
      `Welcome ${res.data.user.name} 👋`,
      "Google Login Successful"
    );

    navigate("/");
  } catch (err) {
    console.log(err);

    errorToast(
      "Google Login Failed",
      "Please try again."
    );
  }
};
  return (
      <div className="min-h-screen bg-red-500 dark:bg-black text-white p-10">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 transition-all duration-300"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          User Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
          required
        />

        <input
  type="password"
  name="password"
  placeholder="Password"
  value={form.password}
  onChange={handleChange}
  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl px-4 py-3 mb-5 focus:ring-2 focus:ring-blue-500 outline-none transition"
  required
/>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="flex items-center my-6">
  <div className="flex-1 border-t border-gray-300"></div>

  <span className="px-3 text-gray-500 dark:text-gray-400">
    OR
  </span>

  <div className="flex-1 border-t border-gray-300"></div>
</div>
      <div className="flex justify-center mb-5">
  <GoogleLogin
    onSuccess={handleGoogleLogin}
    onError={() => {
      errorToast(
        "Google Login Failed",
        "Please try again."
      );
    }}
  />
</div>
      <p className="text-center mb-4">
  <Link
    to="/forgot-password"
    className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
  >
    <Link
  to="/forgot-password"
  className="text-blue-600 hover:underline text-sm"
>
  Forgot Password?
</Link>
  </Link>
</p>
        <p className="text-center text-sm sm:text-base mt-6 text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
           className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;