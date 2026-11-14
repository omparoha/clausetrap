/**
 * Formatting and styling helpers for ClauseTrap Consumer Defense Platform
 * Edgy High-Contrast Gen-Z Cyber-Security Theme (Raycast / Linear / Supabase Void Mode)
 */

export function getRiskTierConfig(score) {
  if (score <= 30) {
    return {
      tier: 'VERIFIED CLEAR',
      color: 'mint',
      hex: '#00F5A0',
      bgClass: 'bg-[#00F5A0]/10',
      borderClass: 'border-[#00F5A0]/40',
      textClass: 'text-[#00F5A0]',
      glowClass: 'shadow-[0_0_20px_rgba(0,245,160,0.25)]',
      badgeBg: 'bg-[#00F5A0]/10',
      label: 'Statutory Compliance Verified',
      summary: 'DOM scan confirms clean 1:1 price parity with zero negative-option recurring triggers.'
    };
  }

  if (score <= 65) {
    return {
      tier: 'ELEVATED RISK',
      color: 'amber',
      hex: '#FFB800',
      bgClass: 'bg-[#FFB800]/10',
      borderClass: 'border-[#FFB800]/40',
      textClass: 'text-[#FFB800]',
      glowClass: 'shadow-[0_0_20px_rgba(255,184,0,0.25)]',
      badgeBg: 'bg-[#FFB800]/10',
      label: 'Caution // Friction Detected',
      summary: 'Potential undisclosed fees or minor asymmetry in termination procedures detected.'
    };
  }

  return {
    tier: 'CRITICAL HAZARD',
    color: 'crimson',
    hex: '#FF0055',
    bgClass: 'bg-[#FF0055]/10',
    borderClass: 'border-[#FF0055]/50',
    textClass: 'text-[#FF0055]',
    glowClass: 'shadow-[0_0_25px_rgba(255,0,85,0.3)]',
    badgeBg: 'bg-[#FF0055]/10',
    label: 'Hazard // Predatory Trap',
    summary: 'Egregious negative-option conversion, severe cancellation barriers, or unauthorized mandates identified.'
  };
}

export function getSeverityStyle(severity) {
  const norm = (severity || '').toUpperCase();
  switch (norm) {
    case 'CRITICAL':
      return {
        badge: 'bg-[#FF0055]/15 text-[#FF0055] border-[#FF0055]/40 shadow-[0_0_10px_rgba(255,0,85,0.2)]',
        dot: 'bg-[#FF0055] shadow-[0_0_8px_#FF0055]',
        border: 'border-[#FF0055]/30 hover:border-[#FF0055]/60',
        quoteBorder: 'border-l-2 border-[#FF0055]',
        iconColor: 'text-[#FF0055]',
        cardBg: 'bg-[#10141D]'
      };
    case 'HIGH':
      return {
        badge: 'bg-[#FFB800]/15 text-[#FFB800] border-[#FFB800]/40 shadow-[0_0_10px_rgba(255,184,0,0.2)]',
        dot: 'bg-[#FFB800] shadow-[0_0_8px_#FFB800]',
        border: 'border-[#FFB800]/30 hover:border-[#FFB800]/60',
        quoteBorder: 'border-l-2 border-[#FFB800]',
        iconColor: 'text-[#FFB800]',
        cardBg: 'bg-[#10141D]'
      };
    case 'MEDIUM':
      return {
        badge: 'bg-[#FFB800]/15 text-[#FFB800] border-[#FFB800]/30',
        dot: 'bg-[#FFB800]',
        border: 'border-[#1F2430] hover:border-slate-500',
        quoteBorder: 'border-l-2 border-[#FFB800]/60',
        iconColor: 'text-[#FFB800]',
        cardBg: 'bg-[#0D1117]'
      };
    case 'SAFE':
    case 'LOW':
    default:
      return {
        badge: 'bg-[#00F5A0]/15 text-[#00F5A0] border-[#00F5A0]/40 shadow-[0_0_10px_rgba(0,245,160,0.2)]',
        dot: 'bg-[#00F5A0] shadow-[0_0_8px_#00F5A0]',
        border: 'border-[#00F5A0]/30 hover:border-[#00F5A0]/60',
        quoteBorder: 'border-l-2 border-[#00F5A0]',
        iconColor: 'text-[#00F5A0]',
        cardBg: 'bg-[#0D1117]'
      };
  }
}

export function formatCurrency(amount, currency = '₹') {
  if (amount === undefined || amount === null) return `${currency}0.00`;
  const formatted = Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `${currency}${formatted}`;
}

export function formatScanDate(dateString) {
  if (!dateString) return 'LIVE // RECENT';
  try {
    const d = new Date(dateString);
    return d.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZoneName: 'short'
    });
  } catch {
    return dateString;
  }
}
