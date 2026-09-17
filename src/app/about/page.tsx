"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Cpu, Terminal, ShieldCheck, Sparkle, Globe, Code } from "@phosphor-icons/react";
import Grainient from "@/components/Grainient";

export default function AboutUs() {
  return (
    <div className="min-h-screen relative w-full overflow-x-clip text-black">
      <div className="scanline"></div>

      {/* Global Background - Identical to Landing Page */}
      <div className="fixed -inset-[150px] pointer-events-none z-[-1] overflow-hidden">
        <Grainient
          color1="#a8afe0"
          color2="#8b83ab"
          color3="#aa8ec4"
          timeSpeed={0.9}
          colorBalance={-0.06}
          warpStrength={0.8}
          warpFrequency={2}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Navigation Bar (Identical style to Landing Page) */}
      <nav className="sticky top-0 w-full border-y-2 sm:border-y-4 grid-line backdrop-blur-md bg-white/30 z-50 overflow-x-auto no-scrollbar">
        <div className="flex w-full items-stretch h-14 sm:h-16">
          <Link
            href="/"
            className="flex items-center justify-center border-solid grid-line hover:bg-accent/20 transition-colors overflow-hidden flex-shrink-0 w-[52px] sm:w-[84px] border-r-2 sm:border-r-4"
            aria-label="Return to Home"
          >
            <div className="flex items-center justify-center h-full w-full cursor-pointer outline-none min-w-0 px-2 sm:px-0">
              <Image
                src="/logo.svg"
                alt="Metapoise Logo"
                width={48}
                height={48}
                className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
              />
            </div>
          </Link>
          <Link
            href="/#schedule"
            id="nav-schedule-link"
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs uppercase text-center px-1 sm:px-2 py-1 leading-tight"
          >
            <span className="opacity-70 sm:opacity-100 sm:mr-1">[01]</span>
            <span className="truncate">Schedule</span>
          </Link>
          <Link
            href="/#speakers"
            id="nav-speakers-link"
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs uppercase text-center px-1 sm:px-2 py-1 leading-tight"
          >
            <span className="opacity-70 sm:opacity-100 sm:mr-1">[02]</span>
            <span className="truncate">Speakers</span>
          </Link>
          <Link
            href="/#workshops"
            id="nav-workshops-link"
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs uppercase text-center px-1 sm:px-2 py-1 leading-tight"
          >
            <span className="opacity-70 sm:opacity-100 sm:mr-1">[03]</span>
            <span className="truncate">Workshops</span>
          </Link>
          <Link
            href="/about"
            id="nav-about-link"
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center bg-accent text-black transition-all mono-font text-[10px] sm:text-xs uppercase text-center px-1 sm:px-2 py-1 leading-tight font-bold"
          >
            <span className="mr-1">[04]</span>
            <span className="truncate">About Us</span>
          </Link>
        </div>
      </nav>

      {/* Page Header / Hero Section */}
      <section className="pt-8 md:pt-16 pb-8 px-4 sm:px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b-4 grid-line pb-8">
          <div>
            <div className="mono-font text-xs uppercase tracking-widest text-black/70 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" />
              <span>INDEX: MP_v_2.0 // MISSION STATEMENT</span>
            </div>
            <h1 className="heading-font text-6xl sm:text-7xl md:text-9xl uppercase tracking-tight leading-[0.85]">
              <span className="higuen-font normal-case">ABOUT</span>
              <br />
              METAPOISE
            </h1>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 relative flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="Metapoise Logo"
                width={160}
                height={160}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mono-font text-xs sm:text-sm text-left md:text-right space-y-1">
              <p className="font-bold">DEPARTMENT OF CSE, DUIET</p>
              <p>ANNUAL TECHNICAL SYMPOSIUM</p>
              <p className="text-black/60">OCTOBER 30 — NOVEMBER 01</p>
            </div>
          </div>
        </div>

        {/* Overview Statement & Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b-4 grid-line pb-12 mb-12">
          <div className="max-w-xl">
            <p className="text-xl sm:text-2xl md:text-3xl font-light leading-snug uppercase">
              A celebration of innovation, where ideas meet creativity and
              cutting-edge technology to showcase futuristic solutions that
              shape tomorrow and drive change.
            </p>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-black/80 font-normal">
              METAPOISE V2.0 is the flagship technical convergence hosted by the
              Department of Computer Science and Engineering at Dibrugarh
              University Institute of Engineering and Technology. It serves as a
              crucible for student builders, innovators, researchers, and
              visionaries pushing the envelope across algorithmic design,
              synthetic computation, and emerging architectures.
            </p>
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="border-4 grid-line p-6 bg-white/10 backdrop-blur-xs">
              <span className="mono-font text-xs font-bold block mb-3 text-black/60 uppercase">
                [SYSTEM_SPECIFICATIONS]
              </span>
              <div className="space-y-2 mono-font text-xs sm:text-sm">
                <div className="flex justify-between border-b border-black/20 pb-1">
                  <span className="text-black/60">CONVERGENCE_ID:</span>
                  <span className="font-bold">MP_V2.0_2026</span>
                </div>
                <div className="flex justify-between border-b border-black/20 pb-1">
                  <span className="text-black/60">VENUE:</span>
                  <span className="font-bold">DUIET CAMPUS, DIBRUGARH</span>
                </div>
                <div className="flex justify-between border-b border-black/20 pb-1">
                  <span className="text-black/60">ORGANIZER:</span>
                  <span className="font-bold">DEPT. OF COMPUTER SCIENCE & ENG.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">SECURITY_STATUS:</span>
                  <span className="font-bold text-emerald-700">ENCRYPTED // VERIFIED</span>
                </div>
              </div>
            </div>

            <div className="mono-font text-xs sm:text-sm text-black/80">
              <p>
                From 36-hour hackathons to real-world industrial exhibitions,
                METAPOISE fosters an ecosystem where academic rigour transitions
                directly into impact-driven engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Divider */}
      <div className="w-full max-w-full border-y-4 border-accent py-4 marquee overflow-hidden">
        <div className="marquee-content heading-font text-2xl sm:text-4xl uppercase">
          <span className="mx-8">INNOVATION</span> <span className="">•</span>
          <span className="mx-8">RESEARCH</span> <span className="">•</span>
          <span className="mx-8">COMPUTATION</span> <span className="">•</span>
          <span className="mx-8">DUIET CSE</span> <span className="">•</span>
          <span className="mx-8">SYNERGY</span> <span className="">•</span>
          <span className="mx-8">METAPOISE V2.0</span> <span className="">•</span>
          <span className="mx-8">INNOVATION</span> <span className="">•</span>
          <span className="mx-8">RESEARCH</span> <span className="">•</span>
          <span className="mx-8">COMPUTATION</span> <span className="">•</span>
          <span className="mx-8">DUIET CSE</span> <span className="">•</span>
          <span className="mx-8">SYNERGY</span> <span className="">•</span>
          <span className="mx-8">METAPOISE V2.0</span> <span className="">•</span>
        </div>
      </div>

      {/* Core Pillars / Event Modules Section */}
      <section className="py-16 md:py-24 px-4 sm:px-8 md:px-16 border-b-4 grid-line">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <div>
            <span className="mono-font text-xs text-black/60 block mb-2">[01 // CORE_PILLARS]</span>
            <h2 className="heading-font text-5xl sm:text-7xl uppercase">Flagship Events</h2>
          </div>
          <span className="mono-font text-xs sm:text-sm text-black/60 mt-2 sm:mt-0">
            TOTAL UNITS: 04 // PROTOCOLS INITIALIZED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 grid-line">
          {/* Card 1 */}
          <div className="border-b-4 md:border-r-4 md:border-b-4 grid-line p-8 sm:p-10 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="mono-font text-xs font-bold text-black/60">[UNIT_01]</span>
                <Code weight="bold" className="text-3xl" />
              </div>
              <h3 className="heading-font text-3xl sm:text-4xl uppercase mb-4">
                The Hackathon
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-black/80 font-light">
                An intense, multi-hour sprint challenging developers, algorithmic thinkers,
                and designers to engineer novel prototypes tackling autonomous systems,
                web architectures, and AI primitives.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t-2 border-black/10 mono-font text-xs text-black/60">
              FOCUS: AUTONOMOUS LOGIC // ACCELERATED BUILDS
            </div>
          </div>

          {/* Card 2 */}
          <div className="border-b-4 grid-line p-8 sm:p-10 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="mono-font text-xs font-bold text-black/60">[UNIT_02]</span>
                <Cpu weight="bold" className="text-3xl" />
              </div>
              <h3 className="heading-font text-3xl sm:text-4xl uppercase mb-4">
                Tech-Expo & Workshops
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-black/80 font-light">
                A physical showfloor spotlighting hardware prototypes, IoT installations,
                embedded systems, and synthetic intelligence demonstrations developed by
                student researchers.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t-2 border-black/10 mono-font text-xs text-black/60">
              FOCUS: EMBEDDED SILICON // APPLIED RESEARCH
            </div>
          </div>

          {/* Card 3 */}
          <div className="border-b-4 md:border-b-0 md:border-r-4 grid-line p-8 sm:p-10 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="mono-font text-xs font-bold text-black/60">[UNIT_03]</span>
                <Terminal weight="bold" className="text-3xl" />
              </div>
              <h3 className="heading-font text-3xl sm:text-4xl uppercase mb-4">
                Ideathon
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-black/80 font-light">
                A forum for high-conviction founders and conceptual visionaries to articulate
                transformative technical solutions before panels of faculty, alumni, and tech founders.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t-2 border-black/10 mono-font text-xs text-black/60">
              FOCUS: ARCHITECTURAL DESIGN // VENTURE VECTORS
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-8 sm:p-10 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="mono-font text-xs font-bold text-black/60">[UNIT_04]</span>
                <Globe weight="bold" className="text-3xl" />
              </div>
              <h3 className="heading-font text-3xl sm:text-4xl uppercase mb-4">
                Symposia & Culture
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-black/80 font-light">
                Keynotes, alumni networking forums, open-mic sessions, and workshops curated
                to strengthen community bonds and accelerate knowledge sharing across cohorts.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t-2 border-black/10 mono-font text-xs text-black/60">
              FOCUS: COMMUNITY SYNERGY // KNOWLEDGE MESH
            </div>
          </div>
        </div>
      </section>

      {/* Host Department Overview */}
      <section className="py-16 md:py-24 px-4 sm:px-8 md:px-16 border-b-4 grid-line">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="mono-font text-xs text-black/60 block mb-2">[02 // HOST_ENTITY]</span>
            <h2 className="heading-font text-4xl sm:text-6xl uppercase leading-tight">
              Department of Computer Science and Engineering
            </h2>
            <div className="mt-4 mono-font text-xs text-black/70">
              <p>DUIET, DIBRUGARH UNIVERSITY</p>
              <p>ESTABLISHED: 2009</p>
              <p>ASSAM, INDIA</p>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <p className="text-lg sm:text-xl font-light leading-relaxed">
              The Department of Computer Science &amp; Engineering at DUIET is dedicated
              to creating responsible and skilled thought leaders in computing. Through
              a state-of-the-art education and research ecosystem, a sustainable
              industry-academic interface, and lifelong learning, the department empowers
              graduates to design technically sound, economically feasible, and socially
              conscious computing systems addressing real-world challenges.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t-2 border-black/20 pt-6 mono-font text-xs">
              <div className="border border-black/30 p-4 bg-white/10 flex flex-col justify-between">
                <div>
                  <span className="block text-black/60 mb-1 font-bold">[VISION &amp; MISSION]</span>
                  <p className="font-semibold text-black/90">
                    To create responsible and skilled thought leaders in CSE through a state-of-the-art research ecosystem, industry collaboration, and entrepreneurship.
                  </p>
                </div>
                <div className="mt-3 text-[10px] text-black/50 border-t border-black/10 pt-1">
                  PEO // CRITICAL THINKING &amp; ETHICS
                </div>
              </div>

              <div className="border border-black/30 p-4 bg-white/10 flex flex-col justify-between">
                <div>
                  <span className="block text-black/60 mb-1 font-bold">[06 SPECIALIZED LABS]</span>
                  <p className="font-semibold text-black/90">
                    AI Lab, Network &amp; Security Lab, IoT Lab, Image Processing Lab, and dual Programming Laboratories.
                  </p>
                </div>
                <div className="mt-3 text-[10px] text-black/50 border-t border-black/10 pt-1">
                  INFRA // ROBOTICS, MATROX &amp; NS3
                </div>
              </div>

              <div className="border border-black/30 p-4 bg-white/10 flex flex-col justify-between">
                <div>
                  <span className="block text-black/60 mb-1 font-bold">[CURRICULUM &amp; MOU]</span>
                  <p className="font-semibold text-black/90">
                    Deep curriculum in Algorithms, Network Security, AI &amp; Compilers. MOU with Spoken Tutorial at IIT Bombay (MHRD).
                  </p>
                </div>
                <div className="mt-3 text-[10px] text-black/50 border-t border-black/10 pt-1">
                  PEDAGOGY // ICT-BASED METHODOLOGY
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Return to Home CTA Section */}
      <section className="py-20 md:py-28 flex flex-col items-center justify-center text-center px-4 sm:px-8 border-b-4 grid-line">
        <div className="max-w-3xl w-full">
          <span className="mono-font text-xs uppercase tracking-widest text-black/60 block mb-4">
            [READY_TO_EXPLORE?]
          </span>
          <h2 className="heading-font text-4xl sm:text-6xl md:text-8xl uppercase mb-8">
            Enter the Convergence
          </h2>
          <p className="mono-font text-xs sm:text-sm md:text-base mb-10 max-w-xl mx-auto text-black/80">
            CONNECT WITH MENTORS, BUILDERS, AND VISIONARIES AT METAPOISE V2.0.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              id="about-cta-home"
              className="bg-accent px-8 md:px-14 py-4 md:py-5 text-sm sm:text-base font-black uppercase hover:scale-105 transition-transform flex items-center justify-center gap-3 border-2 border-black"
            >
              <ArrowLeft weight="bold" />
              Return to Mainframe
            </Link>
            <Link
              href="/#schedule"
              id="about-cta-schedule"
              className="bg-white/40 hover:bg-white/80 px-8 md:px-14 py-4 md:py-5 text-sm sm:text-base font-bold uppercase transition-colors flex items-center justify-center gap-3 border-2 border-black"
            >
              View Full Schedule
              <ArrowRight weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer (Identical to Landing Page) */}
      <footer className="py-12 px-4 sm:px-8 md:px-16 border-t-4 grid-line-accent flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="mono-font text-xs uppercase">© 2026 METAPOISE</span>
          <span className="mono-font text-[10px] uppercase mt-1">
            VER: 2.0_BETA // INDEX_MP_v_2.0 // ABOUT_PAGE
          </span>
        </div>

        <div className="flex flex-wrap gap-6 sm:gap-12 justify-center">
          <Link
            href="#"
            id="footer-twitter"
            className="hover:text-accent transition-colors uppercase mono-font text-xs tracking-tighter"
          >
            X
          </Link>
          <Link
            href="#"
            id="footer-discord"
            className="hover:text-accent transition-colors uppercase mono-font text-xs tracking-tighter"
          >
            Discord
          </Link>
          <Link
            href="#"
            id="footer-github"
            className="hover:text-accent transition-colors uppercase mono-font text-xs tracking-tighter"
          >
            Github
          </Link>
        </div>

        <div className="text-center md:text-right flex items-center justify-center md:justify-end gap-4">
          <span className="mono-font text-xs uppercase">
            Secure Connection: True
          </span>
        </div>
      </footer>
    </div>
  );
}
