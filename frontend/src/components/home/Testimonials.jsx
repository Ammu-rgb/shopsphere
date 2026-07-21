import { FaQuoteLeft, FaStar, FaUserCircle } from "react-icons/fa";

function Testimonials() {
  const testimonials = [
    {
      name: "Aman Sharma",
      review:
        "Amazing products with super fast delivery. Highly recommended! The quality exceeded my expectations.",
    },
    {
      name: "Priya Verma",
      review:
        "Excellent quality and secure payment. Shopping experience was smooth and delivery was on time.",
    },
    {
      name: "Rahul Singh",
      review:
        "Best shopping website I've used. Great prices, premium products and excellent customer support.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-700 to-indigo-700 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white">
          What Our Customers Say
        </h2>

        <p className="text-center text-blue-100 mt-3 mb-12 max-w-2xl mx-auto">
          Thousands of happy customers trust ShopSphere for premium quality
          products, secure shopping and lightning-fast delivery.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-7 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Quote */}
              <FaQuoteLeft className="text-blue-600 text-3xl mb-5" />

              {/* Review */}
              <p className="text-gray-600 leading-7 italic">
                "{item.review}"
              </p>

              {/* Stars */}
              <div className="flex gap-1 mt-6 text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              {/* User */}
              <div className="flex items-center gap-4 mt-7">

                <FaUserCircle className="text-5xl text-gray-400" />

                <div>
                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Verified Customer
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;