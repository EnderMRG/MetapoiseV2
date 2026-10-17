"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowSquareOut, ClockCountdown, WarningCircle } from "@phosphor-icons/react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: {
    id?: string;
    unit?: string;
    title?: string;
    timing?: string;
    coordinator?: string;
    ctaText?: string;
  } | null;
}

export default function ComingSoonModal({
  isOpen,
  onClose,
  event,
}: ComingSoonModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[160] flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer transition-opacity"
        onClick={onClose}
        aria-label="Close modal overlay"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-accent text-black border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col z-10 animate-in zoom-in-95 duration-200 pointer-events-auto overflow-hidden">
        {/* Header Bar */}
        <div className="border-b-4 border-black p-4 sm:p-5 flex justify-between items-center bg-accent shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <span className="mono-font text-[11px] sm:text-xs font-black uppercase tracking-wider text-black">
              STATUS // ACCESS_PENDING
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="bg-black text-accent w-10 h-10 flex-shrink-0 flex items-center justify-center text-lg font-bold hover:bg-white hover:text-black transition-colors border-2 border-black cursor-pointer"
            aria-label="Close notification"
          >
            [X]
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 flex flex-col bg-accent">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-black text-accent border-2 border-black shrink-0 hidden sm:flex items-center justify-center">
              <ClockCountdown size={36} weight="bold" />
            </div>
            <div>
              <div className="mono-font text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-black/70 mb-1">
                REGISTRATION PORTAL
              </div>
              <h2
                id="coming-soon-title"
                className="heading-font text-3xl sm:text-4xl md:text-5xl uppercase leading-[0.9] tracking-tight font-black"
              >
                COMING SOON
              </h2>
            </div>
          </div>

          {/* Targeted Event Badge */}
          {event && (
            <div className="border-2 border-black/40 bg-black/[0.06] p-3 sm:p-4 mb-5 space-y-1.5">
              <div className="flex items-center justify-between border-b border-black/20 pb-1.5 gap-2">
                <span className="mono-font text-xs font-black uppercase tracking-wider text-black">
                  {event.unit ? `${event.unit}: ` : ""}{event.title}
                </span>
                <span className="mono-font text-[10px] font-bold bg-black text-accent px-1.5 py-0.5 uppercase shrink-0">
                  PENDING
                </span>
              </div>

              {event.timing && (
                <div className="mono-font text-[11px] font-bold text-black/80 flex items-center gap-1.5 pt-1">
                  <span className="w-1.5 h-1.5 bg-black inline-block"></span>
                  <span>SCHEDULED: {event.timing}</span>
                </div>
              )}

              {event.coordinator && (
                <div className="mono-font text-[10px] sm:text-[11px] text-black/75 break-words">
                  LEAD: {event.coordinator}
                </div>
              )}
            </div>
          )}

          {/* Cyber Briefing Message */}
          <div className="mono-font text-xs sm:text-sm text-black/90 uppercase leading-relaxed mb-6 space-y-2">
            <p>
              Official registration slots and entry links for this event have not yet been unlocked.
            </p>
            <p className="text-black/70 text-[11px]">
              Direct registration links will be initialized soon. Keep an eye on the schedule grid or reach out to the event lead.
            </p>
          </div>

          {/* Barcode Accent */}
          <div className="flex justify-between h-6 w-full opacity-60">
            {[...Array(40)].map((_, i) => {
              const width = i % 5 === 0 ? "5px" : i % 2 === 0 ? "3px" : "1.5px";
              const opacity = i % 9 === 0 ? 0 : 1;
              return (
                <div
                  key={i}
                  className="bg-black h-full"
                  style={{ width, opacity }}
                />
              );
            })}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t-4 border-black shrink-0">
          <Link
            href="/schedule"
            onClick={onClose}
            className="bg-black/10 text-black py-4 px-4 mono-font text-xs sm:text-sm font-bold uppercase hover:bg-black hover:text-accent transition-colors flex items-center justify-center gap-2 border-b-2 sm:border-b-0 sm:border-r-4 border-black text-center"
          >
            <span>CHECK SCHEDULE</span>
            <ArrowSquareOut size={16} weight="bold" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-black text-accent py-4 px-4 heading-font text-lg sm:text-xl uppercase hover:bg-white hover:text-black transition-colors font-black tracking-wider text-center cursor-pointer"
          >
            [ ACKNOWLEDGE ]
          </button>
        </div>
      </div>
    </div>
  );
}
