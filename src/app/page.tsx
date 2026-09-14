import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import TrustBar from "@/components/site/TrustBar";
import Problem from "@/components/site/Problem";
import Pillars from "@/components/site/Pillars";
import HowItWorks from "@/components/site/HowItWorks";
import Security from "@/components/site/Security";
import Testimonials from "@/components/site/Testimonials";
import Comparison from "@/components/site/Comparison";
import Pricing from "@/components/site/Pricing";
import Faq from "@/components/site/Faq";
import FinalCta from "@/components/site/FinalCta";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Problem />
        <Pillars />
        <HowItWorks />
        <Security />
        <Testimonials />
        <Comparison />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
