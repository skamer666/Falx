import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import ServicesList from "@/components/site/ServicesList";
import KeyFacts from "@/components/site/KeyFacts";
import HowItWorks from "@/components/site/HowItWorks";
import B2BOffer from "@/components/site/B2BOffer";
import HomeFaq from "@/components/site/HomeFaq";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <ServicesList />
        <KeyFacts />
        <HowItWorks />
        <B2BOffer />
        <HomeFaq />
      </main>
      <Footer />
    </>
  );
}
