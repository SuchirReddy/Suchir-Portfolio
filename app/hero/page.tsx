import { FadeIn } from '@/components/ui/FadeIn';
import { ContactButton } from '@/components/ui/ContactButton';
import { Magnet } from '@/components/ui/Magnet';

export default function HeroSection() {
  return (
    <section id="hero" className="h-screen flex flex-col overflow-x-clip relative mb-24 sm:mb-32 md:mb-48 pt-24 md:pt-32" style={{ fontFamily: "'Kanit', sans-serif" }}>

      {/* Heading */}
      <div className="overflow-hidden mt-2 sm:mt-4 md:mt-6 z-20 flex-1 flex flex-col">
        <FadeIn delay={0.15} y={40} className="w-full text-center">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-[11vw] sm:text-[12vw] md:text-[13.5vw] lg:text-[15vw]">
            Hi, i&apos;m suchir
          </h1>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-20 translate-y-16 sm:translate-y-24 md:translate-y-32">
        <FadeIn delay={0.35} y={20} className="w-full max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
          <p className="animate-text-breathe font-light uppercase tracking-wide leading-snug" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
            A Founder Who turns ambitious ideas into scalable products, systems, and ventures.
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Hero Portrait */}
      <div className="absolute left-1/2 -translate-x-1/2 flex justify-center z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-[65%] -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:-bottom-24 md:-bottom-32">
        <FadeIn
          delay={0.6}
          y={30}
          className="w-full flex justify-center"
        >
          <Magnet padding={150} strength={3}>
            <img
              src="/image_nobg.png"
              alt="Suchir Animated Portrait"
              className="w-full h-auto object-contain"
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
};
