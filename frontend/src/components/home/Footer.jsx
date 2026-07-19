function Footer() {
  return (
    <footer className="bg-black text-white py-12 sm:py-14">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo */}

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            ShopSphere 🛒
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-7">
            Your one-stop destination for premium quality products
            at affordable prices.
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Wishlist</li>
          </ul>
        </div>

        {/* Support */}

        <div>
          <h3 className="text-xl font-bold mb-4">
            Customer Support
          </h3>

          <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
            <li>Help Center</li>
            <li>Track Order</li>
            <li>Returns</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3 className="text-xl font-bold mb-4">
            Contact
          </h3>

          <p className="text-gray-400 text-sm sm:text-base">
            📧 support@shopsphere.com
          </p>

          <p className="text-gray-400 text-sm sm:text-base mt-2">
            📞 +91 9871395538
          </p>

          <div className="flex gap-4 text-2xl sm:text-3xl mt-6">
            <span>📘</span>
            <span>📸</span>
            <span>🐦</span>
            <span>▶️</span>
          </div>

        </div>

      </div>

      <hr className="border-gray-700 my-8" />

      <p className="text-center text-gray-500 text-sm sm:text-base px-5">
        © 2026 ShopSphere. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;