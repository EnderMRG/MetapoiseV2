"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Code, Cpu, Globe } from "@phosphor-icons/react";
import Grainient from "@/components/Grainient";
import Footer from "@/components/Footer";

type EventData = {
  id: string;
  unit: string;
  title: string;
  shortCode?: string;
  desc?: string;
  field: string;
  width: "half" | "full";
  icon: React.ReactNode;
  coordinator: string;
  timing: string;
  fullDescription: string;
  tags: string[];
  stats: { mainNum: string; mainLabel: string; subNum: string; subLabel: string };
  ctaText: string;
};

const eventsData: EventData[] = [
  {
    id: "evt1",
    unit: "UNIT_001",
    title: "Crescendo",
    shortCode: "C h",
    field: "COMPETITION // HACKATHON",
    width: "half",
    icon: (
      <div className="w-32 h-32 border-4 border-black relative transition-transform duration-500 group-hover:scale-105 flex items-center justify-center bg-white/20">
        <div className="absolute inset-0 border-4 border-black transform -translate-x-4 translate-y-4 pointer-events-none"></div>
        <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="square" strokeLinejoin="miter" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
    ),
    coordinator: "METAPOISE & UDVAB",
    timing: "NOV 01: 09:00 AM - 03:00 PM",
    fullDescription: "The flagship prototype competition operating on a Two-Phase Hybrid Model (Online Build & Shortlisting → On-Site Jury Pitch). Teams must strictly select and build a prototype addressing one of the 4 official problem statements.",
    tags: ["TEAM_SIZE: 03", "HYBRID_MODEL", "LIVE_DEMO", "NO_FEE"],
    stats: { mainNum: "20", mainLabel: "SHORTLISTED TEAMS", subNum: "04", subLabel: "PROBLEM STATEMENTS" },
    ctaText: "DOWNLOAD_DIGITAL_DOSSIER"
  },
  {
    id: "evt2",
    unit: "UNIT_002",
    title: "APORIA ",
    shortCode: "I d",
    field: "INNOVATION // PITCH",
    width: "half",
    icon: (
      <div className="w-32 h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <svg className="w-full h-full text-black" viewBox="0 0 100 100">
          <rect x="25" y="25" width="50" height="50" fill="currentColor"></rect>
          <rect x="10" y="10" width="10" height="10" fill="currentColor"></rect>
          <rect x="80" y="80" width="10" height="10" fill="currentColor"></rect>
        </svg>
      </div>
    ),
    coordinator: "IEEE DUSB",
    timing: "DAY 2: 09:30 AM",
    fullDescription: "A central ideation track challenging participants to formulate cutting-edge solutions for real-world systemic anomalies. Present your conceptual frameworks to a panel of expert evaluators.",
    tags: ["LOGIC_GATE", "SYSTEM_DESIGN", "PITCH_DECK"],
    stats: { mainNum: "24", mainLabel: "TEAMS REGISTERED", subNum: "08", subLabel: "SLOTS OPEN" },
    ctaText: "SUBMIT_PROPOSAL_HASH"
  },
  {
    id: "evt3",
    unit: "UNIT_003",
    title: "Tech Expo",
    desc: "A physical showfloor spotlighting hardware prototypes and embedded systems.",
    field: "EMBEDDED SILICON // APPLIED RESEARCH",
    width: "full",
    icon: (
      <div className="w-48 h-48 rounded-full border-4 border-black border-dashed animate-spin-slow flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <div className="w-16 h-16 bg-black rounded-full border-4 border-black"></div>
      </div>
    ),
    coordinator: "HARDWARE DEPT",
    timing: "DAY 1: 02:00 PM",
    fullDescription: "Explore the bleeding edge of physical computing. This exhibition features autonomous robotics, IoT sensor networks, and custom PCB designs forged by student engineers and makers.",
    tags: ["HARDWARE_ACCEL", "SILICON_FAB", "IOT_MESH"],
    stats: { mainNum: "50+", mainLabel: "EXHIBITS", subNum: "03", subLabel: "AWARDS" },
    ctaText: "ACCESS_EXHIBITION_FLOOR"
  },
  {
    id: "evt4",
    unit: "UNIT_004",
    title: "Alumni Meet",
    shortCode: "A m",
    field: "NETWORKING // MENTORSHIP",
    width: "half",
    icon: (
      <div className="w-32 h-32 border-4 border-black relative transition-transform duration-500 group-hover:scale-105 rounded-full overflow-hidden flex items-center justify-center">
        <div className="absolute -left-4 -top-4 w-20 h-20 border-4 border-black rounded-full"></div>
        <div className="absolute -right-4 -bottom-4 w-20 h-20 border-4 border-black rounded-full"></div>
        <div className="w-8 h-8 bg-black rounded-full relative z-10"></div>
      </div>
    ),
    coordinator: "ALUMNI ASSOCIATION",
    timing: "PRE-FEST PHASE",
    fullDescription: "A secure networking channel establishing direct peer-to-peer connections between current undergraduates and deployed graduates operating in the global tech industry.",
    tags: ["P2P_HANDSHAKE", "MENTOR_NODE", "CAREER_PATH"],
    stats: { mainNum: "120", mainLabel: "ALUMNI ACTIVE", subNum: "MAX", subLabel: "CONNECTIONS" },
    ctaText: "ESTABLISH_CONNECTION"
  },
  {
    id: "evt5",
    unit: "UNIT_005",
    title: "Flood Relief",
    shortCode: "F r",
    field: "SOCIAL INITIATIVE",
    width: "half",
    icon: (
      <div className="w-32 h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={4}>
          <path d="M10 50 Q 25 30, 50 50 T 90 50" />
          <path d="M10 70 Q 25 50, 50 70 T 90 70" />
          <circle cx="50" cy="20" r="8" fill="currentColor" />
        </svg>
      </div>
    ),
    coordinator: "NSS WING",
    timing: "ONGOING",
    fullDescription: "A coordinated community response operation deploying resources and awareness for local flood-affected zones. Technology in service of humanity and ecological balance.",
    tags: ["HUMAN_OPS", "CRISIS_RESPONSE", "RESOURCE_ALLOC"],
    stats: { mainNum: "01", mainLabel: "MISSION", subNum: "MAX", subLabel: "IMPACT" },
    ctaText: "JOIN_RESPONSE_TEAM"
  },
  {
    id: "evt6",
    unit: "UNIT_006",
    title: "Photography",
    desc: "Capture the essence of Metapoise and campus life. A visual storytelling event.",
    field: "MEDIA // VISUAL ARTS",
    width: "full",
    icon: (
      <div className="w-48 h-48 border-4 border-black flex items-center justify-center transition-transform duration-500 group-hover:scale-105 bg-white/20">
        <div className="w-32 h-32 border-4 border-black rounded-full flex items-center justify-center bg-transparent">
          <div className="w-12 h-12 bg-black rounded-full"></div>
        </div>
      </div>
    ),
    coordinator: "MEDIA CELL",
    timing: "DAY 1 - DAY 3",
    fullDescription: "Document the technical symposium through your optical sensors. A multi-day visual storytelling competition judged on composition, lighting, and thematic relevance.",
    tags: ["OPTICAL_SENSOR", "RGB_MATRIX", "STORY_ARC"],
    stats: { mainNum: "36", mainLabel: "SUBMISSIONS", subNum: "04", subLabel: "CATEGORIES" },
    ctaText: "UPLOAD_VISUAL_DATA"
  },
  {
    id: "evt7",
    unit: "UNIT_007",
    title: "Workshops",
    desc: "Hands-on practical sessions in IoT, embedded systems, and emerging technologies.",
    field: "HANDS-ON // SKILL BUILDING",
    width: "full",
    icon: (
      <div className="w-48 h-48 relative transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
        <svg className="w-32 h-32 text-black animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,10 60,35 85,35 65,55 75,80 50,65 25,80 35,55 15,35 40,35" />
        </svg>
      </div>
    ),
    coordinator: "TECHNICAL HEADS",
    timing: "DAY 1: 10:45 AM",
    fullDescription: "An immersive laboratory session exploring the intersection of cellular computing and frontend interface design. Participants will interface with neural protocols to render live biometric data into reactive DOM structures.",
    tags: ["BASE_LEVEL: 02", "CRITICAL_LOGIC", "SYNTH_JS", "VOID_ENABLED"],
    stats: { mainNum: "12", mainLabel: "SEATS REMAINING", subNum: "08", subLabel: "WAITLIST" },
    ctaText: "ENROLL_SECURE_ACCESS_NODE"
  }
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [modalScale, setModalScale] = useState(1);

  useEffect(() => {
    if (!selectedEvent) return;
    
    function handleResize() {
      // 850 is base ticket width, 650 is base ticket height. 32px is for padding.
      const scaleX = (window.innerWidth - 32) / 850;
      const scaleY = (window.innerHeight - 32) / 650;
      setModalScale(Math.min(1, scaleX, scaleY));
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedEvent]);

  return (
    <div className="min-h-screen relative w-full overflow-x-clip text-black">
      <div className="scanline z-[99]"></div>

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

      {/* Navigation Bar */}
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
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center bg-accent text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs uppercase text-center px-1 sm:px-2 py-1 leading-tight font-bold"
          >
            <span className="mr-1">[01]</span>
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
            <span className="truncate">Speaker</span>
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
              <span>INDEX: MP_v_2.0 // SUPPLEMENTARY ACTIVITIES</span>
            </div>
            <h1 className="heading-font text-6xl sm:text-7xl md:text-9xl uppercase tracking-tight leading-[0.85]">
              <span className="higuen-font normal-case">EVENTS</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="px-4 sm:px-8 md:px-16 pb-20">
        <div className="grid grid-cols-2 gap-0 border-4 grid-line">
          {eventsData.map((event, index) => {
            const isHalf = event.width === "half";
            const isLast = index === eventsData.length - 1;
            return (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`
                  relative overflow-hidden group cursor-pointer transition-all duration-300
                  ${!isLast ? 'border-b-4' : ''} 
                  ${isHalf ? 'border-r-4' : 'col-span-2'} 
                  grid-line p-4 sm:p-6 md:p-10 flex flex-col hover:border-black
                `}
              >
                {/* Background Hover Animation */}
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] z-0"></div>

                <div className="relative z-10 flex flex-col h-full pointer-events-none">
                  <div className="flex justify-between items-start mb-6 sm:mb-12">
                    <div>
                      <span className="mono-font text-[8px] sm:text-xs mb-1 block font-bold transition-colors group-hover:text-black">{event.unit}</span>
                      <h3 className="text-lg sm:text-3xl md:text-5xl font-bold uppercase transition-colors group-hover:text-black leading-none">{event.title}</h3>
                      {event.desc && (
                        <p className="mt-4 sm:mt-8 text-[8px] sm:text-sm mono-font max-w-sm uppercase transition-colors group-hover:text-black">
                          {event.desc}
                        </p>
                      )}
                    </div>
                    {event.shortCode && (
                      <div className="border-2 sm:border-4 grid-line group-hover:border-black p-0.5 sm:p-1 text-[8px] sm:text-[10px] font-bold transition-colors group-hover:text-black bg-transparent">
                        {event.shortCode}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex items-center justify-center py-6 sm:py-12 md:py-0 transform scale-[0.6] sm:scale-75 md:scale-100 origin-center">
                    {event.icon}
                  </div>

                  <p className="mt-6 sm:mt-8 text-[8px] sm:text-sm mono-font uppercase transition-colors group-hover:text-black font-bold">
                    FIELD: {event.field}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <Footer className="grid-line relative z-10" />

      {/* POPUP MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedEvent(null)}
          ></div>
          <div 
            className="flex items-center justify-center w-full h-full pointer-events-none"
            style={{
              transform: `scale(${modalScale})`,
              transformOrigin: 'center'
            }}
          >
            <div className="relative w-[800px] shrink-0 bg-accent text-black border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col z-10 animate-in zoom-in-95 duration-200 pointer-events-auto">
              
              {/* Header */}
              <div className="border-b-4 border-black p-5 flex justify-between items-start bg-accent">
                <h2 className="heading-font text-4xl uppercase leading-none max-w-[85%] break-words">
                  {selectedEvent.unit}: {selectedEvent.title}
                </h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="bg-black text-accent w-10 h-10 flex-shrink-0 flex items-center justify-center text-lg font-bold hover:bg-white hover:text-black transition-colors border-4 border-black"
                  aria-label="Close modal"
                >
                  [X]
                </button>
              </div>

              {/* Body Grid */}
              <div className="flex flex-row bg-accent">
                
                {/* Left Column (Details) */}
                <div className="w-2/3 border-r-4 border-black p-6 flex flex-col justify-between">
                  <div>
                    <p className="mono-font text-sm font-bold uppercase mb-1">
                      INSTRUCTOR/LEAD: {selectedEvent.coordinator}
                    </p>
                    <p className="mono-font text-sm font-bold uppercase mb-6">
                      DURATION/TIMING: {selectedEvent.timing}
                    </p>

                    <div className="w-full h-1 bg-black mb-6"></div>

                    <p className="text-xl uppercase leading-snug font-medium mb-8">
                      {selectedEvent.fullDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-auto pt-4">
                    {selectedEvent.tags.map(tag => (
                      <span key={tag} className="border-4 border-black px-3 py-2 mono-font text-xs font-bold uppercase bg-transparent">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column (Stats) */}
                <div className="w-1/3 p-6 flex flex-col gap-5 bg-accent">
                  <div className="border-4 border-black bg-transparent py-5 px-4 flex flex-col items-center text-center justify-center">
                    <span className="heading-font text-7xl leading-none">{selectedEvent.stats.mainNum}</span>
                    <span className="mono-font text-xs font-bold uppercase mt-3 tracking-wider">{selectedEvent.stats.mainLabel}</span>
                  </div>

                  <div className="border-4 border-black bg-black text-accent py-5 px-4 flex flex-col items-center text-center justify-center">
                    <span className="heading-font text-7xl leading-none">{selectedEvent.stats.subNum}</span>
                    <span className="mono-font text-xs font-bold uppercase mt-3 tracking-wider">{selectedEvent.stats.subLabel}</span>
                  </div>

                  {/* Barcode Graphic */}
                  <div className="mt-auto pt-2 flex justify-between h-10 w-full">
                    {[...Array(50)].map((_, i) => {
                      // Create a pseudo-random looking barcode pattern
                      const width = (i % 7 === 0) ? '6px' : (i % 3 === 0) ? '4px' : '2px';
                      const opacity = (i % 11 === 0) ? 0 : 1;
                      return (
                        <div key={i} className="bg-black h-full" style={{ width, opacity }}></div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer CTA Button */}
              <button className="w-full bg-black text-accent py-5 px-4 heading-font text-4xl uppercase hover:bg-white hover:text-black transition-colors border-t-4 border-black shrink-0">
                {selectedEvent.ctaText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
