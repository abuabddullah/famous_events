"use client";

import HeroSection from "@/components/homepage/HeroSection";
import HomeCarousel from "@/components/homepage/HomeCarousel";
import HomeFAQaccord from "@/components/homepage/HomeFAQaccord";
import HomeFeaturedEvents from "@/components/homepage/HomeFeaturedEvents";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HomeFeaturedEvents />
      <HomeCarousel />
      <HomeFAQaccord />
    </main>
  );
}
