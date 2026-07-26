import { useState } from "react";
import axios from "axios";
import { successToast, errorToast } from "../utils/toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/forgot-password`,
        { email }
      );

      successToast(
        "Email Sent 📧",
        res.data.message
      );
    } catch (err) {
      errorToast(
        "Error",
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-5">

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
          Forgot Password
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Enter your registered email.
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border rounded-xl px-4 py-3 mb-5 dark:bg-gray-900 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold"
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

      </form>

    </div>
  );
}

export default ForgotPassword;