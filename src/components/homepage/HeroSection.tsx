import Link from "next/link";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/abstract-blur-wedding-hall.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Our Special Event!
        </h1>
        <p className="text-xl mb-8">
          Don&apos;t miss out on this event! Sign up today and enjoy exclusive
          opportunities.
        </p>
        <Link
          className="bg-white text-blue-900 py-2 px-4 rounded hover:bg-gray-200 font-bold text-lg"
          href="/events"
        >
          Check Our Events
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
