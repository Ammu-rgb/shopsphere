import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaEnvelope,
  FaIdCard,
  FaUser,
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
      <div className="flex justify-center items-center h-screen bg-gray-100">
  <div className="text-center">
    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

    <h1 className="mt-6 text-2xl font-bold">
      Loading Profile...
    </h1>
  </div>
</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6 md:py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-10 flex flex-col items-center">

  <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-xl">

    <FaUserCircle className="text-7xl text-blue-700" />

  </div>

  <h1 className="text-3xl font-bold mt-5">
    {user.name}
  </h1>

  <p className="text-blue-100 mt-2 break-all px-4 text-center">
    {user.email}
  </p>

</div>

        <div className="p-8 space-y-5">

          <FaUser className="text-3xl text-blue-600" />

<div>
  <h2 className="text-gray-500 font-semibold">
    Full Name
  </h2>

  <p className="text-xl font-bold">
    {user.name}
  </p>
</div>

          <div className="flex items-center gap-4 border rounded-2xl p-5 hover:shadow-lg transition">
            <h2 className="font-semibold text-gray-600">
              Email
            </h2>

            <p className="text-xl">
              {user.email}
            </p>
          </div>

          <FaIdCard className="text-3xl text-purple-600" />

<div>
  <h2 className="text-gray-500 font-semibold">
    User ID
  </h2>

  <p className="text-sm break-all">
    {user._id || user.id}
  </p>
</div>
<div className="p-8 pt-0">

  <button
    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition"
  >
    Edit Profile
  </button>

</div>

        </div>
      </div>
    </div>
  );
}

export default Profile;