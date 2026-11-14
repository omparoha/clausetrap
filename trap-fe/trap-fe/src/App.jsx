import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import AuditDashboardPage from './pages/AuditDashboardPage';
import { mockHighRiskReport } from './data/mockReport';
import { Scale, FileText, X } from 'lucide-react';

export default function App() {
  const [activeReport, setActiveReport] = useState(mockHighRiskReport);
  const [showRegulationsModal, setShowRegulationsModal] = useState(false);
  const [showMethodologyModal, setShowMethodologyModal] = useState(false);

  const scrollToScan = () => {
    const scannerEl = document.getElementById('scanner-section');
    if (scannerEl) {
      scannerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060709] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#CCFF00] selection:text-black">
      
      {/* Top Header */}
      <Navbar
        onOpenRegulations={() => setShowRegulationsModal(true)}
        onOpenMethodology={() => setShowMethodologyModal(true)}
        onScrollToScan={scrollToScan}
      />

      {/* Main Dashboard */}
      <div className="flex-1">
        <AuditDashboardPage
          activeReport={activeReport}
          setActiveReport={setActiveReport}
          onOpenRegulations={() => setShowRegulationsModal(true)}
          onOpenMethodology={() => setShowMethodologyModal(true)}
        />
      </div>

      {/* Global Void Footer */}
      <footer className="border-t border-[#1F2430] bg-[#0D1117] py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded bg-[#10141D] border border-[#1F2430] flex items-center justify-center text-[#CCFF00] font-black text-xs shadow-[0_0_10px_rgba(204,255,0,0.2)]">
              CT
            </div>
            <div>
              <span className="font-bold text-slate-300 tracking-wider">CLAUSETRAP DEFENSE PLATFORM</span>
              <span className="text-[10px] text-slate-500 block font-sans">
                Automated DOM Scanner & Consumer Protection Protocol
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
            <button 
              type="button" 
              onClick={() => setShowRegulationsModal(true)}
              className="hover:text-[#CCFF00] transition cursor-pointer"
            >
              Statutory Rules
            </button>
            <button 
              type="button" 
              onClick={() => setShowMethodologyModal(true)}
              className="hover:text-[#CCFF00] transition cursor-pointer"
            >
              Engine Specs
            </button>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">PROTOCOL v2.4 // PROD</span>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-[#1F2430] text-[10px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
          <p>
            NOTICE: Automated consumer defense verification system. All compliance evaluations generated through deterministic statutory rule matrices and DOM heuristic parsers.
          </p>
          <p className="text-[#CCFF00] shrink-0 font-bold">
            STATUS: SECURE // OPERATIONAL
          </p>
        </div>
      </footer>

      {/* Regulations & Dark Patterns Reference Modal */}
      {showRegulationsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0D1117] border border-[#1F2430] rounded-xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto shadow-2xl relative">
            
            <button
              type="button"
              onClick={() => setShowRegulationsModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded text-slate-400 hover:text-white hover:bg-[#10141D] border border-transparent hover:border-[#1F2430] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2.5 mb-4">
              <Scale className="w-5 h-5 text-[#FFB800]" />
              <h3 className="text-sm sm:text-base font-bold font-mono tracking-wider uppercase text-[#F8FAFC]">
                Statutory Regulations & Dark Pattern Taxonomy
              </h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-5 font-sans">
              ClauseTrap audits checkout workflows against legally binding consumer protection directives, e-commerce disclosure rules, and statutory guidelines for deceptive pattern prevention.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded bg-[#060709] border border-[#1F2430] space-y-1">
                <div className="flex items-center justify-between font-bold text-[#FFB800]">
                  <span>1. Negative Option Billing Prohibition</span>
                  <span className="text-[10px] text-slate-500">RULE 6(5)</span>
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Sellers cannot treat consumer silence or a nominal trial purchase (e.g. ₹1) as acceptance of a recurring monthly subscription without standalone, explicit, and separate authorization.
                </p>
              </div>

              <div className="p-3.5 rounded bg-[#060709] border border-[#1F2430] space-y-1">
                <div className="flex items-center justify-between font-bold text-[#FF0055]">
                  <span>2. Asymmetric Cancellation Friction ("Roach Motel")</span>
                  <span className="text-[10px] text-slate-500">DARK PATTERN GUIDELINE 5(2)</span>
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Cancellation must be at least as easy and immediate as subscription initiation. Requiring physical certified mail, international postal delivery, or artificial multi-day advance notice for a digitally activated subscription is a prohibited deceptive practice.
                </p>
              </div>

              <div className="p-3.5 rounded bg-[#060709] border border-[#1F2430] space-y-1">
                <div className="flex items-center justify-between font-bold text-[#CCFF00]">
                  <span>3. Drip Pricing & Surcharge Concealment</span>
                  <span className="text-[10px] text-slate-500">SECTION 4 RULES</span>
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Disclosing incremental mandatory fees (e.g., administrative fees, processing surcharges) at the final step of checkout that were withheld from initial promotional prices constitutes deceptive drip pricing.
                </p>
              </div>

              <div className="p-3.5 rounded bg-[#060709] border border-[#1F2430] space-y-1">
                <div className="flex items-center justify-between font-bold text-[#00F5A0]">
                  <span>4. Pre-Selected Consent & Forced Bundling</span>
                  <span className="text-[10px] text-slate-500">ANNEXURE 1</span>
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Checkboxes for terms of service that bundle automatic subscription enrollment, recurring maintenance charges, or third-party data sharing cannot be pre-ticked by default.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1F2430] flex justify-end font-mono">
              <button
                type="button"
                onClick={() => setShowRegulationsModal(false)}
                className="px-4 py-2 bg-[#10141D] hover:bg-[#1F2430] border border-[#1F2430] rounded text-xs font-bold text-white transition cursor-pointer"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Methodology Reference Modal */}
      {showMethodologyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0D1117] border border-[#1F2430] rounded-xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto shadow-2xl relative">
            
            <button
              type="button"
              onClick={() => setShowMethodologyModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded text-slate-400 hover:text-white hover:bg-[#10141D] border border-transparent hover:border-[#1F2430] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2.5 mb-4">
              <FileText className="w-5 h-5 text-[#CCFF00]" />
              <h3 className="text-sm sm:text-base font-bold font-mono tracking-wider uppercase text-[#F8FAFC]">
                Audit Engine Heuristic Methodology
              </h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-5 font-sans">
              The ClauseTrap Audit Engine executes automated statutory compliance checks across four synchronized analysis passes without black-box opacity.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded bg-[#060709] border border-[#1F2430] space-y-1">
                <div className="font-bold text-[#CCFF00]">
                  PHASE 01: Full DOM Resolution & Nested Frame Extraction
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Inspects dynamic client-side rendering, hidden shadow DOM nodes, payment gateway iframes, and micro-print legal disclaimer wrappers.
                </p>
              </div>

              <div className="p-3.5 rounded bg-[#060709] border border-[#1F2430] space-y-1">
                <div className="font-bold text-[#00F5A0]">
                  PHASE 02: Contractual Obligation Parser & Citation Extraction
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Extracts verbatim clause strings, identifies binding legal commitments, arbitration clauses, jurisdiction bypasses, and auto-renewal stipulations.
                </p>
              </div>

              <div className="p-3.5 rounded bg-[#060709] border border-[#1F2430] space-y-1">
                <div className="font-bold text-[#FFB800]">
                  PHASE 03: E-Mandate Payment Authorization Matrix
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Analyzes whether the checkout transaction initiates an instantaneous single settlement or silently creates an active standing instruction / recurring e-mandate on the payment token.
                </p>
              </div>

              <div className="p-3.5 rounded bg-[#060709] border border-[#1F2430] space-y-1">
                <div className="font-bold text-[#FF0055]">
                  PHASE 04: Friction Scoring & Regulatory Grade Synthesis
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Computes the asymmetric cancellation ratio, quantifying friction delta between 1-click subscription and burdensome multi-day or offline cancellation requirements.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1F2430] flex justify-end font-mono">
              <button
                type="button"
                onClick={() => setShowMethodologyModal(false)}
                className="px-4 py-2 bg-[#10141D] hover:bg-[#1F2430] border border-[#1F2430] rounded text-xs font-bold text-white transition cursor-pointer"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
