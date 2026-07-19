function WhyChooseUs() {
  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      description:
        "Get your products delivered quickly and safely anywhere in India.",
    },
    {
      icon: "💳",
      title: "Secure Payment",
      description:
        "100% secure checkout with trusted payment methods.",
    },
    {
      icon: "⭐",
      title: "Premium Quality",
      description:
        "Carefully selected high-quality products at the best prices.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">
        Why Choose ShopSphere?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >
            <div className="text-5xl sm:text-6xl">{feature.icon}</div>

            <h3 className="text-xl sm:text-2xl font-bold mt-5 sm:mt-6">
              {feature.title}
            </h3>

            <p className="text-gray-600 text-sm sm:text-base mt-3 sm:mt-4 leading-6 sm:leading-7">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;