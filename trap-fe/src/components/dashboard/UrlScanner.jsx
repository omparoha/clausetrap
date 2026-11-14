import React, { useState, useEffect } from 'react';
import { 
  Clipboard, 
  ArrowRight, 
  ShieldAlert, 
  ShieldCheck, 
  AlertCircle, 
  RefreshCw, 
  CheckCircle2, 
  Terminal,
  Globe,
  Radio
} from 'lucide-react';

const SCAN_STAGES = [
  { step: 1, text: "Resolving DOM and nested frames...", detail: "Unpacking iframe checkouts & dynamic shadow DOM trees" },
  { step: 2, text: "Extracting Terms of Service and Checkout copy...", detail: "Parsing hidden disclosures, footnote spans & modal text" },
  { step: 3, text: "Evaluating auto-renewal obligations...", detail: "Matching against negative-option billing heuristics & e-mandate directives" },
  { step: 4, text: "Generating Audit Report", detail: "Synthesizing statutory risk tier & asymmetric friction score" }
];

export default function UrlScanner({ onScanSubmit, isScanning, onPresetSelect, currentUrl }) {
  const [url, setUrl] = useState(currentUrl || '');
  const [validationError, setValidationError] = useState('');
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [clipboardFeedback, setClipboardFeedback] = useState(false);

  useEffect(() => {
    if (currentUrl) {
      setUrl(currentUrl);
    }
  }, [currentUrl]);

  useEffect(() => {
    if (!isScanning) {
      setActiveStepIndex(0);
      setProgress(0);
      return;
    }

    const totalDuration = 2200;
    const stepDuration = totalDuration / 4;

    const timer1 = setTimeout(() => {
      setActiveStepIndex(0);
      setProgress(25);
    }, 50);

    const timer2 = setTimeout(() => {
      setActiveStepIndex(1);
      setProgress(50);
    }, stepDuration);

    const timer3 = setTimeout(() => {
      setActiveStepIndex(2);
      setProgress(78);
    }, stepDuration * 2);

    const timer4 = setTimeout(() => {
      setActiveStepIndex(3);
      setProgress(98);
    }, stepDuration * 3);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isScanning]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setValidationError('');
        setClipboardFeedback(true);
        setTimeout(() => setClipboardFeedback(false), 1500);
      }
    } catch {
      setValidationError('Direct clipboard access blocked by browser. Please paste URL directly into the input field.');
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!url.trim()) {
      setValidationError('Target URL required for deep DOM compliance analysis.');
      return;
    }

    if (!url.includes('.') || url.length < 5) {
      setValidationError('Invalid target domain format (e.g., checkout.domain.com/pay).');
      return;
    }

    setValidationError('');
    let formattedUrl = url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
      setUrl(formattedUrl);
    }

    onScanSubmit(formattedUrl);
  };

  return (
    <div id="scanner-section" className="w-full bg-[#0D1117] border border-[#1F2430] rounded-xl p-4 sm:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.8)] relative overflow-hidden">
      
      {/* Background Volt Ambient Glow */}
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-[#CCFF00]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 rounded-full bg-[#CCFF00] shadow-[0_0_8px_#CCFF00]" />
            <h2 className="text-sm sm:text-base font-bold font-mono tracking-wider text-[#F8FAFC] uppercase">
              Automated DOM Scanner // Target Ingestion
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Inspect checkout flows and subscription pages to unmask hidden auto-debit triggers, drip fees, and asymmetric friction.
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-[11px] text-slate-500 font-mono tracking-wider uppercase">Presets:</span>
          <button
            type="button"
            disabled={isScanning}
            onClick={() => onPresetSelect('trap')}
            className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-mono font-bold rounded bg-[#FF0055]/10 text-[#FF0055] border border-[#FF0055]/40 hover:bg-[#FF0055]/20 hover:shadow-[0_0_12px_rgba(255,0,85,0.3)] transition disabled:opacity-40 cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#FF0055]" />
            <span>₹1 Trap Offer</span>
          </button>

          <button
            type="button"
            disabled={isScanning}
            onClick={() => onPresetSelect('safe')}
            className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-mono font-bold rounded bg-[#00F5A0]/10 text-[#00F5A0] border border-[#00F5A0]/40 hover:bg-[#00F5A0]/20 hover:shadow-[0_0_12px_rgba(0,245,160,0.3)] transition disabled:opacity-40 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#00F5A0]" />
            <span>Clear Store</span>
          </button>
        </div>
      </div>

      {/* Input Form with High-Contrast Hairline Border & Volt Action Button */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative flex items-center">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-500">
            <Globe className="w-4 h-4 text-[#CCFF00]" />
          </div>

          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (validationError) setValidationError('');
            }}
            disabled={isScanning}
            placeholder="target checkout or subscription url (e.g., https://store.io/checkout)..."
            className="w-full pl-10 pr-28 sm:pr-48 py-3 bg-[#040507] border border-[#1F2430] rounded-lg text-xs sm:text-sm text-[#F8FAFC] placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#CCFF00] focus:border-[#CCFF00] transition-all font-mono shadow-inner"
          />

          <div className="absolute right-1.5 flex items-center space-x-1.5">
            <button
              type="button"
              onClick={handlePaste}
              disabled={isScanning}
              className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-mono font-medium text-slate-400 bg-[#10141D] hover:bg-[#1F2430] hover:text-white border border-[#1F2430] rounded transition disabled:opacity-40 cursor-pointer"
              title="Paste from clipboard"
            >
              <Clipboard className="w-3 h-3 text-slate-400" />
              <span>{clipboardFeedback ? 'PASTED' : 'PASTE'}</span>
            </button>

            {/* Standout Action Button: Solid Volt #CCFF00, Black Text, Monospace, Hover Glow */}
            <button
              type="submit"
              disabled={isScanning}
              className="inline-flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 text-xs font-mono font-black tracking-wider uppercase text-black bg-[#CCFF00] hover:bg-[#B8E600] rounded shadow-[0_0_20px_rgba(204,255,0,0.25)] hover:shadow-[0_0_25px_rgba(204,255,0,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                  <span className="hidden sm:inline">PARSING...</span>
                </>
              ) : (
                <>
                  <span>AUDIT</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </>
              )}
            </button>
          </div>
        </div>

        {validationError && (
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FF0055] bg-[#FF0055]/10 border border-[#FF0055]/40 px-3 py-1.5 rounded-md">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}
      </form>

      {/* Live Terminal-Style Scanning Progress Indicator with Glowing Pulsing Pip */}
      {isScanning && (
        <div className="mt-4 pt-4 border-t border-[#1F2430] space-y-3 transition-all animate-fadeIn">
          
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CCFF00] shadow-[0_0_8px_#CCFF00]"></span>
              </span>
              <span className="font-bold text-[#CCFF00] tracking-wider uppercase flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>Heuristic Parser Active</span>
              </span>
            </div>
            <span className="text-[#CCFF00] font-mono font-bold">{progress}%</span>
          </div>

          {/* Micro Progress Bar */}
          <div className="w-full bg-[#040507] rounded-full h-1.5 overflow-hidden border border-[#1F2430]">
            <div 
              className="bg-gradient-to-r from-[#CCFF00] via-[#00F5A0] to-[#CCFF00] h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(204,255,0,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Terminal Stepper Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 font-mono">
            {SCAN_STAGES.map((stage, idx) => {
              const isDone = activeStepIndex > idx;
              const isCurrent = activeStepIndex === idx;

              return (
                <div
                  key={stage.step}
                  className={`p-2.5 rounded border text-xs transition-all ${
                    isCurrent
                      ? 'bg-[#10141D] border-[#CCFF00]/70 text-[#F8FAFC] shadow-[0_0_15px_rgba(204,255,0,0.15)]'
                      : isDone
                      ? 'bg-[#0D1117] border-[#00F5A0]/40 text-slate-300'
                      : 'bg-[#040507]/60 border-[#1F2430] text-slate-600'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 mb-1 text-[11px]">
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00F5A0] shrink-0" />
                    ) : isCurrent ? (
                      <Radio className="w-3.5 h-3.5 text-[#CCFF00] animate-pulse shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded border border-slate-700 flex items-center justify-center text-[9px] text-slate-600">
                        {stage.step}
                      </span>
                    )}
                    <span className="tracking-wider">PHASE 0{stage.step}</span>
                  </div>
                  <div className={`font-semibold line-clamp-1 ${isCurrent ? 'text-[#CCFF00]' : ''}`}>
                    {stage.text}
                  </div>
                  <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {stage.detail}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
