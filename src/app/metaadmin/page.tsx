"use client";

import { useState } from "react";
import { ShieldCheck, ArrowRight, Download, Plus, Trash2 } from "lucide-react";

export default function MetaAdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<{name: string, email: string, phone: string, year: string}[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState({ name: "", email: "", phone: "", year: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch('/api/alumni/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!res.ok) {
        throw new Error("Unauthorized Access");
      }

      const json = await res.json();
      setData(json.data);
      setIsAuthenticated(true);
    } catch (err) {
      setError("ACCESS DENIED. INVALID CREDENTIALS.");
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    let csvContent = "Name,Email,Phone,Year\r\n";
    data.forEach(row => {
      csvContent += `"${row.name}","${row.email}","${row.phone || ''}","${row.year}"\r\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "alumni_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/alumni/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, action: 'ADD', data: newRecord })
      });
      if (res.ok) {
        setData([...data, newRecord]);
        setNewRecord({ name: "", email: "", phone: "", year: "" });
        setShowAddForm(false);
      }
    } catch (err) {
      alert("Failed to add record");
    }
  };

  const handleDelete = async (index: number) => {
    if (!confirm("Delete this record?")) return;
    try {
      const res = await fetch('/api/alumni/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, action: 'DELETE', data: { index } })
      });
      if (res.ok) {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
      }
    } catch (err) {
      alert("Failed to delete record");
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md border-4 border-white/30 p-8 shadow-[12px_12px_0_0_rgba(255,255,255,0.2)]">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck size={32} />
            <h1 className="heading-font text-4xl uppercase leading-none">Admin Auth</h1>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div>
              <label className="mono-font text-xs font-bold uppercase block mb-2 text-white/70">Master Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent border-2 border-white/30 p-4 mono-font text-sm focus:border-white focus:outline-none transition-colors"
                placeholder="ENTER PASSPHRASE"
              />
            </div>

            {error && (
              <div className="bg-red-950/50 border-2 border-red-500 p-3 text-red-500 mono-font text-xs uppercase">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-white text-black py-4 px-6 heading-font text-2xl uppercase hover:bg-white/80 transition-colors flex items-center justify-between group"
            >
              <span>{loading ? 'AUTHENTICATING...' : 'LOGIN'}</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-4 border-white/30 pb-6 mb-12 gap-6">
          <div>
            <h1 className="heading-font text-5xl md:text-7xl uppercase leading-none mb-2">Meta Dashboard</h1>
            <p className="mono-font text-sm uppercase opacity-70">Alumni Node Database</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="border-2 border-white/30 px-6 py-3 mono-font text-xs uppercase font-bold hover:bg-white hover:text-black transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Add Record
            </button>
            <button 
              onClick={downloadCSV}
              className="border-2 border-white/30 px-6 py-3 mono-font text-xs uppercase font-bold hover:bg-white hover:text-black transition-colors flex items-center gap-2"
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {showAddForm && (
          <form onSubmit={handleAdd} className="mb-8 border-4 border-white/30 p-6 flex flex-col md:flex-row gap-4 items-end bg-white/5 animate-in slide-in-from-top-4 duration-300">
            <div className="flex-1 w-full">
              <label className="mono-font text-xs font-bold uppercase block mb-2 opacity-70">Name</label>
              <input type="text" required value={newRecord.name} onChange={e => setNewRecord({...newRecord, name: e.target.value})} className="w-full bg-transparent border-2 border-white/30 p-3 mono-font text-sm focus:border-white focus:outline-none transition-colors" placeholder="Enter Name" />
            </div>
            <div className="flex-1 w-full">
              <label className="mono-font text-xs font-bold uppercase block mb-2 opacity-70">Email</label>
              <input type="email" required value={newRecord.email} onChange={e => setNewRecord({...newRecord, email: e.target.value})} className="w-full bg-transparent border-2 border-white/30 p-3 mono-font text-sm focus:border-white focus:outline-none transition-colors" placeholder="Enter Email" />
            </div>
            <div className="flex-1 w-full">
              <label className="mono-font text-xs font-bold uppercase block mb-2 opacity-70">Phone</label>
              <input type="tel" required value={newRecord.phone} onChange={e => setNewRecord({...newRecord, phone: e.target.value})} className="w-full bg-transparent border-2 border-white/30 p-3 mono-font text-sm focus:border-white focus:outline-none transition-colors" placeholder="Enter Phone" />
            </div>
            <div className="flex-1 w-full">
              <label className="mono-font text-xs font-bold uppercase block mb-2 opacity-70">Year</label>
              <input type="number" required value={newRecord.year} onChange={e => setNewRecord({...newRecord, year: e.target.value})} className="w-full bg-transparent border-2 border-white/30 p-3 mono-font text-sm focus:border-white focus:outline-none transition-colors" placeholder="YYYY" />
            </div>
            <button type="submit" className="bg-white text-black px-6 py-3 border-2 border-white hover:bg-transparent hover:text-white transition-colors mono-font text-sm font-bold uppercase w-full md:w-auto h-[46px] shrink-0">
              Save
            </button>
          </form>
        )}

        <div className="border-4 border-white/30 overflow-x-auto">
          <table className="w-full text-left mono-font text-sm">
            <thead>
              <tr className="border-b-4 border-white/30 bg-white/5">
                <th className="p-4 uppercase font-bold tracking-widest">Name</th>
                <th className="p-4 uppercase font-bold tracking-widest border-l-4 border-white/30">Email</th>
                <th className="p-4 uppercase font-bold tracking-widest border-l-4 border-white/30">Phone</th>
                <th className="p-4 uppercase font-bold tracking-widest border-l-4 border-white/30">Year</th>
                <th className="p-4 uppercase font-bold tracking-widest border-l-4 border-white/30 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center uppercase opacity-50">No records found</td>
                </tr>
              ) : (
                data.map((row, idx) => (
                  <tr key={idx} className="border-b-2 border-white/10 hover:bg-white/5 transition-colors group">
                    <td className="p-4">{row.name}</td>
                    <td className="p-4 border-l-2 border-white/10">{row.email}</td>
                    <td className="p-4 border-l-2 border-white/10">{row.phone || '-'}</td>
                    <td className="p-4 border-l-2 border-white/10">{row.year}</td>
                    <td className="p-4 border-l-2 border-white/10 text-center">
                      <button 
                        onClick={() => handleDelete(idx)}
                        className="text-red-500 hover:text-red-400 opacity-50 group-hover:opacity-100 transition-opacity"
                        aria-label="Delete Record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
