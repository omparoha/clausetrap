import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Layers } from 'lucide-react';
import { getRiskTierConfig } from '../../utils/formatters';

export default function RiskGauge({ score = 0, tier, breakdownMetrics = {} }) {
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));
  const config = getRiskTierConfig(safeScore);

  const radius = 78;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const arcFraction = 220 / 360;
  const arcLength = circumference * arcFraction;
  const dashoffset = arcLength - (safeScore / 100) * arcLength;

  const metricsList = [
    {
      key: 'subscriptionRisk',
      label: 'Subscription Risk',
      value: breakdownMetrics.subscriptionRisk ?? 0
    },
    {
      key: 'cancellationFriction',
      label: 'Cancellation Friction',
      value: breakdownMetrics.cancellationFriction ?? 0
    },
    {
      key: 'hiddenSurcharges',
      label: 'Hidden Surcharges',
      value: breakdownMetrics.hiddenSurcharges ?? 0
    },
    {
      key: 'arbitrationMandates',
      label: 'Arbitration Mandates',
      value: breakdownMetrics.arbitrationMandates ?? 0
    }
  ];

  const getMetricColor = (val) => {
    if (val <= 30) return { bar: 'bg-[#00F5A0]', text: 'text-[#00F5A0]' };
    if (val <= 65) return { bar: 'bg-[#FFB800]', text: 'text-[#FFB800]' };
    return { bar: 'bg-[#FF0055]', text: 'text-[#FF0055]' };
  };

  return (
    <div className="bg-[#0D1117] border border-[#1F2430] rounded-xl p-5 sm:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between h-full relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div 
        className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: config.hex }}
      />

      <div className="flex items-center justify-between border-b border-[#1F2430] pb-3 mb-4 font-mono">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-[#CCFF00]" />
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F8FAFC]">
            Risk Analysis Gauge
          </h3>
        </div>
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
          INDEX 0 – 100
        </span>
      </div>

      {/* Gauge and Score Display */}
      <div className="flex flex-col items-center justify-center my-2">
        <div className="relative w-52 h-44 flex items-center justify-center">
          
          <svg className="w-52 h-52 -rotate-[200deg] overflow-visible" viewBox="0 0 200 200">
            {/* Background Track */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke="#060709"
              strokeWidth={strokeWidth}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeLinecap="round"
            />
            {/* Subtle Ticks */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke="#1F2430"
              strokeWidth={strokeWidth}
              strokeDasharray={`2 8`}
              opacity="0.6"
            />
            {/* Dynamic Value Arc */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke={config.hex}
              strokeWidth={strokeWidth}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeDashoffset={dashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                filter: `drop-shadow(0 0 10px ${config.hex}80)`
              }}
            />
          </svg>

          {/* Central Meter Readings */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            <span className="text-4xl sm:text-5xl font-black tracking-tight text-[#F8FAFC] font-mono">
              {safeScore}
            </span>
            <span className="text-[9px] tracking-widest uppercase font-mono text-slate-500 mt-0.5">
              COMPOSITE HAZARD
            </span>
          </div>
        </div>

        {/* Dynamic Risk Classification Badge */}
        <div className="mt-1">
          <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border ${config.badgeBg} ${config.borderClass} ${config.glowClass} transition-all duration-500`}>
            {safeScore >= 66 ? (
              <ShieldAlert className="w-3.5 h-3.5 text-[#FF0055] shrink-0" />
            ) : safeScore >= 31 ? (
              <AlertTriangle className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-[#00F5A0] shrink-0" />
            )}
            <span className={`text-[11px] font-bold tracking-wider font-mono uppercase ${config.textClass}`}>
              {tier || config.tier}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center mt-2.5 max-w-xs font-sans">
          {config.summary}
        </p>
      </div>

      {/* Breakdown Metrics Grid */}
      <div className="mt-6 pt-4 border-t border-[#1F2430] space-y-3 font-mono">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 flex items-center justify-between">
          <span>Component Breakdown</span>
          <span>Index</span>
        </div>

        <div className="space-y-2.5">
          {metricsList.map((metric) => {
            const color = getMetricColor(metric.value);
            return (
              <div key={metric.key} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-sans">{metric.label}</span>
                  <span className={`font-mono font-bold ${color.text}`}>
                    {metric.value}/100
                  </span>
                </div>
                
                <div className="w-full bg-[#060709] rounded-full h-1.5 overflow-hidden border border-[#1F2430]">
                  <div
                    className={`h-full rounded-full ${color.bar} transition-all duration-700 ease-out`}
                    style={{ width: `${Math.min(100, Math.max(0, metric.value))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
