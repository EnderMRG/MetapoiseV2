"use client";

import { useRef, useState } from "react";
import { ArrowRight, Code, Cpu, Globe, RocketLaunch, Sparkle, Terminal } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import Grainient from "@/components/Grainient";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // All transforms driven by scroll: 0px (top) → 300px
  const logoRotate = useTransform(scrollY, [0, 300], [0, 180]);
  const logoScale = useTransform(scrollY, [0, 300], [1, 0.5]);
  const logoOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const navLogoOpacity = useTransform(scrollY, [200, 400], [0, 1]);
  const navLogoWidth = useTransform(scrollY, [200, 400], ["0px", "84px"]);
  const navLogoBorder = useTransform(scrollY, [200, 400], ["0px", "4px"]);
  return (
    <div className="min-h-screen relative w-full overflow-x-clip">
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      <div className="scanline"></div>

      {/* Global Background */}
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

      <div className={`transition-opacity duration-700 ${isLoading ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="pt-8 md:pt-12 pb-8 flex flex-col justify-center px-4 sm:px-8 md:px-16 min-h-[50dvh]"
        >
          <div className="mb-8 mt-4 flex flex-col md:flex-row justify-center md:justify-between items-center gap-8 md:gap-0">
            <motion.div
              style={{
                rotate: logoRotate,
                scale: logoScale,
                opacity: logoOpacity,
              }}
              className="w-48 sm:w-3/4 md:w-[25vw] flex-shrink-0 origin-center"
              initial={false}
            >
              <Image
                src="/logo.svg"
                alt="Metapoise Logo"
                width={300}
                height={300}
                className="w-full h-auto object-contain"
              />
            </motion.div>
            <h1 className="heading-font text-[10vw] md:text-[12vw] leading-[0.85] uppercase text-center md:text-right">
              <span className="higuen-font normal-case">
                METAPOISE
                <br /> V2.0
              </span>
            </h1>
          </div>
        </section>

        {/* Sticky Navigation */}
        <nav className="sticky top-0 w-full border-y-2 sm:border-y-4 grid-line backdrop-blur-md bg-white/30 z-50 overflow-x-auto no-scrollbar">
          <div className="flex w-full items-stretch h-14 sm:h-16">
            <motion.div
              style={{ opacity: navLogoOpacity, width: navLogoWidth, borderRightWidth: navLogoBorder }}
              className="flex items-center justify-center border-solid grid-line hover:bg-accent/20 transition-colors overflow-hidden flex-shrink-0 max-w-[52px] sm:max-w-[84px]"
            >
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center justify-center h-full w-full cursor-pointer outline-none min-w-0 px-2 sm:px-0"
                aria-label="Scroll to top"
              >
                <Image
                  src="/logo.svg"
                  alt="Metapoise Logo"
                  width={48}
                  height={48}
                  className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                />
              </button>
            </motion.div>
            <Link
              href="/events"
              id="nav-events-link"
              className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs uppercase text-center px-1 sm:px-2 py-1 leading-tight"
            >
              <span className="opacity-70 sm:opacity-100 sm:mr-1">[01]</span>
              <span className="truncate">Events</span>
            </Link>
            <Link
              href="/schedule"
              id="nav-schedule-link"
              className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs uppercase text-center px-1 sm:px-2 py-1 leading-tight"
            >
              <span className="opacity-70 sm:opacity-100 sm:mr-1">[02]</span>
              <span className="truncate">Schedule</span>
            </Link>
            <Link
              href="/#flagship-events"
              id="nav-speakers-link"
              className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs uppercase text-center px-1 sm:px-2 py-1 leading-tight"
            >
              <span className="opacity-70 sm:opacity-100 sm:mr-1">[03]</span>
              <span className="truncate">Speakers</span>
            </Link>
            <Link
              href="/about"
              id="nav-about-link"
              className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all mono-font text-[10px] sm:text-xs uppercase text-center px-1 sm:px-2 py-1 leading-tight"
            >
              <span className="opacity-70 sm:opacity-100 sm:mr-1">[04]</span>
              <span className="truncate">About Us</span>
            </Link>
          </div>
        </nav>

        {/* Hero Bottom Details */}
        <section className="flex flex-col">
          <div className="px-4 sm:px-8 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b-4 grid-line py-8 mb-8">
              <div className="max-w-xl">
                <p className="text-lg sm:text-xl md:text-2xl font-light leading-snug">
                  A CELEBRATION OF INNOVATION, WHERE IDEAS MEET CREATIVITY AND
                  CUTTING-EDGE TECHNOLOGY TO SHOWCASE FUTURISTIC SOLUTIONS THAT
                  SHAPE TOMORROW AND DRIVE CHANGE.
                </p>
              </div>
              <div className="flex flex-col justify-between items-center md:items-end mt-4 md:mt-0">
                <div className="mono-font text-xs sm:text-sm text-center md:text-right leading-relaxed break-words">
                  <p>
                    LOCATION: Department of Computer Science and Engineering,
                    DUIET
                  </p>
                  <p>DATE: 30.10 - 01.11</p>
                  <p>INDEX_ID: MP_v_2.0</p>
                </div>
                {/* <Link href="#tickets" id="hero-cta-btn" className="mt-8 px-10 py-5 bg-accent  font-bold uppercase hover:bg-white transition-colors flex items-center gap-3 group">
                Secure Access Token
                <ArrowRight weight="bold" className="group-hover:translate-x-2 transition-transform" />
              </Link> */}
              </div>
            </div>
          </div>

          {/* Scrolling Marquee */}
          <div className="w-full max-w-full border-y-4 border-accent py-4 marquee overflow-hidden">
            <div className="marquee-content heading-font text-3xl md:text-5xl uppercase">
              <span className="mx-8">Hackathon</span> <span className="">•</span>
              <span className="mx-8">Ideathon</span> <span className="">•</span>
              <span className="mx-8">Alumini-Meet</span>{" "}
              <span className="">•</span>
              <span className="mx-8">Tech-Expo</span> <span className="">•</span>
              <span className="mx-8">Seminar</span> <span className="">•</span>
              <span className="mx-8">Workshop</span> <span className="">•</span>
              <span className="mx-8">Open-Mic</span> <span className="">•</span>
              <span className="mx-8">Photography</span>{" "}
              <span className="">•</span>
              <span className="mx-8">Hackathon</span> <span className="">•</span>
              <span className="mx-8">Ideathon</span> <span className="">•</span>
              <span className="mx-8">Alumini-Meet</span>{" "}
              <span className="">•</span>
              <span className="mx-8">Tech-Expo</span> <span className="">•</span>
              <span className="mx-8">Seminar</span> <span className="">•</span>
              <span className="mx-8">Workshop</span> <span className="">•</span>
              <span className="mx-8">Open-Mic</span> <span className="">•</span>
              <span className="mx-8">Photography</span>{" "}
              <span className="">•</span>
            </div>
          </div>
        </section>

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
            <Link href="/events" className="relative overflow-hidden border-b-4 md:border-r-4 md:border-b-4 grid-line p-8 sm:p-10 flex flex-col group cursor-pointer hover:border-black">
              <div className="absolute inset-0 bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0 ease-[cubic-bezier(0.77,0,0.175,1)]"></div>
              <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none group-hover:text-black transition-colors duration-500">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="mono-font text-xs font-bold text-black/60 group-hover:text-black transition-colors">[UNIT_01]</span>
                    <Code weight="bold" className="text-3xl group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="heading-font text-3xl sm:text-4xl uppercase mb-4">
                    The Hackathon
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-black/80 font-light group-hover:text-black transition-colors">
                    An intense, multi-hour sprint challenging developers, algorithmic thinkers,
                    and designers to engineer novel prototypes tackling autonomous systems,
                    web architectures, and AI primitives.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t-2 border-black/10 group-hover:border-black/30 mono-font text-xs text-black/60 group-hover:text-black transition-colors">
                  FOCUS: AUTONOMOUS LOGIC // ACCELERATED BUILDS
                </div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/events" className="relative overflow-hidden border-b-4 grid-line p-8 sm:p-10 flex flex-col group cursor-pointer hover:border-black">
              <div className="absolute inset-0 bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0 ease-[cubic-bezier(0.77,0,0.175,1)]"></div>
              <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none group-hover:text-black transition-colors duration-500">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="mono-font text-xs font-bold text-black/60 group-hover:text-black transition-colors">[UNIT_02]</span>
                    <Cpu weight="bold" className="text-3xl group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="heading-font text-3xl sm:text-4xl uppercase mb-4">
                    Tech-Expo & Workshops
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-black/80 font-light group-hover:text-black transition-colors">
                    A physical showfloor spotlighting hardware prototypes, IoT installations,
                    embedded systems, and synthetic intelligence demonstrations developed by
                    student researchers.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t-2 border-black/10 group-hover:border-black/30 mono-font text-xs text-black/60 group-hover:text-black transition-colors">
                  FOCUS: EMBEDDED SILICON // APPLIED RESEARCH
                </div>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/events" className="relative overflow-hidden border-b-4 md:border-b-0 md:border-r-4 grid-line p-8 sm:p-10 flex flex-col group cursor-pointer hover:border-black">
              <div className="absolute inset-0 bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0 ease-[cubic-bezier(0.77,0,0.175,1)]"></div>
              <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none group-hover:text-black transition-colors duration-500">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="mono-font text-xs font-bold text-black/60 group-hover:text-black transition-colors">[UNIT_03]</span>
                    <Terminal weight="bold" className="text-3xl group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="heading-font text-3xl sm:text-4xl uppercase mb-4">
                    Ideathon
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-black/80 font-light group-hover:text-black transition-colors">
                    A forum for high-conviction founders and conceptual visionaries to articulate
                    transformative technical solutions before panels of faculty, alumni, and tech founders.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t-2 border-black/10 group-hover:border-black/30 mono-font text-xs text-black/60 group-hover:text-black transition-colors">
                  FOCUS: ARCHITECTURAL DESIGN // VENTURE VECTORS
                </div>
              </div>
            </Link>

            {/* Card 4 */}
            <Link href="/events" className="relative overflow-hidden p-8 sm:p-10 flex flex-col group cursor-pointer hover:border-black">
              <div className="absolute inset-0 bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0 ease-[cubic-bezier(0.77,0,0.175,1)]"></div>
              <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none group-hover:text-black transition-colors duration-500">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="mono-font text-xs font-bold text-black/60 group-hover:text-black transition-colors">[UNIT_04]</span>
                    <Globe weight="bold" className="text-3xl group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="heading-font text-3xl sm:text-4xl uppercase mb-4">
                    Symposia & Culture
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-black/80 font-light group-hover:text-black transition-colors">
                    Keynotes, alumni networking forums, open-mic sessions, and workshops curated
                    to strengthen community bonds and accelerate knowledge sharing across cohorts.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t-2 border-black/10 group-hover:border-black/30 mono-font text-xs text-black/60 group-hover:text-black transition-colors">
                  FOCUS: COMMUNITY SYNERGY // KNOWLEDGE MESH
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Highlights / Agenda Split */}


        {/* Final CTA */}
        <section
          id="tickets"
          className="py-20 md:py-32 flex flex-col items-center justify-center text-center px-4 sm:px-8 border-b-4 grid-line"
        >
          <div className="max-w-4xl w-full">
            <h2 className="heading-font text-4xl sm:text-7xl md:text-9xl uppercase mb-8 break-words">
              Ready to Initialize?
            </h2>
            <p className="mono-font text-xs sm:text-sm md:text-base mb-12 max-w-2xl mx-auto px-2 sm:px-4 md:px-0">
              DATA HARVESTED.COOKIES STORED.CONNECTION ENCRYPTED.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center px-4 md:px-0">
              <button
                id="cta-primary-buy"
                className="bg-accent px-6 md:px-16 py-3 md:py-6 text-sm sm:text-base md:text-xl font-black uppercase hover:scale-105 transition-transform"
              >
                Secure Access Token
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer className="grid-line-accent" />
      </div>
    </div>
  );
}
