"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, X, Terminal, Code2, AlertCircle, FileText } from "lucide-react";

interface HackathonRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToEvent?: () => void;
}

export const PROBLEM_STATEMENTS = [
  {
    id: "PS-S01",
    title: "PS-S01: Intelligent Flood Relief & Resource Routing System",
    track: "Track A: Software",
    domain: "Crisis Logistics / AI Routing",
  },
  {
    id: "PS-S02",
    title: "PS-S02: AI-Powered Smart Contract Auditor",
    track: "Track A: Software",
    domain: "Web3 / AI Security",
  },
  {
    id: "PS-S03",
    title: "PS-S03: Predictive Maintenance IoT Edge Agent",
    track: "Track A: Software",
    domain: "Industrial IoT / Edge AI",
  },
  {
    id: "PS-S04",
    title: "PS-S04: Smart Pothole Mapping via Passive Crowdsourcing",
    track: "Track A: Software",
    domain: "Civic Tech / Smart Mobility",
  },
  {
    id: "PS-H01",
    title: "PS-H01: Self-Powered Agricultural Sentinel with Soil NPK Sensing",
    track: "Track B: Hardware",
    domain: "AgriTech / Low-Power Embedded",
  },
  {
    id: "PS-H02",
    title: "PS-H02: Smart Wearable Fall & Cardiac Anomaly Alert Node",
    track: "Track B: Hardware",
    domain: "MedTech / Bio-Kinematics",
  },
];

export default function HackathonRegistrationModal({
  isOpen,
  onClose,
  onBackToEvent,
}: HackathonRegistrationModalProps) {
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [teamSize, setTeamSize] = useState<number>(2);
  const [teamMembers, setTeamMembers] = useState<string[]>([""]);
  const [institution, setInstitution] = useState("");
  const [psid, setPsid] = useState(PROBLEM_STATEMENTS[0].title);
  const [projectDescription, setProjectDescription] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [githubLink, setGithubLink] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lock background scroll when modal is open and reset scroll position to top
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    if (status === "success") {
      setStatus("idle");
      setTeamName("");
      setLeaderName("");
      setPhone("");
      setEmail("");
      setTeamSize(2);
      setTeamMembers([""]);
      setInstitution("");
      setProjectDescription("");
      setLiveLink("");
      setGithubLink("");
    }
    onClose();
  };

  // Adjust teamMembers array length whenever teamSize changes
  const handleTeamSizeChange = (newSize: number) => {
    const clamped = Math.max(2, Math.min(4, newSize));
    setTeamSize(clamped);
    const extraSlots = clamped - 1;
    setTeamMembers(prev => {
      const updated = [...prev];
      if (updated.length < extraSlots) {
        while (updated.length < extraSlots) updated.push("");
      } else if (updated.length > extraSlots) {
        return updated.slice(0, extraSlots);
      }
      return updated;
    });
  };

  const handleMemberNameChange = (index: number, value: string) => {
    setTeamMembers(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Form validation
    if (
      !teamName.trim() ||
      !leaderName.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !institution.trim() ||
      !psid.trim() ||
      !projectDescription.trim() ||
      !githubLink.trim()
    ) {
      setErrorMessage("PLEASE COMPLETE ALL REQUIRED DOSSIER FIELDS BEFORE COMPILATION.");
      setStatus("error");
      return;
    }

    if (teamSize > 1) {
      for (let i = 0; i < teamSize - 1; i++) {
        if (!teamMembers[i] || !teamMembers[i].trim()) {
          setErrorMessage(`PLEASE SPECIFY NAME FOR TEAM MEMBER 0${i + 2}.`);
          setStatus("error");
          return;
        }
      }
    }

    // Basic email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("INVALID COMMUNICATIONS ADDRESS (EMAIL FORMAT INVALID).");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const payload = {
        teamName: teamName.trim(),
        leaderName: leaderName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        teamSize,
        teamMembers: teamMembers.slice(0, teamSize - 1),
        institution: institution.trim(),
        psid,
        projectDescription: projectDescription.trim(),
        liveLink: liveLink.trim(),
        githubLink: githubLink.trim(),
      };

      const res = await fetch("/api/hackathon/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit dossier to mainframe.");
      }

      setStatus("success");
    } catch (err: any) {
      setErrorMessage(err.message || "Compilation failed. Check system logs.");
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  const selectedStatementObj = PROBLEM_STATEMENTS.find(p => p.title === psid) || PROBLEM_STATEMENTS[0];

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
        onClick={handleClose}
        aria-label="Close backdrop"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-accent text-black border-4 border-black/40 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[92vh] z-10 animate-in zoom-in-95 duration-200 pointer-events-auto overflow-hidden">
        
        {/* Terminal Header */}
        <div className="border-b-4 border-black/30 p-4 sm:p-5 flex justify-between items-start bg-accent shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
              <span className="mono-font text-[11px] font-black uppercase tracking-widest text-black/70">
                UNIT_007 // COMPILER_ACCESS_PORTAL
              </span>
            </div>
            <h2 className="heading-font text-2xl sm:text-3xl md:text-4xl uppercase leading-none font-bold">
              HACKATHON DOSSIER SUBMISSION
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {onBackToEvent && (
              <button
                type="button"
                onClick={onBackToEvent}
                className="hidden sm:inline-flex items-center gap-1 bg-black/10 hover:bg-black hover:text-accent border-2 border-black/30 text-black px-2.5 py-1.5 mono-font text-xs font-bold uppercase transition-colors"
              >
                ← BACK
              </button>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="bg-black text-accent w-10 h-10 flex-shrink-0 flex items-center justify-center text-lg font-bold hover:bg-white hover:text-black transition-colors border-2 border-black/30"
              aria-label="Close form"
            >
              [X]
            </button>
          </div>
        </div>

        {/* Content Body */}
        {status === "success" ? (
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center overflow-y-auto ticket-scrollbar">
            <div className="w-20 h-20 border-4 border-black bg-black text-accent flex items-center justify-center mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <Check className="w-10 h-10 text-accent" strokeWidth={3.5} />
            </div>

            <span className="mono-font text-xs font-black uppercase tracking-wider bg-black text-accent px-3 py-1 mb-2">
              STATUS: COMPILED & CONFIRMED
            </span>

            <h3 className="heading-font text-3xl sm:text-5xl uppercase font-black mb-3">
              DOSSIER COMPILED & SAVED
            </h3>

            <p className="mono-font text-sm uppercase max-w-lg mb-6 text-black/80 font-medium">
              Payload received. All parameters for team <strong className="text-black bg-white px-1.5 py-0.5 border border-black">{teamName}</strong> have been successfully verified and registered.
            </p>

            <div className="w-full max-w-lg bg-black/[0.04] border-2 border-black/30 p-4 text-left mono-font text-xs space-y-2 mb-8">
              <div className="flex justify-between border-b border-black/15 pb-1">
                <span className="text-black/60 uppercase">TEAM:</span>
                <span className="font-bold">{teamName}</span>
              </div>
              <div className="flex justify-between border-b border-black/15 pb-1">
                <span className="text-black/60 uppercase">LEADER:</span>
                <span className="font-bold">{leaderName} ({phone})</span>
              </div>
              <div className="flex justify-between border-b border-black/15 pb-1">
                <span className="text-black/60 uppercase">MEMBERS:</span>
                <span className="font-bold">{teamSize} participant(s)</span>
              </div>
              <div className="flex justify-between border-b border-black/15 pb-1">
                <span className="text-black/60 uppercase">INSTITUTION:</span>
                <span className="font-bold">{institution}</span>
              </div>
              <div className="flex justify-between border-b border-black/15 pb-1">
                <span className="text-black/60 uppercase">PSID:</span>
                <span className="font-bold text-right truncate max-w-[280px]">{psid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60 uppercase">GITHUB:</span>
                <a href={githubLink} target="_blank" rel="noopener noreferrer" className="font-bold underline truncate max-w-[280px]">
                  {githubLink}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center w-full max-w-md">
              <a
                href="/Docs/crecendo_hackathon.pdf"
                download="crecendo_hackathon.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[160px] bg-white text-black border-2 border-black py-3 px-4 mono-font text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>DOWNLOAD_PROBLEM_STATEMENT</span>
              </a>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 min-w-[160px] bg-black text-accent border-2 border-black py-3 px-4 mono-font text-xs font-black uppercase hover:bg-white hover:text-black transition-colors"
              >
                [ CLOSE_COMPILER ]
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            {/* Scrollable Form Body */}
            <div ref={scrollContainerRef} className="p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto ticket-scrollbar flex-1">
              
              {/* Alert Notification */}
              {errorMessage && (
                <div className="border-2 border-red-600 bg-red-500/10 p-3.5 flex items-start gap-3 animate-in shake duration-200">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="mono-font text-xs font-black uppercase text-red-600 block">
                      TRANSMISSION ERROR DETECTED
                    </span>
                    <span className="mono-font text-xs uppercase text-red-700">
                      {errorMessage}
                    </span>
                  </div>
                </div>
              )}

              {/* 01. TEAM DETAILS */}
              <div className="border-2 border-black/30 p-4 sm:p-5 bg-black/[0.02] space-y-4">
                <div className="flex items-center justify-between border-b-2 border-black/20 pb-2">
                  <span className="mono-font text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
                    <span className="bg-black text-accent px-1.5 py-0.5 text-[10px]">01</span>
                    TEAM DIRECTORY & SIZING
                  </span>
                  <span className="mono-font text-[10px] font-bold text-black/60 uppercase">
                    MAX SIZE: 04 MEMBERS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Team Name */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="mono-font text-xs font-bold uppercase block text-black">
                      TEAM NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={teamName}
                      onChange={e => setTeamName(e.target.value)}
                      placeholder="e.g. CYBER_SENTINELS_01"
                      className="w-full bg-white border-2 border-black/40 p-2.5 sm:p-3 mono-font text-sm uppercase placeholder:normal-case placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>

                  {/* Team Leader Name */}
                  <div className="space-y-1">
                    <label className="mono-font text-xs font-bold uppercase block text-black">
                      TEAM LEADER NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={leaderName}
                      onChange={e => setLeaderName(e.target.value)}
                      placeholder="Leader Full Name"
                      className="w-full bg-white border-2 border-black/40 p-2.5 sm:p-3 mono-font text-sm placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>

                  {/* Leader Phone */}
                  <div className="space-y-1">
                    <label className="mono-font text-xs font-bold uppercase block text-black">
                      LEADER PHONE NUMBER <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-white border-2 border-black/40 p-2.5 sm:p-3 mono-font text-sm placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>

                  {/* Leader Email */}
                  <div className="space-y-1">
                    <label className="mono-font text-xs font-bold uppercase block text-black">
                      LEADER EMAIL ADDRESS <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="leader@institute.edu"
                      className="w-full bg-white border-2 border-black/40 p-2.5 sm:p-3 mono-font text-sm placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>

                  {/* Team Size Dropdown */}
                  <div className="space-y-1">
                    <label className="mono-font text-xs font-bold uppercase block text-black flex items-center justify-between">
                      <span>TEAM SIZE <span className="text-red-500">*</span></span>
                      <span className="text-[10px] text-black/60 font-semibold">(SELECT TO EXPAND MEMBERS)</span>
                    </label>
                    <select
                      value={teamSize}
                      onChange={e => handleTeamSizeChange(parseInt(e.target.value))}
                      className="w-full bg-white border-2 border-black/40 p-2.5 sm:p-3 mono-font text-sm font-bold uppercase focus:border-black focus:outline-none focus:ring-1 focus:ring-black cursor-pointer transition-colors"
                    >
                      <option value={2}>DUO (02 MEMBERS // LEADER + 1 MEMBER)</option>
                      <option value={3}>TRIO (03 MEMBERS // LEADER + 2 MEMBERS)</option>
                      <option value={4}>SQUAD (04 MEMBERS // LEADER + 3 MEMBERS)</option>
                    </select>
                  </div>
                </div>

                {/* DYNAMIC TEAM MEMBER INPUTS ACCORDING TO TEAM SIZE */}
                <div className="pt-2 border-t border-black/15">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="mono-font text-[11px] font-black uppercase text-black">
                      MEMBER ROSTER CONFIGURATION:
                    </span>
                    <span className="mono-font text-[10px] bg-black text-accent px-1.5 py-0.5 uppercase">
                      {teamSize === 2 ? "DUO (2 OPERATORS)" : teamSize === 3 ? "TRIO (3 OPERATORS)" : "SQUAD (4 OPERATORS)"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {Array.from({ length: teamSize - 1 }).map((_, idx) => (
                      <div key={idx} className="space-y-1 animate-in fade-in duration-150">
                        <label className="mono-font text-[11px] font-bold uppercase block text-black">
                          MEMBER 0{idx + 2} FULL NAME <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={teamMembers[idx] || ""}
                          onChange={e => handleMemberNameChange(idx, e.target.value)}
                          placeholder={`Member 0${idx + 2} Name`}
                          className="w-full bg-white border-2 border-black/40 p-2 mono-font text-xs placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Institution */}
                <div className="space-y-1 pt-1">
                  <label className="mono-font text-xs font-bold uppercase block text-black">
                    INSTITUTION / UNIVERSITY / COLLEGE <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={e => setInstitution(e.target.value)}
                    placeholder="e.g. Department of CSE, DUIET, Dibrugarh University"
                    className="w-full bg-white border-2 border-black/40 p-2.5 sm:p-3 mono-font text-sm placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>
              </div>

              {/* 02. PROBLEM STATEMENT (PSID) */}
              <div className="border-2 border-black/30 p-4 sm:p-5 bg-black/[0.02] space-y-4">
                <div className="flex items-center justify-between border-b-2 border-black/20 pb-2">
                  <span className="mono-font text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
                    <span className="bg-black text-accent px-1.5 py-0.5 text-[10px]">02</span>
                    OFFICIAL PROBLEM STATEMENT (PSID)
                  </span>
                  <span className="mono-font text-[10px] font-bold text-black/60 uppercase">
                    CHOOSE YOUR TRACK
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="mono-font text-xs font-bold uppercase block text-black">
                    SELECT PROBLEM STATEMENT (PSID) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={psid}
                    onChange={e => setPsid(e.target.value)}
                    className="w-full bg-white border-2 border-black/40 p-2.5 sm:p-3 mono-font text-xs sm:text-sm font-bold uppercase focus:border-black focus:outline-none focus:ring-1 focus:ring-black cursor-pointer transition-colors"
                  >
                    {PROBLEM_STATEMENTS.map(ps => (
                      <option key={ps.id} value={ps.title}>
                        [{ps.id}] {ps.title}
                      </option>
                    ))}
                  </select>

                  {/* Problem statement metadata card */}
                  <div className="border border-black/20 bg-white p-3 flex flex-wrap items-center justify-between gap-2 mono-font text-xs">
                    <div>
                      <span className="text-black/60 font-medium">ASSIGNED TRACK: </span>
                      <span className="font-black bg-black text-accent px-1.5 py-0.5 text-[10px] uppercase">
                        {selectedStatementObj.track}
                      </span>
                    </div>
                    <div>
                      <span className="text-black/60 font-medium">DOMAIN: </span>
                      <span className="font-bold uppercase text-black">{selectedStatementObj.domain}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 03. PROJECT DOSSIER & LINKS */}
              <div className="border-2 border-black/30 p-4 sm:p-5 bg-black/[0.02] space-y-4">
                <div className="flex items-center justify-between border-b-2 border-black/20 pb-2">
                  <span className="mono-font text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
                    <span className="bg-black text-accent px-1.5 py-0.5 text-[10px]">03</span>
                    PROJECT DOSSIER & REPOSITORIES
                  </span>
                  <span className="mono-font text-[10px] font-bold text-black/60 uppercase">
                    DIGITAL ARTIFACTS
                  </span>
                </div>

                {/* Project Description */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="mono-font text-xs font-bold uppercase block text-black">
                      PROJECT DESCRIPTION / ARCHITECTURE BRIEF <span className="text-red-500">*</span>
                    </label>
                    <span className="mono-font text-[10px] text-black/50">
                      {projectDescription.length} CHARS
                    </span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={projectDescription}
                    onChange={e => setProjectDescription(e.target.value)}
                    placeholder="Concise overview of your solution: problem addressed, architectural overview, technology stack utilized, and primary innovation points..."
                    className="w-full bg-white border-2 border-black/40 p-2.5 sm:p-3 mono-font text-xs sm:text-sm placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* GitHub Repo Link */}
                  <div className="space-y-1">
                    <label className="mono-font text-xs font-bold uppercase block text-black">
                      GITHUB REPOSITORY LINK <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={githubLink}
                      onChange={e => setGithubLink(e.target.value)}
                      placeholder="https://github.com/team-name/repo"
                      className="w-full bg-white border-2 border-black/40 p-2.5 sm:p-3 mono-font text-sm placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>

                  {/* Live Link */}
                  <div className="space-y-1">
                    <label className="mono-font text-xs font-bold uppercase block text-black flex items-center justify-between">
                      <span>LIVE DEMO / BENCH URL</span>
                      <span className="text-[10px] text-black/60 font-semibold">(OPTIONAL / RECOMMENDED)</span>
                    </label>
                    <input
                      type="url"
                      value={liveLink}
                      onChange={e => setLiveLink(e.target.value)}
                      placeholder="https://demo.vercel.app or video link"
                      className="w-full bg-white border-2 border-black/40 p-2.5 sm:p-3 mono-font text-sm placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Submit Action */}
            <div className="border-t-4 border-black/30 p-4 sm:p-5 bg-accent flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="mono-font text-[11px] uppercase text-black/70 font-semibold hidden sm:block">
                <span>PHASE 1 SUBMISSION</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-black/10 hover:bg-black/20 text-black border-2 border-black/30 py-3 sm:py-3.5 px-4 mono-font text-xs font-bold uppercase transition-colors"
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-black text-accent hover:bg-white hover:text-black border-2 border-black/30 py-3 sm:py-3.5 px-4 mono-font text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1.5 disabled:opacity-60 cursor-pointer"
                >
                  {status === "loading" ? (
                    <>
                      <span className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                      <span>COMPILING...</span>
                    </>
                  ) : (
                    <span>Compile Data</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
