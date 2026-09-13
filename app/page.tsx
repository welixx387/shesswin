import { Hero } from "@/components/home/Hero";
import { WhySection } from "@/components/home/WhySection";
import { OpeningsSection } from "@/components/home/OpeningsSection";
import { HowItWorks } from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhySection />
      <OpeningsSection />
      <HowItWorks />
    </>
  );
}
