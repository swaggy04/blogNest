import Features from "@/components/home/feature";
import Footer from "@/components/home/Footer";
import { Navbar } from "@/components/home/header/navbar";
import HeroSection from "@/components/home/hero-section";
import  Toparticle  from "@/components/home/Top-article";

export default function Home() {
  return (
    <div>
     <Navbar/>
     <HeroSection/>
     <Toparticle/>
      <Features/>
     <Footer/>
    </div>
  );
}
