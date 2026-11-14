import React from 'react';
import { 
  AlertOctagon, 
  CheckCircle, 
  CreditCard, 
  Repeat, 
  DollarSign,
  Info
} from 'lucide-react';

export default function PriceComparisonCard({ advertisedPrice = {}, actualCommitment = {}, riskScore = 0 }) {
  const isTrap = (riskScore >= 50) || (actualCommitment.amount > advertisedPrice.amount);
  const multiplierText = actualCommitment.multiplier || 
    (advertisedPrice.amount > 0 
      ? `${(actualCommitment.amount / advertisedPrice.amount).toFixed(0)}x Commitment` 
      : 'Unquantified Delta');

  return (
    <div className="bg-[#0D1117] border border-[#1F2430] rounded-xl p-5 sm:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between h-full relative overflow-hidden">
      
      {/* Background Neon Hazard Glow for Traps */}
      {isTrap && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF0055]/10 rounded-full blur-3xl pointer-events-none" />
      )}

      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-[#1F2430] pb-3 mb-5 font-mono">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-[#CCFF00]" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F8FAFC]">
              Financial Commitment Audit
            </h3>
          </div>
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
            isTrap 
              ? 'bg-[#FF0055]/10 text-[#FF0055] border-[#FF0055]/40 shadow-[0_0_10px_rgba(255,0,85,0.2)]' 
              : 'bg-[#00F5A0]/10 text-[#00F5A0] border-[#00F5A0]/40 shadow-[0_0_10px_rgba(0,245,160,0.2)]'
          }`}>
            {isTrap ? 'Deceptive Delta Detected' : 'Parity Confirmed (1:1)'}
          </span>
        </div>

        {/* Multiplier Callout Banner */}
        {isTrap ? (
          <div className="mb-5 p-3 rounded bg-[#10141D] border border-[#FF0055]/40 flex items-center justify-between shadow-[0_0_15px_rgba(255,0,85,0.15)]">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded bg-[#FF0055]/15 border border-[#FF0055]/50 flex items-center justify-center text-[#FF0055] shrink-0 shadow-[0_0_8px_#FF0055]">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-[#FF0055] uppercase tracking-wide">
                  Concealed Financial Liability
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {actualCommitment.deceptiveDelta || 'Unstated recurring auto-debit exposure'}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 text-xs font-mono font-black text-black bg-[#FF0055] rounded shadow-[0_0_15px_rgba(255,0,85,0.5)] tracking-wider">
                {multiplierText}
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-5 p-3 rounded bg-[#10141D] border border-[#00F5A0]/40 flex items-center justify-between shadow-[0_0_15px_rgba(0,245,160,0.15)]">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded bg-[#00F5A0]/15 border border-[#00F5A0]/50 flex items-center justify-center text-[#00F5A0] shrink-0 shadow-[0_0_8px_#00F5A0]">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-[#00F5A0] uppercase tracking-wide">
                  Clean Price Parity
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Advertised price matches true binding total
                </div>
              </div>
            </div>
            <span className="px-2.5 py-1 text-xs font-mono font-black text-black bg-[#00F5A0] shadow-[0_0_12px_rgba(0,245,160,0.4)] rounded tracking-wider">
              1.0x PARITY
            </span>
          </div>
        )}

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Stated Checkout Price Card */}
          <div className="bg-[#060709] border border-[#1F2430] rounded-lg p-4 flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-1.5 font-mono">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Advertised Presentation
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#10141D] text-slate-400 border border-[#1F2430]">
                  SURFACE
                </span>
              </div>
              
              <div className="text-2xl sm:text-3xl font-black text-[#F8FAFC] font-mono tracking-tight my-1">
                {advertisedPrice.display || '₹0.00'}
              </div>
              
              <p className="text-xs text-slate-400 font-sans mt-1">
                {advertisedPrice.frequency || 'Stated one-time checkout charge'}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1F2430] flex items-center space-x-1.5 text-[11px] font-mono text-slate-500">
              <CreditCard className="w-3.5 h-3.5 text-slate-600" />
              <span className="truncate">{advertisedPrice.billingType || 'Initial capture appearance'}</span>
            </div>
          </div>

          {/* Actual Binding Obligation Card: High Risk Features Glowing #FF0055 Border and Neon Crimson Price */}
          <div className={`rounded-lg p-4 flex flex-col justify-between relative border ${
            isTrap 
              ? 'bg-[#10141D] border-[#FF0055] shadow-[0_0_20px_rgba(255,0,85,0.25)]' 
              : 'bg-[#060709] border-[#00F5A0]/40 shadow-[0_0_15px_rgba(0,245,160,0.15)]'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-1.5 font-mono">
                <span className={`text-[10px] uppercase tracking-wider font-bold ${
                  isTrap ? 'text-[#FF0055]' : 'text-[#00F5A0]'
                }`}>
                  Actual Binding Obligation
                </span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider ${
                  isTrap 
                    ? 'bg-[#FF0055]/20 text-[#FF0055] border border-[#FF0055]/50' 
                    : 'bg-[#00F5A0]/20 text-[#00F5A0] border border-[#00F5A0]/50'
                }`}>
                  {isTrap ? 'MANDATE' : 'VERIFIED'}
                </span>
              </div>

              {/* Price Typography: Neon Crimson for Traps */}
              <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight my-1 ${
                isTrap ? 'text-[#FF0055] drop-shadow-[0_0_12px_rgba(255,0,85,0.5)]' : 'text-[#00F5A0]'
              }`}>
                {actualCommitment.display || '₹0.00'}
              </div>

              <p className={`text-xs font-sans mt-1 ${isTrap ? 'text-slate-300' : 'text-slate-400'}`}>
                {actualCommitment.frequency || 'Contractual schedule'}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1F2430] space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Annualized Exposure:</span>
                <span className={`font-black ${isTrap ? 'text-[#FF0055]' : 'text-slate-200'}`}>
                  {actualCommitment.annualizedDisplay || '—'}
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 truncate">
                <Repeat className={`w-3.5 h-3.5 ${isTrap ? 'text-[#FF0055]' : 'text-[#CCFF00]'}`} />
                <span className="truncate">{actualCommitment.authorizationType || 'Direct single payment'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Compliance Advisory Note */}
      <div className="mt-4 p-2.5 rounded bg-[#060709] border border-[#1F2430] text-[11px] text-slate-400 flex items-start space-x-2 font-mono">
        <Info className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" />
        <span className="font-sans leading-normal">
          {isTrap 
            ? 'Statutory non-compliance: Advertised checkout charge conceals an automated recurring e-mandate liability buried in secondary terms.'
            : 'Statutory compliance: Stated price reflects the true binding total with zero undisclosed recurring charges.'
          }
        </span>
      </div>

    </div>
  );
}
