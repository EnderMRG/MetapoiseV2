"use client";

import Link from "next/link";
import { ArrowLeft, LockKey } from "@phosphor-icons/react";
import Footer from "@/components/Footer";

export default function Speakers() {
  return (
    <div className="min-h-screen relative w-full overflow-x-clip text-white flex flex-col justify-between">
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 mt-20">
        <div className="z-10 flex flex-col items-center text-center max-w-4xl w-full">
          <div className="border-4 border-white/20 bg-white/5 backdrop-blur-sm p-8 sm:p-16 w-full shadow-[12px_12px_0_rgba(255,255,255,0.1)] relative overflow-hidden group">
            {/* Decorative background grid */}
            <div className="absolute inset-0 z-[-1] opacity-20 pointer-events-none grid-line mix-blend-overlay"></div>
            
            <LockKey size={64} weight="duotone" className="text-accent mx-auto mb-8 opacity-80 group-hover:scale-110 transition-transform duration-500" />
            
            <span className="mono-font text-xs sm:text-sm text-accent font-bold block mb-6 tracking-widest animate-pulse">
              [ACCESS DENIED // DATA ENCRYPTED]
            </span>
            
            <h1 className="heading-font text-5xl sm:text-7xl md:text-8xl uppercase leading-none mb-8">
              Revealing Soon
            </h1>
            
            <p className="mono-font text-sm sm:text-base text-white/70 max-w-lg mx-auto mb-12">
              The lineup of visionary speakers for METAPOISE v2.0 is currently locked. Decryption is in progress. Check back soon.
            </p>

            <Link 
              href="/" 
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 mono-font text-sm uppercase tracking-widest font-bold hover:bg-accent hover:text-black transition-colors"
            >
              <ArrowLeft weight="bold" size={16} />
              Return to Base
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
