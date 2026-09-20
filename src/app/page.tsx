import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import HowItWorks from "@/components/site/HowItWorks";
import B2BOffer from "@/components/site/B2BOffer";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <B2BOffer />
      </main>
      <Footer />
    </>
  );
}
