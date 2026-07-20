import { useEffect, useState } from "react";
import axios from "axios";

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
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">
          Loading Profile...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6 md:py-10">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        <div className="flex flex-col items-center">

          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl sm:text-5xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mt-5 text-center">
            {user.name}
          </h1>

          <p className="text-gray-500 text-center break-all">
            {user.email}
          </p>

        </div>

        <div className="mt-10 space-y-5">

          <div className="border rounded-xl p-4">
            <h2 className="font-semibold text-gray-600">
              Name
            </h2>

            <p className="text-lg sm:text-xl break-words">
              {user.name}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold text-gray-600">
              Email
            </h2>

            <p className="text-xl">
              {user.email}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold text-gray-600">
              User ID
            </h2>

            <p className="text-sm break-all">
              {user._id || user.id}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;