"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, Code, Cpu, Globe } from "@phosphor-icons/react";
import Grainient from "@/components/Grainient";
import Footer from "@/components/Footer";
import AlumniRegistrationModal from "@/components/AlumniRegistrationModal";

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
    title: "Alumni Meet",
    shortCode: "A m",
    field: "NETWORKING // MENTORSHIP",
    width: "full",
    icon: (
      <div className="w-32 h-32 border-4 border-white/30 group-hover:border-black relative transition-all duration-500 group-hover:scale-105 rounded-full overflow-hidden flex items-center justify-center">
        <div className="absolute -left-4 -top-4 w-20 h-20 border-4 border-white/30 group-hover:border-black transition-colors rounded-full"></div>
        <div className="absolute -right-4 -bottom-4 w-20 h-20 border-4 border-white/30 group-hover:border-black transition-colors rounded-full"></div>
        <div className="w-8 h-8 bg-black group-hover:bg-white transition-colors rounded-full relative z-10"></div>
      </div>
    ),
    coordinator: "DR. KAUSHIK DAS",
    timing: "15 OCT: 10:30 AM",
    fullDescription: "A secure networking channel establishing direct peer-to-peer connections between current undergraduates and deployed graduates operating in the global tech industry.",
    tags: ["P2P_HANDSHAKE", "MENTOR_NODE", "CAREER_PATH"],
    stats: { mainNum: "120+", mainLabel: "ALUMNI ACTIVE", subNum: "MAX", subLabel: "CONNECTIONS" },
    ctaText: "ESTABLISH_CONNECTION"
  },
  {
    id: "evt2",
    unit: "UNIT_002",
    title: "Inaugural Ceremony",
    shortCode: "I c",
    field: "OPENING // KEYNOTE",
    width: "half",
    icon: (
      <div className="w-32 h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <svg className="w-full h-full text-white group-hover:text-black transition-colors" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={4}>
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="20" />
          <path d="M50 10 L50 30 M50 70 L50 90 M10 50 L30 50 M70 50 L90 50" />
        </svg>
      </div>
    ),
    coordinator: "DR. KAUSHIK DAS",
    timing: "30 OCT: 10:00 AM",
    fullDescription: "The official initialization sequence of METAPOISE v2.0. Featuring keynote directives from visionary leaders and the activation of the festival grid.",
    tags: ["INITIALIZATION", "SYSTEM_BOOT", "KEYNOTE"],
    stats: { mainNum: "500+", mainLabel: "ATTENDEES", subNum: "01", subLabel: "VISION" },
    ctaText: "ACCESS_FEED"
  },
  {
    id: "evt3",
    unit: "UNIT_003",
    title: "Technical Workshop",
    shortCode: "T w",
    field: "HANDS-ON // SKILL BUILDING",
    width: "half",
    icon: (
      <div className="w-32 h-32 relative transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
        <svg className="w-24 h-24 text-white group-hover:text-black transition-colors" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={4}>
          <rect x="30" y="30" width="40" height="40" strokeDasharray="10 5" className="animate-spin-slow" style={{ transformOrigin: 'center' }} />
          <path d="M 15 35 L 15 15 L 35 15" />
          <path d="M 85 35 L 85 15 L 65 15" />
          <path d="M 15 65 L 15 85 L 35 85" />
          <path d="M 85 65 L 85 85 L 65 85" />
          <circle cx="50" cy="50" r="8" fill="currentColor" />
        </svg>
      </div>
    ),
    coordinator: "TECHNICAL HEADS",
    timing: "30 OCT: 10:30 AM",
    fullDescription: "An immersive laboratory session exploring the intersection of modern technologies. Participants will interface with new protocols to build reactive structures.",
    tags: ["SKILL_NODE", "PRACTICAL_IMPL", "SYNTH_CODE"],
    stats: { mainNum: "50", mainLabel: "WORKSTATIONS", subNum: "03", subLabel: "HOURS" },
    ctaText: "ENROLL_SECURE_ACCESS"
  },
  {
    id: "evt4",
    unit: "UNIT_004",
    title: "Ideathon",
    shortCode: "I d",
    field: "INNOVATION // PITCH",
    width: "half",
    icon: (
      <div className="w-32 h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <svg className="w-full h-full text-white group-hover:text-black transition-colors" viewBox="0 0 100 100">
          <rect x="25" y="25" width="50" height="50" fill="currentColor"></rect>
          <rect x="10" y="10" width="10" height="10" fill="currentColor"></rect>
          <rect x="80" y="80" width="10" height="10" fill="currentColor"></rect>
        </svg>
      </div>
    ),
    coordinator: "INNOVATION CELL",
    timing: "31 OCT: 10:00 AM",
    fullDescription: "A central ideation track challenging participants to formulate cutting-edge solutions for real-world systemic anomalies. Present your conceptual frameworks to a panel of expert evaluators.",
    tags: ["LOGIC_GATE", "SYSTEM_DESIGN", "PITCH_DECK"],
    stats: { mainNum: "24", mainLabel: "TEAMS ALLOWED", subNum: "08", subLabel: "SLOTS OPEN" },
    ctaText: "SUBMIT_PROPOSAL"
  },
  {
    id: "evt5",
    unit: "UNIT_005",
    title: "Technical Seminar",
    shortCode: "T s",
    field: "EXPERT // TALK",
    width: "half",
    icon: (
      <div className="w-32 h-32 border-4 border-white/30 group-hover:border-black relative transition-all duration-500 group-hover:scale-105 flex items-center justify-center bg-white/20">
        <div className="w-12 h-12 bg-white group-hover:bg-black rounded-full" />
      </div>
    ),
    coordinator: "DR. KAUSHIK DAS",
    timing: "31 OCT: 01:30 PM",
    fullDescription: "High-bandwidth data transfer sessions from industry veterans. Deep dive into architectural paradigms, quantum computing trends, and AI acceleration.",
    tags: ["DATA_STREAM", "KNOWLEDGE_TRANSFER", "Q_A_NODE"],
    stats: { mainNum: "02", mainLabel: "EXPERTS", subNum: "100%", subLabel: "SIGNAL" },
    ctaText: "RESERVE_BANDWIDTH"
  },
  {
    id: "evt6",
    unit: "UNIT_006",
    title: "Online Gaming",
    shortCode: "O g",
    field: "ESPORTS // TOURNAMENT",
    width: "full",
    icon: (
      <div className="w-48 h-48 border-4 border-white/30 group-hover:border-black transition-colors flex items-center justify-center transition-transform duration-500 group-hover:scale-105 bg-white/20">
        <div className="w-24 h-12 border-4 border-white/30 group-hover:border-black rounded-full" />
      </div>
    ),
    coordinator: "ESPORTS CLUB",
    timing: "31 OCT: 10:00 AM",
    fullDescription: "Engage in competitive simulation environments. Tactical execution, team coordination, and raw reflexes are required to dominate the digital battlefield.",
    tags: ["FPS_MAX", "LATENCY_LOW", "TACTICAL_OPS"],
    stats: { mainNum: "32", mainLabel: "TEAMS", subNum: "01", subLabel: "CHAMPION" },
    ctaText: "JOIN_LOBBY"
  },
  {
    id: "evt7",
    unit: "UNIT_007",
    title: "Hackathon",
    shortCode: "H k",
    field: "COMPETITION // PROTOTYPE",
    width: "half",
    icon: (
      <div className="w-32 h-32 border-4 border-white/30 group-hover:border-black relative transition-all duration-500 group-hover:scale-105 flex items-center justify-center bg-white/20">
        <div className="absolute inset-0 border-4 border-white/30 group-hover:border-black transition-colors transform -translate-x-4 translate-y-4 pointer-events-none"></div>
        <svg className="w-12 h-12 text-white group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="square" strokeLinejoin="miter" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
    ),
    coordinator: "DEV WING",
    timing: "01 NOV: 09:30 AM",
    fullDescription: "The flagship prototype competition. Teams must strictly select and build a prototype addressing one of the official problem statements under severe time constraints.",
    tags: ["TEAM_SIZE: 04", "LIVE_DEMO", "NO_SLEEP"],
    stats: { mainNum: "24", mainLabel: "HOURS", subNum: "MAX", subLabel: "CAFFEINE" },
    ctaText: "ACCESS_COMPILER"
  },
  {
    id: "evt8",
    unit: "UNIT_008",
    title: "Open Quiz",
    shortCode: "O q",
    field: "TRIVIA // COMPETITION",
    width: "half",
    icon: (
      <div className="w-32 h-32 border-4 border-white/30 group-hover:border-black transition-colors flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <span className="heading-font text-6xl text-white group-hover:text-black">?</span>
      </div>
    ),
    coordinator: "QUIZ CLUB",
    timing: "01 NOV: 03:30 PM",
    fullDescription: "Test your memory banks and processing speed. A high-stakes trivia confrontation spanning technology, pop culture, and logical deduction.",
    tags: ["MEMORY_ACCESS", "FAST_IO", "LOGIC"],
    stats: { mainNum: "50+", mainLabel: "QUESTIONS", subNum: "03", subLabel: "ROUNDS" },
    ctaText: "ENTER_ARENA"
  },
  {
    id: "evt9",
    unit: "UNIT_009",
    title: "Photography",
    shortCode: "P c",
    field: "VISUAL ARTS // MEDIA",
    width: "half",
    icon: (
      <div className="w-32 h-32 border-4 border-white/30 group-hover:border-black transition-colors flex items-center justify-center transition-transform duration-500 group-hover:scale-105 bg-white/20">
        <div className="w-16 h-16 border-4 border-white/30 group-hover:border-black transition-colors rounded-full flex items-center justify-center bg-transparent">
          <div className="w-6 h-6 bg-black group-hover:bg-white transition-colors rounded-full"></div>
        </div>
      </div>
    ),
    coordinator: "MEDIA CELL",
    timing: "01 NOV: 10:30 AM",
    fullDescription: "Document the technical symposium through your optical sensors. Judged on composition, lighting, and thematic relevance.",
    tags: ["OPTICAL_SENSOR", "RGB_MATRIX", "STORY_ARC"],
    stats: { mainNum: "36", mainLabel: "SUBMISSIONS", subNum: "04", subLabel: "CATEGORIES" },
    ctaText: "UPLOAD_VISUAL_DATA"
  },
  {
    id: "evt10",
    unit: "UNIT_010",
    title: "Open Mic",
    shortCode: "O m",
    field: "PERFORMANCE // ARTS",
    width: "half",
    icon: (
      <div className="w-32 h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 border-4 border-white/30 group-hover:border-black">
        <div className="w-8 h-16 bg-white group-hover:bg-black rounded-t-full" />
      </div>
    ),
    coordinator: "CULTURAL WING",
    timing: "01 NOV: 04:00 PM",
    fullDescription: "A platform for creative expression. Decompress from the technical grid and share your vocal or instrumental algorithms with the collective.",
    tags: ["AUDIO_WAVE", "UNPLUGGED", "EXPRESSION"],
    stats: { mainNum: "15", mainLabel: "SLOTS", subNum: "100%", subLabel: "VIBES" },
    ctaText: "REQUEST_MIC_ACCESS"
  }
];

function EventPopupHandler({ onEventFound }: { onEventFound: (id: string) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const eventId = searchParams.get('eventId');
    if (eventId) {
      onEventFound(eventId);
    }
  }, [searchParams, onEventFound]);

  return null;
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isAlumniFormOpen, setIsAlumniFormOpen] = useState(false);
  const [modalScale, setModalScale] = useState(1);

  const handleEventFound = useCallback((id: string) => {
    const event = eventsData.find(e => e.id === id);
    if (event) setSelectedEvent(event);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedEvent]);

  const handleResize = useCallback(() => {
    // 850 is base ticket width, 650 is base ticket height. 32px is for padding.
    const scaleX = (window.innerWidth - 32) / 850;
    const scaleY = (window.innerHeight - 32) / 650;
    setModalScale(Math.min(1, scaleX, scaleY));
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedEvent, handleResize]);

  return (
    <div className="min-h-screen relative w-full overflow-x-clip text-white">
      <Suspense fallback={null}>
        <EventPopupHandler onEventFound={handleEventFound} />
      </Suspense>
      <div className="scanline z-[99]"></div>



      {/* Navigation Bar */}
      <nav className="sticky top-0 w-full border-y-2 sm:border-y-4 grid-line backdrop-blur-md bg-white/30 z-50 overflow-x-auto no-scrollbar">
        <div className="flex w-full items-stretch h-14 sm:h-16">
          <Link
            href="/"
            className="flex items-center justify-center border-solid grid-line hover:bg-accent/20 transition-colors overflow-hidden flex-shrink-0 w-[52px] sm:w-[84px] border-r-2 sm:border-r-4"
            aria-label="Return to Home"
          >
            <div className="flex items-center justify-center h-full w-full min-w-0 px-2 sm:px-0">
              <Image
                src="/logowhite.svg"
                alt="Metapoise Logo"
                width={48}
                height={48}
                className="w-8 h-auto sm:w-12 sm:h-auto object-contain"
                priority
              />
            </div>
          </Link>
          <Link
            href="/events"
            id="nav-events-link"
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center bg-accent text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs lg:text-sm xl:text-base uppercase text-center px-1 sm:px-2 py-1 leading-tight font-bold"
          >
            <span className="mr-1">[01]</span>
            <span className="truncate">Events</span>
          </Link>
          <Link
            href="/schedule"
            id="nav-schedule-link"
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs lg:text-sm xl:text-base uppercase text-center px-1 sm:px-2 py-1 leading-tight"
          >
            <span className="opacity-70 sm:opacity-100 sm:mr-1">[02]</span>
            <span className="truncate">Schedule</span>
          </Link>
          <Link
            href="/speakers"
            id="nav-speakers-link"
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs lg:text-sm xl:text-base uppercase text-center px-1 sm:px-2 py-1 leading-tight"
          >
            <span className="opacity-70 sm:opacity-100 sm:mr-1">[03]</span>
            <span className="truncate">Speakers</span>
          </Link>
          <Link
            href="/about"
            id="nav-about-link"
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all mono-font text-[10px] sm:text-xs lg:text-sm xl:text-base uppercase text-center px-1 sm:px-2 py-1 leading-tight"
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
            <div className="mono-font text-xs uppercase tracking-widest text-white/70 mb-2 flex items-center gap-2">
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
            <div className="relative w-[800px] shrink-0 bg-accent text-black border-4 border-black/30 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col z-10 animate-in zoom-in-95 duration-200 pointer-events-auto">

              {/* Header */}
              <div className="border-b-4 border-black/30 p-5 flex justify-between items-start bg-accent">
                <h2 className="heading-font text-4xl uppercase leading-none max-w-[85%] break-words">
                  {selectedEvent.unit}: {selectedEvent.title}
                </h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="bg-black text-accent w-10 h-10 flex-shrink-0 flex items-center justify-center text-lg font-bold hover:bg-white hover:text-black transition-colors border-4 border-black/30"
                  aria-label="Close modal"
                >
                  [X]
                </button>
              </div>

              {/* Body Grid */}
              <div className="flex flex-row bg-accent">

                {/* Left Column (Details) */}
                <div className="w-2/3 border-r-4 border-black/30 p-6 flex flex-col justify-between">
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
                      <span key={tag} className="border-4 border-black/30 px-3 py-2 mono-font text-xs font-bold uppercase bg-transparent">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column (Stats) */}
                <div className="w-1/3 p-6 flex flex-col gap-5 bg-accent">
                  <div className="border-4 border-black/30 bg-transparent py-5 px-4 flex flex-col items-center text-center justify-center">
                    <span className="heading-font text-7xl leading-none">{selectedEvent.stats.mainNum}</span>
                    <span className="mono-font text-xs font-bold uppercase mt-3 tracking-wider">{selectedEvent.stats.mainLabel}</span>
                  </div>

                  <div className="border-4 border-black/30 bg-black text-accent py-5 px-4 flex flex-col items-center text-center justify-center">
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
              <button 
                className="w-full bg-black text-accent py-5 px-4 heading-font text-4xl uppercase hover:bg-white hover:text-black transition-colors border-t-4 border-black/30 shrink-0"
                onClick={() => {
                  if (selectedEvent.id === "evt1") {
                    setIsAlumniFormOpen(true);
                  }
                }}
              >
                {selectedEvent.ctaText}
              </button>
            </div>
          </div>
        </div>
      )}

      <AlumniRegistrationModal 
        isOpen={isAlumniFormOpen} 
        onClose={() => setIsAlumniFormOpen(false)} 
      />
    </div>
  );
}
