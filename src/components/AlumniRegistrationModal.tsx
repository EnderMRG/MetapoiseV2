"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";

interface AlumniRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AlumniRegistrationModal({ isOpen, onClose }: AlumniRegistrationModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', year: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Constraint check
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.year.trim()) {
      setErrorMessage('ALL FIELDS ARE REQUIRED TO PROCEED.');
      setStatus('error');
      return;
    }

    if (parseInt(formData.year) >= 2026) {
      setErrorMessage('Year of graduation must be less than 2026 to register as an alumni.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/alumni/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setStatus('success');
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred');
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-lg bg-black border-4 border-accent p-8 text-white z-10 shadow-[8px_8px_0_0_var(--accent)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-accent hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="heading-font text-4xl mb-2 text-accent uppercase">Establish Connection</h2>
        <p className="mono-font text-xs uppercase mb-8 opacity-70">Alumni Node Registration</p>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 border-4 border-accent rounded-full flex items-center justify-center mb-6">
              <span className="text-accent text-2xl font-bold">✓</span>
            </div>
            <h3 className="heading-font text-3xl mb-4 text-accent">Connection Established</h3>
            <p className="mono-font text-sm">Your data has been logged. A confirmation sequence has been dispatched to your email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="mono-font text-xs font-bold uppercase block mb-2 text-accent">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-2 border-white/20 p-3 mono-font text-sm focus:border-accent focus:outline-none transition-colors"
                placeholder="ENTER ALIAS"
              />
            </div>
            
            <div>
              <label className="mono-font text-xs font-bold uppercase block mb-2 text-accent">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-2 border-white/20 p-3 mono-font text-sm focus:border-accent focus:outline-none transition-colors"
                placeholder="ENTER COMMS ADDRESS"
              />
            </div>

            <div>
              <label className="mono-font text-xs font-bold uppercase block mb-2 text-accent">Phone Number</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-transparent border-2 border-white/20 p-3 mono-font text-sm focus:border-accent focus:outline-none transition-colors"
                placeholder="ENTER SECURE LINE"
              />
            </div>

            <div>
              <label className="mono-font text-xs font-bold uppercase block mb-2 text-accent">Year of Graduation</label>
              <input
                type="number"
                required
                min="1980"
                max="2025"
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: e.target.value })}
                className="w-full bg-transparent border-2 border-white/20 p-3 mono-font text-sm focus:border-accent focus:outline-none transition-colors"
                placeholder="YYYY"
              />
            </div>

            {status === 'error' && (
              <div className="bg-red-950/50 border-2 border-red-500 p-3 text-red-500 mono-font text-xs uppercase">
                ERROR: {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-4 w-full bg-accent text-black py-4 px-6 heading-font text-2xl uppercase hover:bg-white hover:text-black transition-colors flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{status === 'loading' ? 'Processing...' : 'Initialize'}</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
