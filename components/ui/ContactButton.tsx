import { Button } from "./button";

export const ContactButton = () => {
  return (
    <Button 
      href="#contact" 
      size="lg"
      className="uppercase tracking-widest text-xs sm:text-sm md:text-base px-8 sm:px-10 md:px-12"
    >
      Contact Me
    </Button>
  );
};
