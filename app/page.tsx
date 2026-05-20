import Contact from "./_components/Contact";
import AboutUs from "./_components/AboutUs";
import HeroCarousel from "./_components/HeroCarousel";
import SweetTypes from "./_components/SweetTypes";
import Footer from "./_components/Footer";
import EventosEspeciais from "./_components/EventosEspeciais";

export default function Home() {
  return (
    <div className="z-10 bg-[#fdfaf8]">
      <HeroCarousel />

      <SweetTypes />

      <EventosEspeciais />

      <AboutUs />

      <Contact />

      <Footer />
    </div>
  );
}
