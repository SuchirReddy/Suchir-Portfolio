import { ArrowRight } from "lucide-react";
import { Button } from "./button";

export const ContactButton = () => {
  return (
    <Button 
      href="#contact" 
      size="lg"
      className="uppercase tracking-widest text-xs sm:text-sm md:text-base px-8 sm:px-10 md:px-12 group"
    >
      Get in Touch <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
    </Button>
  );
};
