import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-950 text-white pt-14 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaShoppingCart className="text-3xl text-blue-500" />
            <h2 className="text-3xl font-bold">ShopSphere</h2>
          </div>

          <p className="text-gray-400 leading-7 text-sm sm:text-base">
            Your one-stop destination for premium quality products at affordable
            prices. Shop smarter with a fast, secure and reliable shopping
            experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-5">Quick Links</h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <Link
                to="/"
                className="hover:text-white transition duration-300"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="hover:text-white transition duration-300"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                className="hover:text-white transition duration-300"
              >
                Cart
              </Link>
            </li>

            <li>
              <Link
                to="/wishlist"
                className="hover:text-white transition duration-300"
              >
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-xl font-bold mb-5">
            Customer Support
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-white transition cursor-pointer">
              Help Center
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Track Order
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Returns & Refunds
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-5">
            Contact Us
          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3 text-gray-400">
              <FaEnvelope className="text-blue-500" />
              <span>support@shopsphere.com</span>
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <FaPhoneAlt className="text-green-500" />
              <span>+91 9871395538</span>
            </div>

          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-7">

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-blue-600 transition duration-300 flex items-center justify-center"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-pink-600 transition duration-300 flex items-center justify-center"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-gray-700 transition duration-300 flex items-center justify-center"
            >
              <FaXTwitter />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-red-600 transition duration-300 flex items-center justify-center"
            >
              <FaYoutube />
            </a>

          </div>
        </div>

      </div>

      <hr className="border-gray-800 my-10" />

      <p className="text-center text-gray-500 text-sm">
        © 2026 <span className="font-semibold text-white">ShopSphere</span>. All
        Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;