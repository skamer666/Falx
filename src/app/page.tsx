import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Blocks from "@/components/site/Blocks";
import Essential from "@/components/site/Essential";
import FinalCta from "@/components/site/FinalCta";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Blocks />
        <Essential />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
