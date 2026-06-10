"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";

// Inline Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// BlurText animation component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

import { useTheme } from "next-themes";

export default function Component() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          currentSection = section.getAttribute("id") || "";
        }
      });

      if (window.scrollY < 300) {
        currentSection = "";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const menuItems = [
    { label: "HOME", href: "#" },
    { label: "PROJECTS", href: "#projects" },
    { label: "JOURNEY", href: "#journey" },
    { label: "SKILLS", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
  ];

  // Prevent hydration mismatch
  if (!mounted) return <div className="min-h-screen bg-[#020202]" />;

  return (
    <div className="min-h-screen transition-colors bg-zinc-50 dark:bg-[#020202] text-zinc-900 dark:text-white">
      {/* Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
        <nav
          className="flex items-center justify-between gap-6 rounded-full border border-white/10 px-6 py-3 shadow-2xl backdrop-blur-md transition-colors"
          style={{
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.4)",
          }}
        >
          {/* Signature / Logo */}
          <div className="text-2xl mr-4" style={{ color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)", fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
            SR
          </div>

          {/* Nav Items (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => {
              const isHighlight = item.href === `#${activeSection}` || (item.href === "#" && activeSection === "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold tracking-wide transition-colors duration-300"
                  style={{
                    color: isHighlight ? "#A3E635" : isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#A3E635";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isHighlight ? "#A3E635" : (isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)");
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Theme Toggle (Sun/Moon) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-300 ml-2 hover:opacity-80"
            style={{ color: isDark ? "white" : "black" }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Floating Menu Button */}
      <div className="fixed bottom-6 right-6 z-[60] md:hidden">
        <button
          ref={buttonRef}
          type="button"
          className="p-3 rounded-full border border-white/10 shadow-2xl backdrop-blur-md transition-colors duration-300 flex items-center justify-center"
          style={{
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.4)",
            color: isDark ? "white" : "black"
          }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 transition-colors duration-300" strokeWidth={2} />
          ) : (
            <Menu className="w-6 h-6 transition-colors duration-300" strokeWidth={2} />
          )}
        </button>

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute bottom-full right-0 w-[200px] border border-white/10 shadow-2xl mb-4 p-4 rounded-2xl z-[100] backdrop-blur-xl origin-bottom-right"
            style={{
              backgroundColor: isDark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.9)",
            }}
          >
            {menuItems.map((item) => {
              const isHighlight = item.href === `#${activeSection}` || (item.href === "#" && activeSection === "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-lg font-bold tracking-tight py-2 px-2 cursor-pointer transition-colors duration-300"
                  style={{
                    color: isHighlight ? "#A3E635" : isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#A3E635";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isHighlight ? "#A3E635" : (isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)");
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col">
        {/* Centered Main Name - Always Perfectly Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center">
            <div>
              <BlurText
                text="SUCHIR"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[18vw] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#A3E635", fontFamily: "'Fira Code', monospace" }}
              />
            </div>
            <div>
              <BlurText
                text="REDDY"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[18vw] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#A3E635", fontFamily: "'Fira Code', monospace" }}
              />
            </div>

            {/* Profile Picture */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <div className="w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl bg-white/5 relative pointer-events-auto transition-opacity hover:opacity-90 cursor-pointer">
                <img
                  src="/founder-portrait.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tagline - Proper Distance Below Hero */}
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32 xl:bottom-36 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            <BlurText
              text="Founder @Aveils,Vyuhavarahi - Building AI Products & Systems."
              delay={150}
              animateBy="words"
              direction="top"
              className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white"
              style={{ fontFamily: "'Antic', sans-serif" }}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-300" />
        </button>
      </main>
    </div>
  );
}
