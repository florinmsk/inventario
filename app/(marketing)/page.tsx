import Navbar from '@/components/marketing/Navbar';
import Hero from '@/components/marketing/Hero';
import LogoTicker from '@/components/marketing/LogoTicker';
import Introduction from '@/components/marketing/Introduction';
// import Features from '@/components/marketing/Features';
// import Faqs from '@/components/marketing/Faqs';
import CallToAction from '@/components/marketing/CallToAction';
import Footer from '@/components/marketing/Footer';

export default function HomePage() {
    return (
        <>
            <Navbar />
            <Hero />
            <LogoTicker />
            <Introduction />
            {/* <Features /> */}
            {/* <Faqs /> */}
            <CallToAction />
            <Footer />
        </>
    );
}
