import HeroSection from "../components/home/HeroSection";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WelcomeSection from "../components/home/WelcomeSection";
import Stats from "../components/home/Stats";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/home/Footer";

function Home() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden transition-all duration-300">
      {/* Hero Banner */}
      <HeroSection />

      {/* Categories - Moved Up for Better UX */}
      <Categories />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Welcome Section */}
      <WelcomeSection />

      {/* Stats */}
      <Stats />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default Home;