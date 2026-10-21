"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

export default function MerchSection() {
  return (
    <section id="merchandise" className="py-16 md:py-24 px-4 sm:px-8 md:px-16 border-b-4 grid-line relative">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
        <div>
          <span className="mono-font text-xs text-white/60 block mb-2">[02 // OFFICIAL_MERCH]</span>
          <h2 className="heading-font text-5xl sm:text-7xl uppercase">Official Apparel</h2>
        </div>
        <span className="mono-font text-xs sm:text-sm text-white/60 mt-2 sm:mt-0">
          BATCH 01 // EXCLUSIVE FESTIVAL DROP
        </span>
      </div>

      {/* Main Card Container with transparent background so the page gradient is fully visible */}
      <div className="border-4 grid-line relative overflow-hidden">
        {/* Card Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left/Center: Floating Showcase Stage */}
          <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 relative flex flex-col justify-center items-center min-h-[460px] md:min-h-[580px] overflow-hidden">
            {/* Floating T-Shirts Container */}
            <div className="relative w-full max-w-2xl flex items-center justify-center py-6 sm:py-8">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 items-center justify-items-center">
                {/* Front T-Shirt Column */}
                <div className="flex flex-col items-center group cursor-pointer w-full max-w-[280px]">
                  {/* Floating Shirt */}
                  <motion.div
                    animate={{
                      y: [-10, 10, -10],
                      rotate: [-2, 1.5, -2],
                    }}
                    transition={{
                      duration: 4.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.06,
                      y: -14,
                      transition: { duration: 0.3 },
                    }}
                    className="relative w-full aspect-[1209/1300] drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
                  >
                    <Image
                      src="/Tshirt/front.png"
                      alt="Metapoise V2.0 T-Shirt Front View"
                      width={600}
                      height={645}
                      className="w-full h-auto object-contain filter contrast-105"
                      priority
                    />
                  </motion.div>

                  {/* Dynamic Ground Shadow */}
                  <motion.div
                    animate={{
                      scaleX: [1, 0.82, 1],
                      scaleY: [1, 0.8, 1],
                      opacity: [0.55, 0.25, 0.55],
                    }}
                    transition={{
                      duration: 4.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-36 h-6 bg-black/90 blur-md rounded-full mt-2"
                  />

                  {/* Metadata Pill */}
                  <div className="mt-4 mono-font text-[11px] text-white/70 bg-white/5 border border-white/10 px-3 py-1 group-hover:border-white/40 group-hover:text-white transition-colors">
                    [01] FRONT // SPHERICAL CREST
                  </div>
                </div>

                {/* Back T-Shirt Column */}
                <div className="flex flex-col items-center group cursor-pointer w-full max-w-[280px]">
                  {/* Floating Shirt */}
                  <motion.div
                    animate={{
                      y: [10, -10, 10],
                      rotate: [1.5, -2, 1.5],
                    }}
                    transition={{
                      duration: 5.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.06,
                      y: -14,
                      transition: { duration: 0.3 },
                    }}
                    className="relative w-full aspect-[1209/1300] drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
                  >
                    <Image
                      src="/Tshirt/back.png"
                      alt="Metapoise V2.0 T-Shirt Back View"
                      width={600}
                      height={645}
                      className="w-full h-auto object-contain filter contrast-105"
                      priority
                    />
                  </motion.div>

                  {/* Dynamic Ground Shadow */}
                  <motion.div
                    animate={{
                      scaleX: [0.82, 1, 0.82],
                      scaleY: [0.8, 1, 0.8],
                      opacity: [0.25, 0.55, 0.25],
                    }}
                    transition={{
                      duration: 5.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-36 h-6 bg-black/90 blur-md rounded-full mt-2"
                  />

                  {/* Metadata Pill */}
                  <div className="mt-4 mono-font text-[11px] text-white/70 bg-white/5 border border-white/10 px-3 py-1 group-hover:border-white/40 group-hover:text-white transition-colors">
                    [02] BACK // EVENT HORIZON
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Information & Get Yours CTA */}
          <div className="lg:col-span-5 border-t-4 lg:border-t-0 lg:border-l-4 grid-line p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Product Subtitle / Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="mono-font text-xs text-accent font-semibold tracking-wider">
                  [EDITION // 2026_COLLECTION]
                </span>
              </div>

              {/* Product Title */}
              <h3 className="heading-font text-3xl sm:text-4xl md:text-5xl uppercase leading-[0.95] mb-4">
                Metapoise V2.0 Official Tee
              </h3>

              {/* Editorial Description */}
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed mb-6">
                Engineered for innovators, developers, and visionaries. Featuring a custom drop-shoulder
                silhouette with the Metapoise cyber-sphere crest on the front chest and the cosmic Event
                Horizon singularity graphic on the reverse.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-2 mb-8 mono-font text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" />
                  <span>Pre-shrunk bio-washed fabric for durable wear</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" />
                  <span>Sizes available: S, M, L, XL, XXL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" />
                  <span>Limited single-batch print for Metapoise V2.0</span>
                </div>
              </div>
            </div>

            {/* CTA Button Block */}
            <div className="pt-6 border-t-2 border-white/10">
              <a
                href="https://forms.gle/U8xymrNwJpBT32J77"
                target="_blank"
                rel="noopener noreferrer"
                id="merch-get-yours-btn"
                className="w-full bg-accent text-black font-black uppercase text-center py-4 sm:py-5 px-8 text-base sm:text-lg flex items-center justify-center gap-3 hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-xl group border-2 border-white"
              >
                <span>Get Yours</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <p className="mono-font text-[11px] text-white/50 text-center mt-3">
                SECURE ACCESS VIA OFFICIAL PRE-ORDER FORM // LIMITED SLOTS
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
