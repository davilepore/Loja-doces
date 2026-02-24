import AboutUs from "./_components/AboutUs";
import HeroCarousel from "./_components/HeroCarousel";
import Navbar from "./_components/Navbar";
import SweetTypes from "./_components/SweetTypes";

export default function Home() {
  return (
    <div>
      <Navbar />

      <HeroCarousel />

      <SweetTypes />

      <AboutUs />
    </div>
  );
}
