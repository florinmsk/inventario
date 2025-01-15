import CallToAction from "@/components/home/CallToAction";
import Faqs from "@/components/home/Faqs";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Introduction from "@/components/home/Introduction";
import LogoTicker from "@/components/home/LogoTicker";
import Navbar from "@/components/home/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoTicker />
      <Introduction />
      <Features />
      <Faqs />
      <CallToAction />
      <Footer />
    </>
  );
}
