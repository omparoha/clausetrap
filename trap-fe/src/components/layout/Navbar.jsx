import React from 'react';
import { ShieldAlert, Scale, FileText, Terminal, Activity } from 'lucide-react';

export default function Navbar({ onOpenRegulations, onOpenMethodology, onScrollToScan }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F2430] bg-[#060709]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Identity */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-md bg-[#10141D] border border-[#1F2430] p-1 shadow-[0_0_15px_rgba(204,255,0,0.15)] group hover:border-[#CCFF00]/50 transition-all">
              <ShieldAlert className="w-5 h-5 text-[#CCFF00] group-hover:scale-105 transition-transform" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black tracking-wider text-[#F8FAFC] font-mono">
                  CLAUSE<span className="text-[#CCFF00] drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]">TRAP</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase text-[#CCFF00] bg-[#CCFF00]/10 border border-[#CCFF00]/30 rounded">
                  DEFENSE
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono hidden md:inline tracking-tight">
                Automated DOM Scanner & Deceptive Pattern Auditor
              </span>
            </div>
          </div>

          {/* Protocol Online Badge */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0D1117] border border-[#1F2430] shadow-[0_0_12px_rgba(0,0,0,0.8)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5A0] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F5A0] shadow-[0_0_8px_#00F5A0]"></span>
            </span>
            <span className="text-[11px] font-mono font-semibold tracking-wider text-slate-300">
              PROTOCOL v2.4 <span className="text-[#00F5A0]">// ONLINE</span>
            </span>
          </div>

          {/* Navigation Controls */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              type="button"
              onClick={onScrollToScan}
              className="px-3 py-1.5 text-xs font-mono font-medium text-slate-300 hover:text-white hover:bg-[#10141D] rounded border border-transparent hover:border-[#1F2430] transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>Scan</span>
            </button>

            <button
              type="button"
              onClick={onOpenRegulations}
              className="px-3 py-1.5 text-xs font-mono font-medium text-slate-300 hover:text-white hover:bg-[#10141D] rounded border border-transparent hover:border-[#1F2430] transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5 text-[#FFB800]" />
              <span className="hidden sm:inline">Regulations</span>
              <span className="sm:hidden">Rules</span>
            </button>

            <button
              type="button"
              onClick={onOpenMethodology}
              className="px-3 py-1.5 text-xs font-mono font-medium text-slate-300 hover:text-white hover:bg-[#10141D] rounded border border-transparent hover:border-[#1F2430] transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span>Engine Specs</span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
}
