"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, CircleNotch, PaperPlaneRight } from "@phosphor-icons/react";

interface SecureAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecureAccessModal({ isOpen, onClose }: SecureAccessModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Invitation sent successfully.");
        setTimeout(() => {
          onClose();
          // Reset after a delay
          setTimeout(() => {
            setStatus("idle");
            setEmail("");
            setMessage("");
          }, 300);
        }, 3000);
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to send invitation.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white text-black border-4 border-black/30 p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-black hover:scale-110 transition-transform"
            >
              <X size={24} weight="bold" />
            </button>

            <div className="mb-8">
              <span className="mono-font text-xs text-black/60 block mb-2">[SECURE_ACCESS_PORTAL]</span>
              <h2 className="heading-font text-3xl sm:text-4xl uppercase">Request Token</h2>
              <p className="mt-2 text-sm text-black/80 font-mono">
                Enter your email address to receive an encrypted invitation link to the convergence.
              </p>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <CheckCircle size={64} weight="fill" className="text-black mb-4" />
                <h3 className="heading-font text-2xl uppercase mb-2">Access Granted</h3>
                <p className="font-mono text-sm">{message}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="email" className="mono-font text-xs font-bold uppercase mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="agent@metapoise.dev"
                    disabled={status === "loading"}
                    className="border-2 border-black/30 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all disabled:opacity-50"
                  />
                </div>

                {status === "error" && (
                  <p className="font-mono text-xs text-red-600 bg-red-100 p-2 border border-red-600">
                    ERROR: {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !email}
                  className="mt-4 flex items-center justify-center gap-2 bg-black text-white p-4 font-bold uppercase hover:bg-accent hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed group border-2 border-black/30"
                >
                  {status === "loading" ? (
                    <>
                      <CircleNotch size={20} className="animate-spin" weight="bold" />
                      <span className="font-mono text-sm">Processing...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-mono text-sm">Send Invitation</span>
                      <PaperPlaneRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
