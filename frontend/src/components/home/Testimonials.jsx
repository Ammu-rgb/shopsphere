function Testimonials() {
  const testimonials = [
    {
      name: "Aman Sharma",
      review:
        "Amazing products with super fast delivery. Highly recommended!",
    },
    {
      name: "Priya Verma",
      review:
        "Excellent quality and secure payment. I love shopping here.",
    },
    {
      name: "Rahul Singh",
      review:
        "Best shopping website I've used. Great experience!",
    },
  ];

  return (
    <section className="bg-blue-700 text-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">
          What Our Customers Say ❤️
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-2xl p-6 sm:p-8 shadow-xl hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
            >
              <p className="text-yellow-500 text-lg sm:text-xl">
                ⭐⭐⭐⭐⭐
              </p>

              <p className="mt-4 text-sm sm:text-base text-gray-600 italic leading-6">
                "{item.review}"
              </p>

              <h3 className="mt-5 sm:mt-6 font-bold text-lg sm:text-xl">
                {item.name}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;