import { Github, Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative overflow-hidden border-t border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-[#020202] pt-24 pb-12">
      {/* Massive Background Text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-10 dark:opacity-5">
        <h2 className="font-black text-[20vw] leading-none whitespace-nowrap tracking-tighter uppercase">
          SUCHIR REDDY
        </h2>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        {/* Top Section: CTA */}
        <div className="mb-20 md:mb-32">
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-zinc-900 dark:text-white mb-6">
            Let's build something <br className="hidden md:block" />
            <span className="text-lime-500">extraordinary.</span>
          </h3>
          <a
            href="mailto:tipireddysuchirreddy@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold hover:bg-lime-500 hover:text-white dark:hover:bg-lime-400 dark:hover:text-zinc-900 transition-colors"
          >
            Start a conversation <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Bottom Section: Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 justify-between items-start">
          {/* Left: Socials */}
          <div className="flex flex-row flex-wrap gap-x-8 gap-y-4">
            <h4 className="text-xs font-bold tracking-widest text-zinc-400 uppercase w-full mb-1">Connect</h4>
            <a
              href="https://www.instagram.com/suchirreddy?igsh=MWU2Nm1yYThtNmZkaQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-zinc-600 dark:text-zinc-400 transition-all duration-300 ease-out hover:-translate-y-1 active:scale-95 w-fit"
            >
              <div className="p-2 rounded-full bg-black/5 dark:bg-white/5 transition-all duration-300 group-hover:bg-lime-500/10 group-hover:text-lime-500 group-hover:shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                <Instagram className="w-4 h-4 transition-transform group-hover:rotate-6 group-hover:scale-110" />
              </div>
              <span className="font-medium text-sm group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">@suchirreddy</span>
            </a>

            <a
              href="https://www.instagram.com/vyuhavarahi?igsh=aWY0dmdyNmhlMDk3"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-zinc-600 dark:text-zinc-400 transition-all duration-300 ease-out hover:-translate-y-1 active:scale-95 w-fit"
            >
              <div className="p-2 rounded-full bg-black/5 dark:bg-white/5 transition-all duration-300 group-hover:bg-lime-500/10 group-hover:text-lime-500 group-hover:shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                <Instagram className="w-4 h-4 transition-transform group-hover:rotate-6 group-hover:scale-110" />
              </div>
              <span className="font-medium text-sm group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">@VyuhaVarahi</span>
            </a>

            <a
              href="https://www.instagram.com/aveils.ai?igsh=MXhveG5qZzl5NnZ3Yg=="
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-zinc-600 dark:text-zinc-400 transition-all duration-300 ease-out hover:-translate-y-1 active:scale-95 w-fit"
            >
              <div className="p-2 rounded-full bg-black/5 dark:bg-white/5 transition-all duration-300 group-hover:bg-lime-500/10 group-hover:text-lime-500 group-hover:shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                <Instagram className="w-4 h-4 transition-transform group-hover:rotate-6 group-hover:scale-110" />
              </div>
              <span className="font-medium text-sm group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">@Aveils.ai</span>
            </a>

            <a
              href="https://github.com/SuchirReddy"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-zinc-600 dark:text-zinc-400 transition-all duration-300 ease-out hover:-translate-y-1 active:scale-95 w-fit"
            >
              <div className="p-2 rounded-full bg-black/5 dark:bg-white/5 transition-all duration-300 group-hover:bg-lime-500/10 group-hover:text-lime-500 group-hover:shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                <Github className="w-4 h-4 transition-transform group-hover:rotate-6 group-hover:scale-110" />
              </div>
              <span className="font-medium text-sm group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">@SuchirReddy</span>
            </a>

            <a
              href="https://www.linkedin.com/in/suchir-r-598768396/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-zinc-600 dark:text-zinc-400 transition-all duration-300 ease-out hover:-translate-y-1 active:scale-95 w-fit"
            >
              <div className="p-2 rounded-full bg-black/5 dark:bg-white/5 transition-all duration-300 group-hover:bg-lime-500/10 group-hover:text-lime-500 group-hover:shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                <Linkedin className="w-4 h-4 transition-transform group-hover:rotate-6 group-hover:scale-110" />
              </div>
              <span className="font-medium text-sm group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">SuchirReddy</span>
            </a>

            <a
              href="mailto:tipireddysuchirreddy@gmail.com"
              className="group flex items-center gap-3 text-zinc-600 dark:text-zinc-400 transition-all duration-300 ease-out hover:-translate-y-1 active:scale-95 w-fit"
            >
              <div className="p-2 rounded-full bg-black/5 dark:bg-white/5 transition-all duration-300 group-hover:bg-lime-500/10 group-hover:text-lime-500 group-hover:shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                <Mail className="w-4 h-4 transition-transform group-hover:rotate-6 group-hover:scale-110" />
              </div>
              <span className="font-medium text-sm group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">Email</span>
            </a>
          </div>

          {/* Right side: Copyright & Brand */}
          <div className="flex flex-col items-start md:items-end gap-6 md:h-full md:justify-end">
            <div className="flex flex-col items-start md:items-end gap-2">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                © {currentYear} Suchir Reddy.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                All rights reserved.
              </p>
            </div>
            <p className="text-zinc-400 dark:text-zinc-500 text-xs px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
              Designed & Built By <span className="text-lime-500 font-bold">Suchir Reddy</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
