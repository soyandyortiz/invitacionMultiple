import MaintenanceBanner from "@/components/MaintenanceBanner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import EventInfo from "@/components/EventInfo";
import Gallery from "@/components/Gallery";
import Story from "@/components/Story";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory scroll-smooth">
      <MaintenanceBanner />
      <Navbar />
      <Hero />
      <Countdown />
      <EventInfo />
      <Gallery />
      <Story />
      <RSVP />
      <Footer />
    </main>
  );
}
