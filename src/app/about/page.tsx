"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Cpu, Terminal, ShieldCheck, Sparkle, Globe, Code, Play } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Grainient from "@/components/Grainient";
import Footer from "@/components/Footer";

const v1Archive = [
  { id: "01", name: "Inauguration Ceremony", desc: "The Inauguration of Metapoise 1.0 set the stage for two days of insightful events, with leaders and experts sharing their vision for the future. The session on Intellectual Property Rights (IPR) highlighted the importance of protecting innovations and fostering a culture of creativity in the evolving tech landscape.", images: ["01 Inauguration Ceremony/01 Inauguration Ceremony - 01.webp", "01 Inauguration Ceremony/01 Inauguration Ceremony - 02.webp", "01 Inauguration Ceremony/01 Inauguration Ceremony - 03.webp", "01 Inauguration Ceremony/01 Inauguration Ceremony - 04.webp"] },
  { id: "02", name: "Plantation Drive & Cycle Rally", desc: "A community-focused green initiative to promote environmental sustainability and physical well-being among participants and students.", images: ["02 Plantation Drive and Cycle Rally/02 Plantation Drive and Cycle Rally - 01.webp", "02 Plantation Drive and Cycle Rally/02 Plantation Drive and Cycle Rally - 02.webp", "02 Plantation Drive and Cycle Rally/02 Plantation Drive and Cycle Rally - 03.webp", "02 Plantation Drive and Cycle Rally/02 Plantation Drive and Cycle Rally - 04.webp"] },
  { id: "03", name: "Open Mic", desc: "A vibrant cultural session allowing students to showcase their creative expressions through music, poetry, and stand-up performances.", images: ["03 Open Mic/03 Open Mic - 01.webp", "03 Open Mic/03 Open Mic - 02.webp", "03 Open Mic/03 Open Mic - 03.webp", "03 Open Mic/03 Open Mic - 04.webp"] },
  { id: "04", name: "Digital Transformation Workshop", desc: "An intensive workshop exploring the rapid shifts in the technological landscape, guiding students on adapting to modern digital ecosystems.", images: ["04 Digital Transformation Workshop/04 Digital Transformation Workshop - 01.webp", "04 Digital Transformation Workshop/04 Digital Transformation Workshop - 02.webp", "04 Digital Transformation Workshop/04 Digital Transformation Workshop - 03.webp", "04 Digital Transformation Workshop/04 Digital Transformation Workshop - 04.webp"] },
  { id: "05", name: "Workshop & Hackathon", desc: "Participants designed dynamic, user-friendly frontend websites in an intense collaborative sprint to solve real-world problems.", images: ["05 Workshop and Hackathon/05 Workshop and Hackathon - 01.webp", "05 Workshop and Hackathon/05 Workshop and Hackathon - 02.webp", "05 Workshop and Hackathon/05 Workshop and Hackathon - 03.webp", "05 Workshop and Hackathon/05 Workshop and Hackathon - 04.webp"] },
  { id: "06", name: "E-Sports", desc: "A competitive gaming tournament that brought out the strategic thinking and rapid reflexes of the student community.", images: ["06 E-Sports/06 E-Sports - 01.webp", "06 E-Sports/06 E-Sports - 02.webp", "06 E-Sports/06 E-Sports - 03.webp", "06 E-Sports/06 E-Sports - 04.webp"] },
  { id: "07", name: "IP & IT Workshop", desc: "An engaging seminar focusing on the intersection of Information Technology and Intellectual Property rights for future innovators.", images: ["07 IP and IT Workshop/07 IP and IT Workshop - 01.webp", "07 IP and IT Workshop/07 IP and IT Workshop - 02.webp"] },
  { id: "08", name: "Tech Quiz", desc: "The Tech Quiz Competition challenged participants' expertise in various domains of technology, from programming to emerging innovations. It fostered critical thinking and teamwork, as teams competed to answer complex tech-related questions and secure the win.", images: ["08 Tech Quiz/08 Tech Quiz - 01.webp", "08 Tech Quiz/08 Tech Quiz - 02.webp", "08 Tech Quiz/08 Tech Quiz - 03.webp", "08 Tech Quiz/08 Tech Quiz - 04.webp"] },
  { id: "09", name: "Alumni Meet", desc: "The first Techno Alumni Meet brought back graduates from 2014 to 2024 for a day of networking, reflection, and invaluable mentorship.", images: ["09 Alumni Meet/09 Alumni Meet - 01.webp", "09 Alumni Meet/09 Alumni Meet - 02.webp"] },
  { id: "10", name: "Startup Idea Competition", desc: "Concepts were refined with feedback from industry experts. High-conviction founders presented their innovative business plans and prototypes.", images: ["10 Startup Idea Competition/10 Startup Idea Competition - 01.webp", "10 Startup Idea Competition/10 Startup Idea Competition - 02.webp", "10 Startup Idea Competition/10 Startup Idea Competition - 03.webp", "10 Startup Idea Competition/10 Startup Idea Competition - 04.webp"] },
  { id: "11", name: "Entrepreneurship Summit", desc: "A high-impact summit connecting student visionaries with established entrepreneurs to discuss venture vectors and business strategies.", images: ["11 Entrepreneurship Summit/11 Entrepreneurship Summit - 01.webp", "11 Entrepreneurship Summit/11 Entrepreneurship Summit - 02.webp"] },
  { id: "12", name: "Cultural Night", desc: "The grand finale of METAPOISE v1.0, featuring a vibrant cultural night that concluded with an electrifying live performance by Abstract Waves.", images: ["12 Cultural Night/12 Cultural Night - 01.webp", "12 Cultural Night/12 Cultural Night - 02.webp"] }
];

const StackedCarousel = ({ images, eventName }: { images: string[], eventName: string }) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-lg overflow-hidden border-4 border-white/30/10">
        <Image src={`/v1-archive/${images[0]}`} alt={eventName} fill className="object-cover transition-all duration-700" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[280px] sm:h-[400px] md:h-[450px] flex flex-col items-center justify-center mt-8 mb-20">
      <div className="relative w-full max-w-[320px] sm:max-w-[500px] md:max-w-[650px] h-full">
        {images.map((img, i) => {
          let offset = (i - index + images.length) % images.length;
          if (offset > 2) return null;

          let scale = 1 - offset * 0.05;
          let y = offset * -15;
          let rotate = offset === 0 ? 0 : offset === 1 ? 4 : -4;
          let zIndex = 30 - offset * 10;
          let opacity = 1 - offset * 0.15;

          return (
            <motion.div
              key={img}
              className={`absolute inset-0 origin-bottom ${offset === 0 ? "cursor-grab active:cursor-grabbing" : ""}`}
              initial={false}
              animate={{ scale, y, rotate, zIndex, opacity }}
              drag={offset === 0 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, { offset: dragOffset, velocity }) => {
                if (dragOffset.x < -100 || velocity.x < -500) {
                  next();
                } else if (dragOffset.x > 100 || velocity.x > 500) {
                  prev();
                }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ zIndex }}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-white/30/20 shadow-xl bg-white relative">
                <Image
                  src={`/v1-archive/${img}`}
                  alt={`${eventName} Photo ${i + 1}`}
                  fill
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 500px, 650px"
                  className="object-cover pointer-events-none transition-all duration-700"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute -bottom-16 flex gap-6 z-40">
        <button onClick={prev} className="p-3 sm:p-4 bg-white text-black border-2 border-white/30 rounded-full hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
          <ArrowLeft weight="bold" />
        </button>
        <button onClick={next} className="p-3 sm:p-4 bg-white text-black border-2 border-white/30 rounded-full hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
          <ArrowRight weight="bold" />
        </button>
      </div>
    </div>
  );
};

export default function AboutUs() {
  const [activeArchiveIndex, setActiveArchiveIndex] = useState(0);

  return (
    <div className="min-h-screen relative w-full overflow-x-clip text-white">
      <div className="scanline"></div>



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
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs lg:text-sm xl:text-base uppercase text-center px-1 sm:px-2 py-1 leading-tight"
          >
            <span className="opacity-70 sm:opacity-100 sm:mr-1">[01]</span>
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
            href="/#speakers"
            id="nav-speakers-link"
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center hover:bg-accent hover:text-black transition-all border-r-2 sm:border-r-4 grid-line mono-font text-[10px] sm:text-xs lg:text-sm xl:text-base uppercase text-center px-1 sm:px-2 py-1 leading-tight"
          >
            <span className="opacity-70 sm:opacity-100 sm:mr-1">[03]</span>
            <span className="truncate">Speakers</span>
          </Link>
          <Link
            href="/about"
            id="nav-about-link"
            className="flex-1 min-w-0 flex flex-col sm:flex-row justify-center items-center bg-accent text-black transition-all mono-font text-[10px] sm:text-xs lg:text-sm xl:text-base uppercase text-center px-1 sm:px-2 py-1 leading-tight font-bold"
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
            <div className="mono-font text-xs uppercase tracking-widest text-white/70 mb-2 flex items-center gap-2">
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
                src="/logowhite.svg"
                alt="Metapoise Logo"
                width={160}
                height={160}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <div className="mono-font text-xs sm:text-sm text-left md:text-right space-y-1">
              <p className="font-bold">DEPARTMENT OF CSE, DUIET</p>
              <p>ANNUAL TECHNICAL SYMPOSIUM</p>
              <p className="text-white/60">OCTOBER 30 — NOVEMBER 01</p>
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
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-white/80 font-normal">
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
              <span className="mono-font text-xs font-bold block mb-3 text-white/60 uppercase">
                [SYSTEM_SPECIFICATIONS]
              </span>
              <div className="space-y-2 mono-font text-xs sm:text-sm">
                <div className="flex justify-between border-b border-white/30/20 pb-1">
                  <span className="text-white/60">CONVERGENCE_ID:</span>
                  <span className="font-bold">MP_V2.0_2026</span>
                </div>
                <div className="flex justify-between border-b border-white/30/20 pb-1">
                  <span className="text-white/60">VENUE:</span>
                  <span className="font-bold">DUIET CAMPUS, DIBRUGARH</span>
                </div>
                <div className="flex justify-between border-b border-white/30/20 pb-1">
                  <span className="text-white/60">ORGANIZER:</span>
                  <span className="font-bold">DEPT. OF COMPUTER SCIENCE & ENG.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">SECURITY_STATUS:</span>
                  <span className="font-bold text-emerald-700">ENCRYPTED // VERIFIED</span>
                </div>
              </div>
            </div>

            <div className="mono-font text-xs sm:text-sm text-white/80">
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

      {/* V1.0 Archive Section */}
      <section className="py-16 md:py-24 px-4 sm:px-8 md:px-16 border-b-4 grid-line">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b-2 border-white/30/20 pb-8">
          <div className="max-w-2xl">
            <span className="mono-font text-xs text-white/90 font-bold block mb-4 tracking-widest">[WHERE IT ALL STARTED]</span>
            <h2 className="heading-font text-6xl sm:text-8xl uppercase leading-none mb-6">
              Version 1.0
            </h2>
            <p className="text-xl sm:text-2xl font-medium leading-relaxed text-white/90">
              A celebration of innovation, where cutting-edge technology meets creativity, showcasing futuristic ideas, gadgets, and solutions that shape tomorrow.
            </p>
          </div>
        </div>

        {/* Telemetry Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <div className="border-t-2 border-white/30 pt-4">
            <div className="mono-font text-[10px] text-white/70 font-bold tracking-widest mb-1">EVENTS HOSTED</div>
            <div className="heading-font text-4xl sm:text-5xl">12</div>
          </div>
          <div className="border-t-2 border-white/30 pt-4">
            <div className="mono-font text-[10px] text-white/70 font-bold tracking-widest mb-1">ALUMNI BATCHES</div>
            <div className="heading-font text-4xl sm:text-5xl">2014-24</div>
          </div>
          <div className="border-t-2 border-white/30 pt-4">
            <div className="mono-font text-[10px] text-white/70 font-bold tracking-widest mb-1">CAMPUS COLLABORATORS</div>
            <div className="heading-font text-4xl sm:text-5xl">03</div>
          </div>
          <div className="border-t-2 border-white/30 pt-4">
            <div className="mono-font text-[10px] text-white/70 font-bold tracking-widest mb-1">SPONSORS</div>
            <div className="heading-font text-4xl sm:text-5xl">09</div>
          </div>
        </div>

        {/* After Movie */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-24 border-4 border-white/30/20 p-6 sm:p-8 md:p-10 bg-white/10 backdrop-blur-sm">
          <div className="md:col-span-7 relative aspect-video bg-black/5 flex items-center justify-center overflow-hidden border-2 border-white/30/10 shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/WHQgqkNU3A4?rel=0"
              title="METAPOISE v1.0 After Movie"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>
          <div className="md:col-span-5 flex flex-col justify-between py-2 md:py-0">
            <div>
              <div className="mono-font text-xs text-white/90 font-bold mb-4 tracking-widest">[YOUTUBE]</div>
              <h3 className="heading-font text-5xl sm:text-6xl uppercase mb-6 leading-tight">The After Movie</h3>
              <p className="text-sm sm:text-base leading-relaxed text-white/90 font-medium mb-6">
                Two days. One campus. All in. Talks, a hackathon, e-sports, a quiz, a startup pitch arena, an alumni homecoming and a cultural night that ended with Abstract Waves live. Press play for the recap.
              </p>
            </div>
            {/* <Link href="https://www.youtube.com/watch?v=WHQgqkNU3A4" target="_blank" className="mono-font text-xs tracking-widest hover:text-white/60 transition-colors flex items-center gap-2 border-b border-white/30 pb-2 w-fit font-bold mt-4 md:mt-0">
              OPEN ON YOUTUBE <ArrowRight />
            </Link> */}
          </div>
        </div>

        {/* The Archive Viewer */}
        <div className="border-t-2 border-white/30/20 pt-16">
          <div className="flex justify-between items-end mb-12">
            <h3 className="heading-font text-4xl sm:text-6xl uppercase">The v1.0 Archive</h3>
            <span className="mono-font text-xs text-white/80 font-bold hidden sm:block">12 EVENTS // 40 PHOTOS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Sidebar List */}
            <div className="lg:col-span-4 flex flex-col border-l-2 border-white/30/20">
              {v1Archive.map((event, index) => (
                <button
                  key={event.id}
                  onClick={() => setActiveArchiveIndex(index)}
                  className={`text-left px-4 sm:px-6 py-4 border-b border-white/30/10 transition-all flex items-center gap-4 group ${activeArchiveIndex === index
                    ? "bg-white/30 border-l-4 border-l-black"
                    : "hover:bg-white/10 border-l-4 border-l-transparent"
                    }`}
                >
                  <span className={`mono-font text-sm font-bold ${activeArchiveIndex === index ? "text-white" : "text-white/60 group-hover:text-white/90"}`}>
                    {event.id}
                  </span>
                  <span className={`heading-font text-lg sm:text-xl uppercase tracking-wide truncate font-semibold ${activeArchiveIndex === index ? "text-white" : "text-white/80 group-hover:text-black"}`}>
                    {event.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Content View */}
            <div className="lg:col-span-8 grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="xl:col-span-5 flex flex-col justify-between h-full py-4 xl:py-8">
                <div>
                  <div className="mono-font text-xs text-white/90 font-bold mb-4 tracking-widest border-b border-white/30/20 pb-4 inline-block">
                    {v1Archive[activeArchiveIndex].id} // COMPETITION
                  </div>
                  <h4 className="heading-font text-4xl sm:text-5xl md:text-6xl uppercase mb-6 leading-none">
                    {v1Archive[activeArchiveIndex].name}
                  </h4>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90 font-medium">
                    {v1Archive[activeArchiveIndex].desc}
                  </p>
                </div>
                <div className="mt-12 hidden xl:flex justify-start">
                  <button
                    onClick={() => setActiveArchiveIndex((prev) => (prev + 1) % v1Archive.length)}
                    className="mono-font text-xs tracking-widest hover:text-white/60 transition-colors flex items-center gap-2 border-b border-white/30 pb-2 uppercase font-bold"
                  >
                    NEXT EVENT <ArrowRight />
                  </button>
                </div>
              </div>

              <div className="xl:col-span-7 flex flex-col items-center justify-center w-full">
                {/* Stacked Image Carousel */}
                <StackedCarousel
                  key={v1Archive[activeArchiveIndex].id}
                  images={v1Archive[activeArchiveIndex].images}
                  eventName={v1Archive[activeArchiveIndex].name}
                />
              </div>

              <div className="mt-8 flex xl:hidden justify-end w-full">
                <button
                  onClick={() => setActiveArchiveIndex((prev) => (prev + 1) % v1Archive.length)}
                  className="mono-font text-xs tracking-widest hover:text-white/60 transition-colors flex items-center gap-2 border-b border-white/30 pb-2 uppercase font-bold"
                >
                  NEXT EVENT <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Host Department Overview (Speakers / Faculty) */}
      <section id="speakers" className="py-16 md:py-24 px-4 sm:px-8 md:px-16 border-b-4 grid-line">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 lg:col-span-4 pr-4">
            <span className="mono-font text-xs text-white/60 block mb-2">[02 // HOST_ENTITY]</span>
            <h2 className="heading-font text-4xl md:text-5xl lg:text-6xl uppercase leading-tight break-words">
              Department of Computer Science and Engineering
            </h2>
            <div className="mt-4 mono-font text-xs text-white/70">
              <p>DUIET, DIBRUGARH UNIVERSITY</p>
              <p>ESTABLISHED: 2009</p>
              <p>ASSAM, INDIA</p>
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8 space-y-6">
            <p className="text-lg sm:text-xl font-light leading-relaxed">
              The Department of Computer Science &amp; Engineering at DUIET is dedicated
              to creating responsible and skilled thought leaders in computing. Through
              a state-of-the-art education and research ecosystem, a sustainable
              industry-academic interface, and lifelong learning, the department empowers
              graduates to design technically sound, economically feasible, and socially
              conscious computing systems addressing real-world challenges.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t-2 border-white/30/20 pt-6 mono-font text-xs">
              <div className="border border-white/30 p-4 bg-white/10 flex flex-col justify-between">
                <div>
                  <span className="block text-white/60 mb-1 font-bold">[VISION &amp; MISSION]</span>
                  <p className="font-semibold text-white/90">
                    To create responsible and skilled thought leaders in CSE through a state-of-the-art research ecosystem, industry collaboration, and entrepreneurship.
                  </p>
                </div>
                <div className="mt-3 text-[10px] text-white/50 border-t border-white/30/10 pt-1">
                  PEO // CRITICAL THINKING &amp; ETHICS
                </div>
              </div>

              <div className="border border-white/30 p-4 bg-white/10 flex flex-col justify-between">
                <div>
                  <span className="block text-white/60 mb-1 font-bold">[06 SPECIALIZED LABS]</span>
                  <p className="font-semibold text-white/90">
                    AI Lab, Network &amp; Security Lab, IoT Lab, Image Processing Lab, and dual Programming Laboratories.
                  </p>
                </div>
                <div className="mt-3 text-[10px] text-white/50 border-t border-white/30/10 pt-1">
                  INFRA // ROBOTICS, MATROX &amp; NS3
                </div>
              </div>

              <div className="border border-white/30 p-4 bg-white/10 flex flex-col justify-between">
                <div>
                  <span className="block text-white/60 mb-1 font-bold">[CURRICULUM &amp; MOU]</span>
                  <p className="font-semibold text-white/90">
                    Deep curriculum in Algorithms, Network Security, AI &amp; Compilers. MOU with Spoken Tutorial at IIT Bombay (MHRD).
                  </p>
                </div>
                <div className="mt-3 text-[10px] text-white/50 border-t border-white/30/10 pt-1">
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
          <span className="mono-font text-xs uppercase tracking-widest text-white/60 block mb-4">
            [READY_TO_EXPLORE?]
          </span>
          <h2 className="heading-font text-4xl sm:text-6xl md:text-8xl uppercase mb-8">
            Enter the Convergence
          </h2>
          <p className="mono-font text-xs sm:text-sm md:text-base mb-10 max-w-xl mx-auto text-white/80">
            CONNECT WITH MENTORS, BUILDERS, AND VISIONARIES AT METAPOISE V2.0.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              id="about-cta-home"
              className="bg-accent text-black px-8 md:px-14 py-4 md:py-5 text-sm sm:text-base font-black uppercase hover:scale-105 transition-transform flex items-center justify-center gap-3 border-2 border-white/30"
            >
              <ArrowLeft weight="bold" />
              Return to Mainframe
            </Link>
            <Link
              href="/schedule"
              id="about-cta-schedule"
              className="bg-white/40 hover:bg-white/80 hover:text-black px-8 md:px-14 py-4 md:py-5 text-sm sm:text-base font-bold uppercase transition-colors flex items-center justify-center gap-3 border-2 border-white/30"
            >
              View Full Schedule
              <ArrowRight weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer (Identical to Landing Page) */}
      <Footer className="grid-line-accent" />
    </div>
  );
}
