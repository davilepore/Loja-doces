import Contact from "./_components/Contact";
import AboutUs from "./_components/AboutUs";
import HeroCarousel from "./_components/HeroCarousel";
import Navbar from "./_components/Navbar";
import SweetTypes from "./_components/SweetTypes";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />

      <HeroCarousel />

      <SweetTypes />

      <AboutUs />

      <Contact />

      <Footer />
    </div>
  );
}
