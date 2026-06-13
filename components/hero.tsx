"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { Button } from "@/components/ui/button";

import type { SiteSettings } from "@prisma/client";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const floatingCards = [
  {
    label: "Nextra",
    detail: "Product systems",
    className: "left-[7%] top-[29%] hidden lg:flex",
    depth: 1.1,
  },
  {
    label: "Vyuhavarahi",
    detail: "Founder build",
    className: "right-[7%] top-[30%] hidden lg:flex",
    depth: -1.2,
  },
  {
    label: "AI Products",
    detail: "Applied intelligence",
    className: "left-[4%] bottom-[17%] hidden xl:flex",
    depth: -0.7,
  },
  {
    label: "Full Stack Development",
    detail: "Craft to scale",
    className: "right-[4%] bottom-[17%] hidden xl:flex",
    depth: 0.8,
  },
];

const particles = [
  [12, 24, 0.26, 12],
  [21, 68, 0.16, 8],
  [28, 18, 0.22, 10],
  [37, 79, 0.12, 9],
  [44, 31, 0.2, 7],
  [53, 14, 0.18, 12],
  [58, 72, 0.16, 10],
  [66, 24, 0.22, 8],
  [74, 64, 0.14, 12],
  [83, 34, 0.2, 9],
  [91, 75, 0.18, 11],
  [7, 82, 0.14, 8],
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

function useParallax(value: MotionValue<number>, amount: number) {
  return useTransform(value, [-1, 1], [-amount, amount]);
}

function FloatingCard({
  card,
  index,
  smoothX,
  smoothY,
}: {
  card: (typeof floatingCards)[number];
  index: number;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}) {
  const x = useParallax(smoothX, 20 * card.depth);
  const y = useParallax(smoothY, -16 * card.depth);

  return (
    <motion.div
      className={`absolute z-20 ${card.className}`}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.8, delay: 0.95 + index * 0.08 },
        scale: { duration: 0.8, delay: 0.95 + index * 0.08 },
      }}
    >
      <motion.div
        className="flex min-w-52 items-center justify-between gap-5 rounded-2xl border border-white/12 bg-white/[0.075] px-4 py-3 shadow-glass backdrop-blur-2xl"
        animate={{ y: [0, -10, 0] }}
        transition={{
          y: {
            duration: 5.5 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.25,
          },
        }}
      >
        <div>
          <p className="text-sm font-semibold text-white">{card.label}</p>
          <p className="mt-1 text-xs text-white/45">{card.detail}</p>
        </div>
        <span className="h-2.5 w-2.5 rounded-full bg-lime-200 shadow-[0_0_22px_rgba(217,255,75,0.9)]" />
      </motion.div>
    </motion.div>
  );
}

export function Hero({ settings }: { settings?: SiteSettings | null }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 26, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 26, mass: 0.4 });

  const titleX = useParallax(smoothX, 18);
  const titleY = useParallax(smoothY, 10);
  const portraitX = useParallax(smoothX, -28);
  const portraitY = useParallax(smoothY, -18);
  const glowX = useParallax(smoothX, 46);
  const glowY = useParallax(smoothY, 32);

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#020202] text-white"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
        pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
      }}
    >
      {settings?.heroImage && (
        <div className="absolute inset-0 opacity-20 mix-blend-luminosity pointer-events-none">
          <Image
            src={settings.heroImage}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <motion.div
        className="pointer-events-none absolute inset-0 animate-mesh-shift opacity-95"
        style={{ x: glowX, y: glowY }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(206,255,48,0.34),transparent_22%),radial-gradient(circle_at_22%_28%,rgba(66,255,215,0.2),transparent_21%),radial-gradient(circle_at_76%_22%,rgba(255,255,255,0.15),transparent_18%),radial-gradient(circle_at_66%_78%,rgba(141,95,255,0.18),transparent_22%),linear-gradient(180deg,#020202_0%,#050505_42%,#020202_100%)]" />
        <div className="absolute inset-x-[-12%] top-[18%] h-[42%] rotate-[-9deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),rgba(211,255,63,0.14),transparent)] blur-3xl" />
      </motion.div>

      <div className="hero-noise pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.42)_58%,rgba(0,0,0,0.9)_100%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-6 bottom-6 rounded-[2rem] border border-white/[0.06] shadow-[inset_0_0_80px_rgba(255,255,255,0.025)] sm:inset-x-10" />

      {particles.map(([left, top, opacity, duration], index) => (
        <motion.span
          key={`${left}-${top}`}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-white"
          style={{ left: `${left}%`, top: `${top}%`, opacity }}
          animate={{ y: [0, -16, 0], opacity: [opacity, opacity + 0.17, opacity] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.28,
          }}
        />
      ))}

      <motion.nav
        className="fixed left-4 right-4 top-5 z-40 mx-auto flex max-w-3xl items-center justify-between rounded-full border border-white/12 bg-white/[0.07] px-4 py-3 shadow-glass backdrop-blur-2xl sm:top-7 sm:px-5"
        initial={{ opacity: 0, y: -18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease }}
      >
        <a href="#" className="flex items-center gap-2 text-sm font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-lime-200/25 bg-lime-200/10 text-lime-200 shadow-neon">
            {settings?.name?.slice(0, 2).toUpperCase() || "SR"}
          </span>
          <span className="hidden text-white/82 sm:inline">{settings?.name || "Suchir Reddy"}</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              href={link.href}
              key={link.label}
              className="rounded-full px-4 py-2 text-sm text-white/60 transition duration-300 hover:bg-white/[0.08] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#"
          className="inline-flex h-9 items-center gap-2 rounded-full border border-white/12 bg-black/20 px-4 text-sm text-white/76 transition duration-300 hover:border-lime-200/45 hover:text-lime-100"
        >
          Founder mode
          <Sparkles className="h-3.5 w-3.5" />
        </a>
      </motion.nav>

      <section className="relative z-10 grid min-h-screen place-items-center px-5 pb-10 pt-28 sm:px-8 lg:px-12">
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center">
          <div className="absolute left-1/2 top-[42%] z-20 -translate-x-1/2 -translate-y-1/2 [@media(max-width:480px)]:top-[39%]">
            <motion.div
              className="relative h-44 w-44 rounded-full border border-white/15 bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_34px_110px_rgba(0,0,0,0.85),0_0_90px_rgba(211,255,64,0.18)] sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72 xl:h-80 xl:w-80 [@media(max-height:760px)]:h-60 [@media(max-height:760px)]:w-60 [@media(max-width:480px)]:h-36 [@media(max-width:480px)]:w-36"
              style={{ x: portraitX, y: portraitY }}
              initial={{ opacity: 0, scale: 0.72, rotate: -8, filter: "blur(16px)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.25, ease, delay: 0.35 }}
            >
              <div className="absolute -inset-4 rounded-full bg-[conic-gradient(from_180deg,transparent,rgba(211,255,64,0.38),rgba(63,255,225,0.16),transparent)] blur-xl" />
              <div className="portrait-mask absolute inset-0 overflow-hidden rounded-full isolate [transform:translateZ(0)]">
                <Image
                  src={settings?.profileImage || "/founder-portrait.jpg"}
                  alt="Stylized portrait of Suchir Reddy"
                  fill
                  sizes="(max-width: 768px) 14rem, 20rem"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-[linear-gradient(130deg,rgba(255,255,255,0.16),transparent_38%,rgba(255,255,255,0.08)_72%,transparent)]" />
            </motion.div>
          </div>

          <motion.div
            className="relative z-10 flex flex-col items-center text-center"
            style={{ x: titleX, y: titleY }}
          >
            <div className="overflow-hidden">
              <motion.h1
                className="font-display text-[4.8rem] font-black uppercase leading-[0.78] text-lime-300 sm:text-[7.4rem] md:text-[9.8rem] lg:text-[12rem] xl:text-[15rem] 2xl:text-[17rem] [@media(max-height:760px)]:text-[9.8rem] [@media(max-width:480px)]:text-[3.65rem]"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease, delay: 0.12 }}
              >
                SUCHIR
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                className="font-display text-[5.35rem] font-black uppercase leading-[0.78] text-lime-300 sm:text-[8.25rem] md:text-[10.9rem] lg:text-[13.35rem] xl:text-[16.7rem] 2xl:text-[18.9rem] [@media(max-height:760px)]:text-[10.9rem] [@media(max-width:480px)]:text-[4.05rem]"
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease, delay: 0.2 }}
              >
                REDDY
              </motion.h1>
            </div>
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease, delay: 0.9 }}
            />
          </motion.div>

          <motion.div
            className="relative z-30 mt-8 flex max-w-3xl flex-col items-center gap-5 text-center sm:mt-9 [@media(max-height:760px)]:mt-5 [@media(max-height:760px)]:gap-3"
            initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.95, ease, delay: 0.72 }}
          >
            <p className="text-balance max-w-2xl text-lg font-medium text-white/76 sm:text-xl md:text-2xl [@media(max-width:480px)]:text-sm">
              Building AI Products, Web Applications & Digital Experiences
            </p>
            <p className="text-balance max-w-2xl text-sm leading-7 text-white/46 sm:text-base [@media(max-width:480px)]:text-xs [@media(max-width:480px)]:leading-5">
              Passionate developer focused on creating modern software, startup
              products, and exceptional user experiences.
            </p>
            <div className="flex flex-col items-center gap-3 pt-1 sm:flex-row">
              <Button size="lg" href="#projects">
                View Projects
                <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              <Button size="lg" variant="secondary" href="#contact">
                Contact Me
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {floatingCards.map((card, index) => (
        <FloatingCard
          key={card.label}
          card={card}
          index={index}
          smoothX={smoothX}
          smoothY={smoothY}
        />
      ))}

      <motion.div
        className="absolute bottom-6 left-1/2 z-30 hidden flex-col items-center gap-2 text-white/38 [@media(min-height:760px)]:flex"
        style={{ x: "-50%" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.25 }}
      >
        <span className="text-[0.65rem] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.06] backdrop-blur-xl"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </main>
  );
}
