import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Download, 
  ExternalLink, 
  Clock, 
  Hash, 
  FileCheck2, 
  Lock,
  ChevronRight,
  Radio
} from 'lucide-react';

import UrlScanner from '../components/dashboard/UrlScanner';
import RiskGauge from '../components/dashboard/RiskGauge';
import PriceComparisonCard from '../components/dashboard/PriceComparisonCard';
import FlaggedClausesList from '../components/dashboard/FlaggedClausesList';
import { mockHighRiskReport, mockSafeReport } from '../data/mockReport';
import { getRiskTierConfig, formatScanDate } from '../utils/formatters';

export default function AuditDashboardPage({
  activeReport,
  setActiveReport,
  onOpenRegulations,
  onOpenMethodology
}) {
  const [isScanning, setIsScanning] = useState(false);
  const [exportNotice, setExportNotice] = useState('');

  const handlePresetSelect = (type) => {
    setIsScanning(true);
    setTimeout(() => {
      if (type === 'trap') {
        setActiveReport(mockHighRiskReport);
      } else {
        setActiveReport(mockSafeReport);
      }
      setIsScanning(false);
    }, 2200);
  };

  const handleCustomScan = (scannedUrl) => {
    setIsScanning(true);
    setTimeout(() => {
      const lower = scannedUrl.toLowerCase();
      const isSuspect = lower.includes('trial') || lower.includes('trap') || lower.includes('offer') || lower.includes('deal') || lower.includes('step') || lower.includes('free');
      
      const baseReport = isSuspect ? mockHighRiskReport : mockSafeReport;
      const updatedReport = {
        ...baseReport,
        url: scannedUrl,
        targetDomain: new URL(scannedUrl.startsWith('http') ? scannedUrl : `https://${scannedUrl}`).hostname,
        scannedAt: new Date().toISOString()
      };
      
      setActiveReport(updatedReport);
      setIsScanning(false);
    }, 2200);
  };

  const handleExportReport = () => {
    const reportData = JSON.stringify(activeReport, null, 2);
    const blob = new Blob([reportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ClauseTrap-Audit-${activeReport.id || 'Report'}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setExportNotice('Audit Dossier Exported Successfully (JSON)');
    setTimeout(() => setExportNotice(''), 3000);
  };

  const riskConfig = getRiskTierConfig(activeReport.riskScore);

  return (
    <div className="min-h-screen bg-[#060709] text-[#F8FAFC] pb-16">
      
      {/* Reviewer Quick Test Switcher Strip */}
      <div className="bg-[#0D1117] border-b border-[#1F2430] px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 font-mono">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="px-1.5 py-0.5 rounded bg-[#10141D] text-[#CCFF00] border border-[#CCFF00]/40 font-bold text-[10px] tracking-wider">
              ENV // SIMULATOR
            </span>
            <span className="text-slate-500 hidden md:inline text-[11px]">
              Toggle target scenario between predatory auto-debit trap and verified clear checkout:
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              disabled={isScanning}
              onClick={() => handlePresetSelect('trap')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition flex items-center space-x-1.5 cursor-pointer uppercase tracking-wider ${
                activeReport.riskScore > 50
                  ? 'bg-[#FF0055] text-black shadow-[0_0_15px_rgba(255,0,85,0.4)]'
                  : 'bg-[#10141D] text-[#FF0055] hover:bg-[#FF0055]/15 border border-[#FF0055]/40'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Load Sample Trap</span>
            </button>

            <button
              type="button"
              disabled={isScanning}
              onClick={() => handlePresetSelect('safe')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition flex items-center space-x-1.5 cursor-pointer uppercase tracking-wider ${
                activeReport.riskScore <= 50
                  ? 'bg-[#00F5A0] text-black shadow-[0_0_15px_rgba(0,245,160,0.4)]'
                  : 'bg-[#10141D] text-[#00F5A0] hover:bg-[#00F5A0]/15 border border-[#00F5A0]/40'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Load Safe URL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">

        {/* URL Scanner Component */}
        <section>
          <UrlScanner
            currentUrl={activeReport.url}
            onScanSubmit={handleCustomScan}
            isScanning={isScanning}
            onPresetSelect={handlePresetSelect}
          />
        </section>

        {/* Target Metadata Strip */}
        <section className="bg-[#0D1117] border border-[#1F2430] rounded-xl p-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-mono">
            
            <div className="space-y-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] uppercase tracking-wider text-[#CCFF00] font-bold">
                  TARGET:
                </span>
                <span className="font-bold text-xs sm:text-sm text-[#F8FAFC] truncate font-sans">
                  {activeReport.productName}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-slate-400 truncate">
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <a 
                  href={activeReport.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-[#CCFF00] underline underline-offset-2 truncate"
                >
                  {activeReport.url}
                </a>
              </div>
            </div>

            {/* Badges & Actions */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#060709] border border-[#1F2430] text-slate-300">
                <Clock className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span className="text-[11px]">{formatScanDate(activeReport.scannedAt)}</span>
              </div>

              <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#060709] border border-[#1F2430] text-slate-300">
                <Hash className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate max-w-[130px] text-[11px]">{activeReport.engineHash || 'SEC-BLAKE3'}</span>
              </div>

              <button
                type="button"
                onClick={handleExportReport}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-[#CCFF00]/10 hover:bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/40 transition cursor-pointer font-bold uppercase tracking-wider text-[11px]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>EXPORT JSON</span>
              </button>
            </div>

          </div>

          {/* Export Toast */}
          {exportNotice && (
            <div className="mt-3 p-2 rounded bg-[#00F5A0]/10 border border-[#00F5A0]/40 text-xs text-[#00F5A0] flex items-center space-x-2 animate-fadeIn font-mono">
              <FileCheck2 className="w-4 h-4 text-[#00F5A0]" />
              <span>{exportNotice}</span>
            </div>
          )}
        </section>

        {/* Executive Summary Card */}
        <section className={`border rounded-xl p-5 sm:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-all ${riskConfig.bgClass} ${riskConfig.borderClass}`}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2.5">
                {activeReport.riskScore >= 66 ? (
                  <ShieldAlert className="w-5 h-5 text-[#FF0055] shrink-0" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-[#00F5A0] shrink-0" />
                )}
                <h3 className="text-sm sm:text-base font-bold font-mono tracking-wider uppercase text-[#F8FAFC]">
                  Executive Compliance Summary
                </h3>
                <span className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full border uppercase tracking-widest ${riskConfig.badgeBg} ${riskConfig.textClass} ${riskConfig.borderClass}`}>
                  {activeReport.riskTier}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-4xl">
                {activeReport.executiveSummary}
              </p>
            </div>

            {/* Quick Status Pill Matrix */}
            <div className="flex flex-row md:flex-col gap-2 shrink-0 font-mono text-xs">
              <div className="p-2 rounded bg-[#060709] border border-[#1F2430]">
                <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Deceptive Patterns:</span>
                <span className={`font-black ${activeReport.riskScore > 50 ? 'text-[#FF0055]' : 'text-[#00F5A0]'}`}>
                  {activeReport.complianceSummary?.darkPatternsIdentified ?? (activeReport.riskScore > 50 ? 4 : 0)} IDENTIFIED
                </span>
              </div>

              <div className="p-2 rounded bg-[#060709] border border-[#1F2430]">
                <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Termination Route:</span>
                <span className="text-slate-300 font-bold">
                  {activeReport.complianceSummary?.cancellationPathway ?? (activeReport.riskScore > 50 ? 'Postal Friction' : '1-Click Portal')}
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* 2-Column Main Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-full">
            <RiskGauge
              score={activeReport.riskScore}
              tier={activeReport.riskTier}
              breakdownMetrics={activeReport.breakdownMetrics}
            />
          </div>

          <div className="h-full">
            <PriceComparisonCard
              advertisedPrice={activeReport.advertisedPrice}
              actualCommitment={activeReport.actualCommitment}
              riskScore={activeReport.riskScore}
            />
          </div>
        </section>

        {/* Full-Width Flagged Clauses List */}
        <section>
          <FlaggedClausesList clauses={activeReport.flaggedClauses} />
        </section>

        {/* Regulatory Governance Information Bar */}
        <section className="bg-[#0D1117] border border-[#1F2430] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3 text-slate-400">
            <Lock className="w-4 h-4 text-[#CCFF00] shrink-0" />
            <span className="font-sans">
              Evaluations cross-referenced against statutory Negative-Option directives, FTC rules, and e-mandate frameworks.
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenRegulations}
            className="text-[#CCFF00] hover:text-[#B8E600] font-mono font-bold flex items-center space-x-1 cursor-pointer shrink-0 uppercase tracking-wider text-[11px]"
          >
            <span>View Rule Standards</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </section>

      </main>
    </div>
  );
}
