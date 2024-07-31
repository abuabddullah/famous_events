import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HomeFAQaccord = () => {
  return (
    <section
      style={{
        backgroundImage: "url('/assets/event as bg.jpg')",
      }}
      className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white"
    >
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">
          Famous Events Questions
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">
          FAQ that you wanted to know from us .....
        </p>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default HomeFAQaccord;
