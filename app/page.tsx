import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import EventInfo from "@/components/EventInfo";
import RSVP from "@/components/RSVP";
import Story from "@/components/Story"; // Protagonistas section
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory scroll-smooth">
      <Navbar />
      <Hero />
      <Countdown />
      <EventInfo />
      <RSVP />
      <Story />
      <Footer />
    </main>
  );
}
