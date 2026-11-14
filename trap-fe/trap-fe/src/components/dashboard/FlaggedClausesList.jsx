import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Scale, 
  BookOpen, 
  Filter,
  FileCode,
  Terminal
} from 'lucide-react';
import { getSeverityStyle } from '../../utils/formatters';

export default function FlaggedClausesList({ clauses = [] }) {
  const [expandedIds, setExpandedIds] = useState(() => {
    const initial = {};
    clauses.forEach((c, idx) => {
      initial[c.id] = idx < 2;
    });
    return initial;
  });

  const [copiedId, setCopiedId] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');

  const toggleExpand = (id) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all = {};
    clauses.forEach(c => { all[c.id] = true; });
    setExpandedIds(all);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const handleCopyCitation = (clause) => {
    const citationText = `[ClauseTrap Audit Citation - ${clause.id}]\nCategory: ${clause.category}\nSeverity: ${clause.severity}\nStatutory Reference: ${clause.statutoryReference || 'N/A'}\n\nVerbatim Contractual Extract:\n"${clause.verbatimQuote}"\n\nRegulatory Analysis:\n${clause.analysis}`;
    
    navigator.clipboard.writeText(citationText);
    setCopiedId(clause.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const filteredClauses = clauses.filter(c => {
    if (selectedSeverity === 'ALL') return true;
    return (c.severity || '').toUpperCase() === selectedSeverity;
  });

  return (
    <div className="bg-[#0D1117] border border-[#1F2430] rounded-xl p-5 sm:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.8)] space-y-5">
      
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F2430] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-[#CCFF00]" />
            <h3 className="text-sm sm:text-base font-bold font-mono tracking-wider text-[#F8FAFC] uppercase">
              Flagged Contractual Clauses & Deceptive Terms
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#10141D] text-[#CCFF00] border border-[#CCFF00]/30">
              {clauses.length} Citations
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Exact contractual extracts retrieved from checkout DOM, terms of sale, and auto-debit authorizations with statutory compliance analysis.
          </p>
        </div>

        {/* Global Expand / Collapse */}
        <div className="flex items-center space-x-2 self-start sm:self-auto font-mono text-xs">
          <button
            type="button"
            onClick={expandAll}
            className="px-2.5 py-1 text-slate-400 hover:text-white bg-[#10141D] hover:bg-[#1F2430] border border-[#1F2430] rounded transition cursor-pointer"
          >
            EXPAND ALL
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-2.5 py-1 text-slate-400 hover:text-white bg-[#10141D] hover:bg-[#1F2430] border border-[#1F2430] rounded transition cursor-pointer"
          >
            COLLAPSE ALL
          </button>
        </div>
      </div>

      {/* Filter Tabs by Severity */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-mono">
        <span className="text-slate-500 flex items-center space-x-1 shrink-0 mr-1 uppercase text-[11px] tracking-wider">
          <Filter className="w-3.5 h-3.5 text-[#CCFF00]" />
          <span>Filter:</span>
        </span>

        {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'SAFE'].map((sev) => {
          const count = sev === 'ALL' 
            ? clauses.length 
            : clauses.filter(c => (c.severity || '').toUpperCase() === sev).length;
          
          if (sev !== 'ALL' && count === 0) return null;

          const isSelected = selectedSeverity === sev;
          return (
            <button
              key={sev}
              type="button"
              onClick={() => setSelectedSeverity(sev)}
              className={`px-3 py-1 rounded transition font-bold cursor-pointer uppercase tracking-wider text-[11px] ${
                isSelected
                  ? 'bg-[#CCFF00] text-black shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                  : 'bg-[#10141D] text-slate-400 hover:text-white border border-[#1F2430]'
              }`}
            >
              {sev} [{count}]
            </button>
          );
        })}
      </div>

      {/* Accordion Cards */}
      <div className="space-y-3">
        {filteredClauses.map((clause) => {
          const isExpanded = !!expandedIds[clause.id];
          const isCopied = copiedId === clause.id;
          const style = getSeverityStyle(clause.severity);

          return (
            <div
              key={clause.id}
              className={`border rounded-lg transition-all duration-200 overflow-hidden ${
                isExpanded 
                  ? 'bg-[#10141D] border-[#1F2430]' 
                  : 'bg-[#0D1117] border-[#1F2430] hover:border-slate-600'
              }`}
            >
              {/* Card Header Bar */}
              <div
                onClick={() => toggleExpand(clause.id)}
                className="p-3 sm:p-4 flex items-center justify-between cursor-pointer select-none gap-3"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <span className={`w-2 h-2 rounded-full ${style.dot} shrink-0`} />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2.5 truncate font-mono">
                    <span className="text-xs font-bold text-slate-500 shrink-0">
                      [{clause.id}]
                    </span>
                    <span className="font-semibold text-xs sm:text-sm text-[#F8FAFC] truncate font-sans">
                      {clause.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 shrink-0 font-mono">
                  {/* Severity Badge */}
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-black uppercase tracking-wider border ${style.badge}`}>
                    {clause.severity}
                  </span>

                  <button
                    type="button"
                    className="p-1 text-slate-500 hover:text-white transition"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#CCFF00]" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Content Area */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-3.5 border-t border-[#1F2430] animate-fadeIn">
                  
                  {/* Verbatim Quote: Pitch-black background (#060709) with Left Accent Border */}
                  <div className="space-y-1.5 font-mono">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center space-x-1.5 uppercase text-[10px] tracking-wider text-slate-500 font-bold">
                        <FileCode className="w-3.5 h-3.5 text-[#CCFF00]" />
                        <span>Verbatim Contractual Extract:</span>
                      </span>
                      
                      {/* Copy Citation Button with Feedback */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyCitation(clause);
                        }}
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 text-[11px] font-mono font-bold rounded transition cursor-pointer border ${
                          isCopied 
                            ? 'bg-[#00F5A0]/20 text-[#00F5A0] border-[#00F5A0]/50 shadow-[0_0_10px_rgba(0,245,160,0.3)]' 
                            : 'bg-[#060709] hover:bg-[#1F2430] text-slate-300 hover:text-[#CCFF00] border-[#1F2430]'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-[#00F5A0]" />
                            <span>COPIED TO CLIPBOARD</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>COPY CITATION</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Monospaced Pitch-Black Highlight Box with Left Border Accent */}
                    <div className={`p-3.5 rounded bg-[#060709] border border-[#1F2430] ${style.quoteBorder} shadow-inner relative`}>
                      <p className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed pl-1 pr-1">
                        "{clause.verbatimQuote}"
                      </p>
                    </div>
                  </div>

                  {/* Regulatory Analysis & Statutory Reference */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    
                    {/* Analysis */}
                    <div className="md:col-span-2 space-y-1 bg-[#060709] border border-[#1F2430] rounded p-3">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#CCFF00] font-bold flex items-center space-x-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Automated Compliance Finding</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">
                        {clause.analysis}
                      </p>
                    </div>

                    {/* Statutory Authority */}
                    <div className="space-y-1 bg-[#060709] border border-[#1F2430] rounded p-3 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#FFB800] font-bold flex items-center space-x-1">
                          <Scale className="w-3.5 h-3.5" />
                          <span>Statutory Benchmark</span>
                        </div>
                        <p className="text-xs text-slate-300 font-mono mt-1 leading-snug">
                          {clause.statutoryReference || 'Consumer Protection Directives'}
                        </p>
                      </div>

                      <div className="mt-2 text-[10px] text-slate-600 font-mono tracking-tight">
                        Rule Benchmark // Verified
                      </div>
                    </div>

                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
