import { FaEnvelopeOpenText } from "react-icons/fa";

function Newsletter() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-gray-900 via-slate-900 to-blue-950">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">

          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
              <FaEnvelopeOpenText className="text-white text-4xl" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mt-8">
            Subscribe to our Newsletter
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-center mt-4 max-w-2xl mx-auto leading-7">
            Stay updated with our latest products, exclusive offers,
            exciting discounts and special deals delivered directly
            to your inbox.
          </p>

          {/* Input */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 max-w-lg px-6 py-4 rounded-xl outline-none text-gray-800 bg-white shadow-lg focus:ring-4 focus:ring-blue-500 transition"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300">
              Subscribe
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Newsletter;