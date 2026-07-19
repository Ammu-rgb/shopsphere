function Stats() {
  const stats = [
    {
      number: "500+",
      title: "Products",
      color: "text-blue-600",
    },
    {
      number: "10K+",
      title: "Customers",
      color: "text-green-600",
    },
    {
      number: "99%",
      title: "Happy Buyers",
      color: "text-purple-600",
    },
    {
      number: "24/7",
      title: "Support",
      color: "text-red-600",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

        {stats.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >

            <h2 className={`text-3xl sm:text-4xl font-extrabold ${item.color}`}>
              {item.number}
            </h2>

            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 font-medium">
              {item.title}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Stats;