import {
  FaShippingFast,
  FaCreditCard,
  FaAward,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: (
        <FaShippingFast className="text-5xl sm:text-6xl text-blue-600" />
      ),
      title: "Fast Delivery",
      description:
        "Get your products delivered quickly and safely across India with our trusted delivery partners.",
    },
    {
      icon: (
        <FaCreditCard className="text-5xl sm:text-6xl text-green-600" />
      ),
      title: "Secure Payment",
      description:
        "Enjoy 100% secure checkout with trusted payment gateways and encrypted transactions.",
    },
    {
      icon: (
        <FaAward className="text-5xl sm:text-6xl text-yellow-500" />
      ),
      title: "Premium Quality",
      description:
        "Every product is carefully selected to ensure the best quality, durability and value for money.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        Why Choose ShopSphere?
      </h2>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        We make online shopping simple, secure and enjoyable by offering
        premium products, fast delivery and a trusted shopping experience.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-7 text-center border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center shadow-sm">
                {feature.icon}
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              {feature.title}
            </h3>

            <p className="text-gray-600 leading-7">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;