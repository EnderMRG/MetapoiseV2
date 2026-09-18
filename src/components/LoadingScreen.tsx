"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const STATUS_STAGES = [
  { threshold: 0, text: "CONNECTING TO MAINFRAME..." },
  { threshold: 25, text: "ACCESSING SERVICE TOKEN..." },
  { threshold: 50, text: "UPLOADING DATA..." },
  { threshold: 75, text: "DECRYPTING VOID PROTOCOLS..." },
  { threshold: 92, text: "SYSTEM SYNCHRONIZED // ACCESS GRANTED" },
];

export default function LoadingScreen({
  onComplete,
  duration = 2600,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(STATUS_STAGES[0].text);

  useEffect(() => {
    // Lock scroll during loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);

      // Smooth progress curve
      const nextVal = Math.min(Math.round(rawProgress), 100);
      setProgress(nextVal);

      // Update status line based on progress threshold
      for (let i = STATUS_STAGES.length - 1; i >= 0; i--) {
        if (nextVal >= STATUS_STAGES[i].threshold) {
          setCurrentStatus(STATUS_STAGES[i].text);
          break;
        }
      }

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = originalOverflow;
          if (onComplete) onComplete();
        }, 300);
      }
    }, 25);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearInterval(interval);
        setProgress(100);
        setCurrentStatus("BYPASS INITIATED // ACCESS GRANTED");
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = originalOverflow;
          if (onComplete) onComplete();
        }, 150);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [duration, onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setCurrentStatus("BYPASS INITIATED // ACCESS GRANTED");
    setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 150);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] text-black select-none pointer-events-auto"
        >
          {/* Subtle Outer Frame Grid Border */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-black/80 pointer-events-none z-20" />



          {/* Top Section */}
          <div className="absolute top-0 inset-x-0 z-30 flex items-start justify-between p-6 sm:p-8 md:p-10">
            {/* Top-Left Telemetry Block (exact reference match) */}
            <div className="mono-font text-[10px] sm:text-xs leading-tight tracking-wider text-black font-semibold space-y-1">
              <div>SECURE_BOOT: ENABLED</div>
              <div>HANDSHAKE_PROTOCOL: HEX_09</div>
              <div>ENCRYPT_AES_256: VALID</div>
              <div>LOCATING_VOID_NODE... [OK]</div>
            </div>

            {/* Top-Right Telemetry / Bypass */}
            <div className="mono-font text-[10px] sm:text-xs tracking-wider text-black flex items-center gap-4">
              <span className="hidden sm:inline font-semibold">PORT: 8080</span>
              <button
                onClick={handleSkip}
                className="hover:bg-black hover:text-white border border-black px-2 py-1 transition-colors uppercase cursor-pointer font-bold"
                title="Press ESC or click to skip"
              >
                Skip [ESC]
              </button>
            </div>
          </div>

          {/* Center Brand, Logo, Status & Progress Bar */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-8">
            <div className="pointer-events-auto flex flex-col items-center justify-center w-full">
              {/* Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-4 flex items-center justify-center flex-shrink-0"
            >
              <Image
                src="/logo.svg"
                alt="Metapoise Logo"
                width={160}
                height={160}
                priority
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Name / Title */}
            <div className="text-center mb-6">
              <h1 className="heading-font text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-black leading-[0.85]">
                <span className="higuen-font normal-case block sm:inline">
                  METAPOISE
                </span>
                <span className="block mt-1 sm:mt-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                  V2.0
                </span>
              </h1>
            </div>

            {/* Dynamic Status Text (exact position like reference image) */}
            <div className="mb-4 text-center">
              <span className="mono-font text-xs sm:text-sm md:text-base font-bold tracking-widest text-black uppercase">
                {currentStatus}
              </span>
            </div>

            {/* Progress Bar (exact brutalist rectangular style like reference image) */}
            <div className="w-full max-w-[320px] sm:max-w-[460px] md:max-w-[560px]">
              <div className="w-full h-6 sm:h-7 md:h-8 border-2 border-black bg-transparent p-0.5 relative">
                {/* Black Progress Fill */}
                <div
                  className="h-full bg-black transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Progress Percentage Display */}
              <div className="mt-2 flex justify-between items-center mono-font text-[10px] sm:text-xs font-semibold text-black">
                <span>[STAGE: 0{Math.min(Math.floor(progress / 20) + 1, 5)}/05]</span>
                <span className="tabular-nums font-bold">{progress}%</span>
              </div>
            </div>
            </div>
          </div>


          {/* Bottom Telemetry Bar (exact reference match with 4 items & top border) */}
          <div className="absolute bottom-0 inset-x-0 z-30 border-t border-black px-4 sm:px-8 py-3 sm:py-4 mono-font text-[9px] sm:text-[11px] md:text-xs tracking-wider text-black font-semibold bg-transparent backdrop-blur-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center sm:text-left">
              <div className="truncate">
                UPLINK_STRENGTH: <span className="font-bold">98.4%</span>
              </div>
              <div className="text-center truncate">
                ID: <span className="font-bold">MP_V2.0_BOOT_SEQ</span>
              </div>
              <div className="text-center sm:text-right truncate">
                NODE: <span className="font-bold">CSE_DUIET</span>
              </div>
              <div className="text-right truncate">
                PACKET_LOSS: <span className="font-bold">0.000%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
