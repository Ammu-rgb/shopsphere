function Newsletter() {
  return (
    <section className="py-14 sm:py-20 bg-gray-900 text-white">

      <div className="max-w-4xl mx-auto text-center px-5 sm:px-8">

        <h2 className="text-3xl sm:text-4xl font-bold mb-5 leading-tight">
          Subscribe to our Newsletter 📧
        </h2>

        <p className="text-gray-300 text-sm sm:text-base mb-8 sm:mb-10 leading-7">
          Get the latest products, exclusive offers and exciting
          discounts directly in your inbox.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-4 rounded-xl text-black w-full sm:w-[380px] lg:w-[450px] outline-none shadow-lg focus:ring-4 focus:ring-blue-400 transition"
          />

          <button
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold transition duration-300 hover:scale-105 shadow-lg"
          >
            Subscribe
          </button>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;