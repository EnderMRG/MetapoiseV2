"use client";

import Link from "next/link";
import Grainient from "@/components/Grainient";
import Footer from "@/components/Footer";

export default function SchedulePage() {
  const scheduleData = [
    {
      dayStr: "DAY_01",
      dateStr: "30.10.26",
      events: [
        { time: "09:00 - 10:30", type: "KEYNOTE", title: "INAUGURATION & KEYNOTE SEMINAR", location: "VOID_MAIN" },
        { time: "10:45 - 13:30", type: "WORKSHOP", title: "PRACTICAL TECHNICAL WORKSHOP", location: "LAB_02", eventId: "evt7" },
        { time: "14:00 - 17:30", type: "EXHIBITION", title: "STARTUP & INNOVATION EXPO", location: "EXHIBITION_HALL", eventId: "evt3" }
      ]
    },
    {
      dayStr: "DAY_02",
      dateStr: "31.10.26",
      events: [
        { time: "09:30 - 17:00", type: "COMPETITION", title: "APORIA", location: "VOID_MAIN", eventId: "evt2" },
        { time: "10:00 - 17:00", type: "EXHIBITION", title: "INTERACTIVE PROJECT STALLS", location: "EXHIBITION_HALL", eventId: "evt3" }
      ]
    },
    {
      dayStr: "DAY_03",
      dateStr: "01.11.26",
      events: [
        { time: "09:00 - 16:00", type: "HACKATHON", title: "CRESCENDO", location: "VOID_MAIN", eventId: "evt1" },
        { time: "10:00 - 16:00", type: "EXHIBITION", title: "INTERACTIVE PROJECT STALLS", location: "EXHIBITION_HALL", eventId: "evt3" },
        { time: "16:30 - 18:00", type: "CEREMONY", title: "VALEDICTORY & AWARD CEREMONY", location: "MAIN_AUDITORIUM" }
      ]
    }
  ];

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
      <section className="px-4 sm:px-8 md:px-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-4 border-black bg-white/20 backdrop-blur-sm">
          {scheduleData.map((day, dayIndex) => (
            <div key={day.dayStr} className={`flex flex-col border-black p-4 sm:p-6 md:p-8 ${dayIndex !== scheduleData.length - 1 ? 'border-b-4 lg:border-b-0 lg:border-r-4' : ''}`}>

              {/* Day Header */}
              <div className="flex justify-between items-end border-b-4 border-black pb-4 mb-6">
                <h3 className="heading-font text-4xl sm:text-5xl uppercase leading-none">{day.dayStr}</h3>
                <span className="mono-font text-sm font-bold tracking-widest">{day.dateStr}</span>
              </div>

              {/* Event Stack */}
              <div className="flex flex-col gap-6">
                {day.events.map((event, eventIdx) => (
                  <div
                    key={eventIdx}
                    className="relative border-4 border-black p-6 flex flex-col transition-all duration-200 group bg-transparent text-black hover:bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  >

                    <div className="flex justify-between items-center mb-8">
                      <span className="mono-font text-xs font-bold tracking-widest">[{event.time}]</span>
                      <span className="mono-font text-[10px] font-bold px-2 py-1 uppercase border-2 transition-colors border-black">
                        {event.type}
                      </span>
                    </div>

                    {event.eventId ? (
                      <Link href={`/events?eventId=${event.eventId}`} prefetch={true} className="hover:underline decoration-4 underline-offset-4">
                        <h4 className="heading-font text-3xl sm:text-4xl uppercase leading-none mb-8">
                          {event.title}
                        </h4>
                      </Link>
                    ) : (
                      <h4 className="heading-font text-3xl sm:text-4xl uppercase leading-none mb-8">
                        {event.title}
                      </h4>
                    )}

                    <div className="mt-auto mono-font text-xs font-bold uppercase flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      {event.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer className="grid-line" />
    </div>
  );
}
