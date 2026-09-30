import AboutSection from "../components/home/AboutSection";
import CTASection from "../components/home/CTASection";
import HeroSection from "../components/home/HeroSection";
import HighlightsSection from "../components/home/HighlightsSection";
import HowToParticipate from "../components/home/HowToParticipate";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HighlightsSection />
      <HowToParticipate />
      <CTASection />
      <Footer />
    </main>
  );
}
