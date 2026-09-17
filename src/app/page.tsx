"use client";

import { useRef, useState } from "react";
import { ArrowRight, Cpu, Plus, ShieldCheck } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Grainient from "@/components/Grainient";
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
            href="#schedule"
            id="nav-schedule-link"
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs uppercase text-center px-1 sm:px-2 py-1 leading-tight"
          >
            <span className="opacity-70 sm:opacity-100 sm:mr-1">[01]</span>
            <span className="truncate">Schedule</span>
          </Link>
          <Link
            href="#speakers"
            id="nav-speakers-link"
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs uppercase text-center px-1 sm:px-2 py-1 leading-tight"
          >
            <span className="opacity-70 sm:opacity-100 sm:mr-1">[02]</span>
            <span className="truncate">Speakers</span>
          </Link>
          <Link
            href="#workshops"
            id="nav-workshops-link"
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs uppercase text-center px-1 sm:px-2 py-1 leading-tight"
          >
            <span className="opacity-70 sm:opacity-100 sm:mr-1">[03]</span>
            <span className="truncate">Workshops</span>
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

      {/* Featured Speakers */}
      {/* <section id="speakers" className="py-24 px-8 md:px-16 border-b-4 grid-line">
        <div className="flex justify-between items-end mb-16">
          <h2 className="heading-font text-8xl uppercase">Speakers</h2>
          <span className="mono-font ">[02 // AGENTS]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 grid-line">
          <div className="border-r-4 border-b-4 md:border-b-0 grid-line p-10 flex flex-col speaker-card transition-all hover:bg-white/5 group">
            <div className="flex justify-between items-start mb-12">
              <div>
                <span className="mono-font text-xs  mb-1 block">UNIT_001</span>
                <h3 className="text-3xl font-bold uppercase">Dr. Aris Thorne</h3>
              </div>
              <div className="border-4 border-accent p-1 text-[10px] font-bold">A a</div>
            </div>
            <div className="flex-1 flex items-center justify-center py-12">
              <div className="speaker-icon w-32 h-32 border-4 border-accent relative transition-transform duration-500 group-hover:scale-105">
                <div className="absolute inset-0 bg-accent transform -translate-x-4 translate-y-4"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu weight="duotone" className="text-6xl " />
                </div>
              </div>
            </div>
            <p className="mt-8  text-sm mono-font">FIELD: NEURAL INTERFACING // QUANTUM BIOLOGY</p>
          </div> 
          <div className="border-b-4 md:border-b-0 grid-line p-10 flex flex-col speaker-card transition-all hover:bg-white/5 group">
            <div className="flex justify-between items-start mb-12">
              <div>
                <span className="mono-font text-xs  mb-1 block">UNIT_042</span>
                <h3 className="text-3xl font-bold uppercase">Lex Machina</h3>
              </div>
              <div className="border-4 border-accent p-1 text-[10px] font-bold">B b</div>
            </div>
            <div className="flex-1 flex items-center justify-center py-12">
              <div className="speaker-icon w-32 h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <svg className="w-full h-full " viewBox="0 0 100 100">
                  <rect x="25" y="25" width="50" height="50" fill="currentColor"></rect>
                  <rect x="10" y="10" width="10" height="10" fill="currentColor"></rect>
                  <rect x="80" y="80" width="10" height="10" fill="currentColor"></rect>
                </svg>
              </div>
            </div>
            <p className="mt-8  text-sm mono-font">FIELD: AUTONOMOUS GOVERNANCE // WEB 5.0</p>
          </div>

          <div className="border-t-4 grid-line p-10 flex flex-col md:flex-row md:col-span-2 speaker-card transition-all hover:bg-white/5 group">
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-12 md:mb-0">
                <div>
                  <span className="mono-font text-xs  mb-1 block">UNIT_099</span>
                  <h3 className="text-5xl font-bold uppercase">Sara Vance</h3>
                  <p className="mt-8  text-sm mono-font">FIELD: CRYPTO-ECOLOGY // BIO-HACKING</p>
                </div>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center py-12 md:py-0">
              <div className="speaker-icon w-48 h-48 rounded-full border-4 border-accent border-dashed animate-spin-slow flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <div className="w-16 h-16 bg-accent rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
*/}
      {/* Highlights / Agenda Split */}
      {/* <section id="schedule" className="flex flex-col md:flex-row">
        <div className="md:w-1/2 border-r-4 grid-line p-16">
          <h2 className="heading-font text-6xl uppercase mb-12">The Agenda</h2>
          <div className="space-y-0 border-t-4 border-b-4 grid-line">
            <div className="py-8 border-b-4 grid-line flex justify-between items-center group cursor-pointer">
              <div>
                <span className="mono-font  text-sm">09:00 - 11:00</span>
                <h4 className="text-2xl font-medium uppercase">Opening Protocols</h4>
              </div>
              <Plus weight="bold" className="text-3xl transition-transform group-hover:rotate-90" />
            </div>
            <div className="py-8 border-b-4 grid-line flex justify-between items-center group cursor-pointer">
              <div>
                <span className="mono-font  text-sm">13:00 - 15:30</span>
                <h4 className="text-2xl font-medium uppercase">Synthetic Brain Labs</h4>
              </div>
              <Plus weight="bold" className="text-3xl transition-transform group-hover:rotate-90" />
            </div>
            <div className="py-8 flex justify-between items-center group cursor-pointer">
              <div>
                <span className="mono-font  text-sm">18:00 - LATE</span>
                <h4 className="text-2xl font-medium uppercase">Void Party // Networking</h4>
              </div>
              <Plus weight="bold" className="text-3xl transition-transform group-hover:rotate-90" />
            </div>
          </div>
        </div>
        <div className="md:w-1/2 p-16 bg-accent ">
          <h2 className="heading-font text-6xl uppercase mb-12">Why Attend?</h2>
          <div className="space-y-12">
            <div>
              <span className="block mono-font font-bold mb-4">[CRITICAL INQUIRY]</span>
              <p className="text-2xl leading-tight">
                Break the simulation. Engage with experts who are redefining the boundaries between biological life and silicon-based systems.
              </p>
            </div>
            <div>
              <span className="block mono-font font-bold mb-4">[DEEP NETWORKING]</span>
              <p className="text-2xl leading-tight">
                Connect with an autonomous zone of developers, artists, and bio-hackers operating on the visible spectrum&apos;s edge.
              </p>
            </div>
            <div className="pt-12">
              <Link href="#" id="agenda-cta-link" className="inline-block border-4 border-b-2g-dark px-12 py-4 font-bold uppercase hover: hover: transition-colors">
                Full Catalog
              </Link>
            </div>
          </div>
        </div>
      </section> */}

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
      <footer className="py-12 px-4 sm:px-8 md:px-16 border-t-4 grid-line-accent flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="mono-font text-xs uppercase">© 2026 METAPOSE</span>
          <span className="mono-font text-[10px] uppercase mt-1">
            VER: 2.0_BETA // INDEX_MP_v_2.0 // END
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
    </div>
  );
}
