import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaEnvelope,
  FaIdCard,
  FaUser,
  FaEdit,
} from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setUser(res.data);
    } catch (error) {
      console.log(error);

      const localUser = localStorage.getItem("user");

      if (localUser) {
        setUser(JSON.parse(localUser));
      }
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 transition">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            Loading Profile...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 py-6 md:py-10 transition-colors duration-300">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-10 flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-xl transition">

            <FaUserCircle className="text-7xl text-blue-700 dark:text-blue-400" />

          </div>

          <h1 className="text-3xl font-bold mt-5 text-center px-4">
            {user.name}
          </h1>

          <p className="text-blue-100 mt-2 break-all px-4 text-center">
            {user.email}
          </p>

        </div>

        {/* Body */}

        <div className="p-8 space-y-6">

          {/* Name */}

          <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-lg transition">

            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <FaUser className="text-blue-600 dark:text-blue-300 text-xl" />
            </div>

            <div>
              <h2 className="text-gray-500 dark:text-gray-300 font-semibold">
                Full Name
              </h2>

              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </p>
            </div>

          </div>

          {/* Email */}

          <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-lg transition">

            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <FaEnvelope className="text-green-600 dark:text-green-300 text-xl" />
            </div>

            <div className="min-w-0">
              <h2 className="text-gray-500 dark:text-gray-300 font-semibold">
                Email Address
              </h2>

              <p className="text-lg break-all text-gray-900 dark:text-white">
                {user.email}
              </p>
            </div>

          </div>

          {/* User ID */}

          <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-lg transition">

            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <FaIdCard className="text-purple-600 dark:text-purple-300 text-xl" />
            </div>

            <div className="min-w-0">
              <h2 className="text-gray-500 dark:text-gray-300 font-semibold">
                User ID
              </h2>

              <p className="text-sm break-all text-gray-900 dark:text-white">
                {user._id || user.id}
              </p>
            </div>

          </div>

          {/* Button */}

          <button
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-2xl transition duration-300"
          >
            <FaEdit />
            Edit Profile
          </button>

        </div>
      </div>
    </div>
  );
}

export default Profile;