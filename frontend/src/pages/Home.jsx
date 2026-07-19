import HeroSection from "../components/home/HeroSection";
import WelcomeSection from "../components/home/WelcomeSection";
import Stats from "../components/home/Stats";
import WhyChooseUs from "../components/home/WhyChooseUs";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Categories from "../components/home/Categories";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/home/Footer";

function Home() {
  return (
    <main className="bg-gray-50 overflow-x-hidden">
      <HeroSection />
      <WelcomeSection />
      <Stats />
      <WhyChooseUs />
      <FeaturedProducts />
      <Categories />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}

export default Home;