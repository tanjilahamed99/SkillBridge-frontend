import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/pages/Home/Hero";
import Treushed from "@/pages/Home/Treushed";
import Features from "@/pages/Home/Features";
import Popular from "@/pages/Home/Popular";
import Stats from "@/pages/Home/Stats";
import CTA from "@/pages/Home/CTA";
import Testimonials from "@/pages/Home/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Treushed />
      <Features />
      <Popular />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
