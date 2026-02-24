import Contact from "./_components/Contact";
import AboutUs from "./_components/AboutUs";
import HeroCarousel from "./_components/HeroCarousel";

import SweetTypes from "./_components/SweetTypes";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div>
      <HeroCarousel />

      <SweetTypes />

      <AboutUs />

      <Contact />

      <Footer />
    </div>
  );
}
