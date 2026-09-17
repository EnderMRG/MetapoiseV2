"use client";

import Link from "next/link";
import Grainient from "@/components/Grainient";
import Footer from "@/components/Footer";

export default function SchedulePage() {
  return (
    <div className="min-h-screen relative w-full overflow-x-clip text-black">
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

      {/* Sticky Navigation — same as Home */}
      <nav className="sticky top-0 w-full border-y-2 sm:border-y-4 grid-line backdrop-blur-md bg-white/30 z-50 overflow-x-auto no-scrollbar">
        <div className="flex w-full items-stretch h-14 sm:h-16">
          <Link
            href="/"
            className="flex items-center justify-center border-solid grid-line hover:bg-accent/20 transition-colors overflow-hidden flex-shrink-0 w-[52px] sm:w-[84px] border-r-2 sm:border-r-4"
            aria-label="Return to Home"
          >
            <div className="flex items-center justify-center h-full w-full min-w-0 px-2 sm:px-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="Metapoise Logo"
                width={48}
                height={48}
                className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
              />
            </div>
          </Link>
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
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center bg-accent text-black border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs uppercase text-center px-1 sm:px-2 py-1 leading-tight font-bold"
          >
            <span className="mr-1">[02]</span>
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

      {/* Page Header */}
      <section className="pt-8 md:pt-16 pb-8 px-4 sm:px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b-4 grid-line pb-8">
          <div>
            <div className="mono-font text-xs uppercase tracking-widest text-black/70 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" />
              <span>INDEX: MP_v_2.0 // EVENT DISTRIBUTION</span>
            </div>
            <h1 className="heading-font text-6xl sm:text-7xl md:text-9xl uppercase tracking-tight leading-[0.85]">
              <span className="higuen-font normal-case">SCHEDULE</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Schedule Content */}
      <section className="flex flex-col lg:flex-row px-4 sm:px-8 md:px-16 pb-20">
        <div className="w-full text-black">
          <div className="space-y-16 max-w-5xl">
            {/* Day 1 */}
            <div>
              <h3 className="mono-font text-2xl font-bold mb-6 border-b-4 grid-line pb-4 inline-block pr-12">DAY 1: FRIDAY, OCT 30, 2026</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col group p-6 border-4 grid-line hover:bg-white/10 transition-colors">
                  <span className="mono-font text-sm opacity-80 mb-2 font-bold">09:00 AM – 10:30 AM</span>
                  <h4 className="text-3xl uppercase font-bold leading-none">Inauguration &amp; Keynote Seminar</h4>
                </div>
                <div className="flex flex-col group p-6 border-4 grid-line hover:bg-white/10 transition-colors">
                  <span className="mono-font text-sm opacity-80 mb-2 font-bold">10:45 AM – 01:30 PM</span>
                  <h4 className="text-3xl uppercase font-bold leading-none">Practical Technical Workshop</h4>
                  <p className="opacity-80 mt-2 mono-font">IoT &amp; Embedded Systems</p>
                </div>
                <div className="flex flex-col group p-6 border-4 grid-line hover:bg-white/10 transition-colors md:col-span-2">
                  <span className="mono-font text-sm opacity-80 mb-2 font-bold">02:00 PM – 05:30 PM</span>
                  <h4 className="text-3xl uppercase font-bold leading-none">Startup &amp; Innovation Expo</h4>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div>
              <h3 className="mono-font text-2xl font-bold mb-6 border-b-4 grid-line pb-4 inline-block pr-12">DAY 2: SATURDAY, OCT 31, 2026</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col group p-6 border-4 grid-line hover:bg-white/10 transition-colors">
                  <span className="mono-font text-sm opacity-80 mb-2 font-bold">09:30 AM – 05:00 PM</span>
                  <h4 className="text-3xl uppercase font-bold leading-none">Central Ideathon Track</h4>
                  <p className="opacity-80 mt-2 mono-font">Jointly with IEEE DUSB</p>
                </div>
                <div className="flex flex-col group p-6 border-4 grid-line hover:bg-white/10 transition-colors">
                  <span className="mono-font text-sm opacity-80 mb-2 font-bold">10:00 AM – 05:00 PM</span>
                  <h4 className="text-3xl uppercase font-bold leading-none">Interactive Project &amp; Technical Stalls</h4>
                </div>
              </div>
            </div>

            {/* Day 3 */}
            <div>
              <h3 className="mono-font text-2xl font-bold mb-6 border-b-4 grid-line pb-4 inline-block pr-12">DAY 3: SUNDAY, NOV 01, 2026</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col group p-6 border-4 grid-line hover:bg-white/10 transition-colors md:col-span-2">
                  <span className="mono-font text-sm opacity-80 mb-2 font-bold">09:00 AM – 04:00 PM</span>
                  <h4 className="text-3xl uppercase font-bold leading-none">Flagship Hackathon Track</h4>
                  <p className="opacity-80 mt-2 mono-font">Jointly with IEEE DUSB</p>
                </div>
                <div className="flex flex-col group p-6 border-4 grid-line hover:bg-white/10 transition-colors">
                  <span className="mono-font text-sm opacity-80 mb-2 font-bold">10:00 AM – 04:00 PM</span>
                  <h4 className="text-3xl uppercase font-bold leading-none">Interactive Project &amp; Technical Stalls</h4>
                </div>
                <div className="flex flex-col group p-6 border-4 grid-line hover:bg-white/10 transition-colors">
                  <span className="mono-font text-sm opacity-80 mb-2 font-bold">04:30 PM – 06:00 PM</span>
                  <h4 className="text-3xl uppercase font-bold leading-none">Valedictory &amp; Award Ceremony</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer className="grid-line" />
    </div>
  );
}
