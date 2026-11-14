/**
 * ClauseTrap Audit Engine Mock Data
 * Consumer Defense Compliance Reports
 * 
 * Complies with strict statutory audit heuristics:
 * - Negative-Option Recurring Billing Evaluation
 * - Dark Pattern & Cancellation Friction Matrix
 * - Drip Pricing & Surcharge Detection
 * - Statutory Jurisdiction & Arbitration Preemption
 */

export const mockHighRiskReport = {
  id: "AUDIT-2026-TRAP-9810",
  productName: "FitPulse Pro Active Health Tracker (Introductory Trial)",
  url: "https://checkout.fitpulse-offer.net/secure-order/step-2",
  scannedAt: "2026-10-24T16:38:42Z",
  targetDomain: "checkout.fitpulse-offer.net",
  protocolVersion: "Consumer Protection Protocol v2.4",
  engineHash: "SEC-BLAKE3:9e4b78a2f1c84d720b001a4e5f98",
  scanDurationMs: 1420,
  
  // Stated vs Actual Pricing Contrast
  advertisedPrice: {
    amount: 1.00,
    currency: "₹",
    display: "₹1.00",
    label: "Stated Checkout Price",
    frequency: "Advertised 3-Day Introductory Shipping",
    billingType: "Apparent One-Time Nominal Fee"
  },
  actualCommitment: {
    amount: 1499.00,
    currency: "₹",
    display: "₹1,499.00 / Month",
    label: "Actual Binding Obligation",
    frequency: "Continuous Monthly Auto-Debit (e-Mandate)",
    annualizedAmount: 17988.00,
    annualizedDisplay: "₹17,988.00 / Year",
    multiplier: "1,499x Hidden Commitment",
    authorizationType: "Recurring Auto-Debit Mandate Authorization",
    deceptiveDelta: "₹17,987.00 Unstated First-Year Exposure"
  },

  // Primary Risk Classification
  riskScore: 94,
  riskTier: "CRITICAL HAZARD",
  
  // Executive Overview for Compliance Reviewers
  executiveSummary: 
    "Critical regulatory non-compliance detected. The checkout interface presents an advertised promotional trial of ₹1.00 while concealing a mandatory recurring membership subscription of ₹1,499.00 per month, charged automatically after a 72-hour introductory window. Cancellation requires physical certified postal notice to an offshore PO Box with a 14-day pre-billing advance notice requirement, creating intentional asymmetric cancellation friction designed to prevent timely termination. Multiple violations of Consumer Protection (E-Commerce) Rules and statutory negative-option billing frameworks identified.",

  // Breakdown Metrics (0 - 100 Scale)
  breakdownMetrics: {
    subscriptionRisk: 98,
    cancellationFriction: 95,
    hiddenSurcharges: 88,
    arbitrationMandates: 92
  },

  // Secondary Compliance Metrics
  complianceSummary: {
    darkPatternsIdentified: 4,
    statutoryViolations: 3,
    cancellationPathway: "Asymmetric (Postal Only)",
    arbitrationStatus: "Mandatory Offshore Binding",
    regulatoryGrade: "NON-COMPLIANT (Grade F)"
  },

  // Identified Deceptive Clauses with Verbatim Citations & Regulatory Analysis
  flaggedClauses: [
    {
      id: "CLAUSE-01",
      category: "Negative Option Billing",
      severity: "CRITICAL",
      statutoryReference: "Consumer Protection (E-Commerce) Rules, Rule 6 & RBI E-Mandate Circular",
      verbatimQuote: 
        "By clicking 'Complete Trial Order', you authorize FitPulse Global to immediately initiate a monthly recurring membership charge of ₹1,499 upon expiration of the 72-hour introductory period, continuing automatically on the 1st of each month until canceled via registered physical mail.",
      analysis: 
        "Statutory non-compliance: Concealed conversion of an advertised ₹1.00 trial into an automated recurring debit without explicit stand-alone consent. Under statutory consumer defense rules, negative-option enrollments where silence or nominal action triggers continuous financial liability are prohibited deceptive practices."
    },
    {
      id: "CLAUSE-02",
      category: "Asymmetric Cancellation Friction (Roach Motel)",
      severity: "CRITICAL",
      statutoryReference: "Guidelines for Prevention and Regulation of Dark Patterns 2023, Rule 5(2)",
      verbatimQuote: 
        "Cancellation requests cannot be processed via web, email, or telephone. All cancellations must be submitted by physical certified postal letter to PO Box 8812, Road Town, Tortola, British Virgin Islands, received no less than 14 business days prior to the next scheduled billing cycle.",
      analysis: 
        "Deceptive design pattern: High-friction cancellation barrier intentionally asymmetric to digital 1-click onboarding. Requiring physical overseas postal dispatch with a 14-day pre-billing arrival window makes timely cancellation virtually impossible prior to the initial ₹1,499.00 charge execution."
    },
    {
      id: "CLAUSE-03",
      category: "Mandatory Dispute Arbitration & Forum Stripping",
      severity: "HIGH",
      statutoryReference: "Consumer Protection Act 2019, Section 35 (Non-Derogable Consumer Forum Rights)",
      verbatimQuote: 
        "You irrevocably agree that any dispute, controversy, or claim arising out of this agreement shall be settled exclusively by individual binding arbitration under the rules of the International Dispute Center in Tortola, BVI, and you expressly waive any right to participate in consumer class action litigation or consumer forum complaints.",
      analysis: 
        "Unenforceable adhesive clause: Purports to strip consumers of access to statutory consumer redressal tribunals and collective action remedies by mandating cost-prohibitive offshore private arbitration."
    },
    {
      id: "CLAUSE-04",
      category: "Pre-Selected Consent & Forced Bundling",
      severity: "HIGH",
      statutoryReference: "Guidelines for Prevention and Regulation of Dark Patterns, Annexure 1 (Forced Bundling)",
      verbatimQuote: 
        "Checkbox pre-selected: [X] 'I agree to the Terms of Service, Privacy Policy, and enrollment in the VIP Biometric Coaching Club with automatic monthly maintenance fees billed at prevailing rates.'",
      analysis: 
        "Pre-ticked opt-in violation: Statutory directives mandate that any agreement incurring continuous billing must require an unselected, affirmative checkbox accompanied by distinct disclosure of billing recurrence and interval."
    },
    {
      id: "CLAUSE-05",
      category: "Hidden Administrative Surcharge (Drip Pricing)",
      severity: "MEDIUM",
      statutoryReference: "Consumer Protection Rules (Prevention of Drip Pricing), Section 4",
      verbatimQuote: 
        "All transactions incur a non-refundable administrative network processing surcharge of ₹149.00 billed separately upon initial card verification regardless of trial cancellation status.",
      analysis: 
        "Drip pricing pattern: An unadvertised ancillary charge appended at the moment of payment capture that was omitted from the primary landing page promotional display."
    }
  ]
};

export const mockSafeReport = {
  id: "AUDIT-2026-SAFE-1044",
  productName: "NordicStream Acoustic ANC Studio Headphones",
  url: "https://store.nordicstream.com/checkout/order/48912",
  scannedAt: "2026-10-24T16:44:19Z",
  targetDomain: "store.nordicstream.com",
  protocolVersion: "Consumer Protection Protocol v2.4",
  engineHash: "SEC-BLAKE3:3a189fbc002941e7d23a9b1c7784",
  scanDurationMs: 980,

  // Stated vs Actual Pricing Contrast (Clean 1:1 Parity)
  advertisedPrice: {
    amount: 4999.00,
    currency: "₹",
    display: "₹4,999.00",
    label: "Stated Checkout Price",
    frequency: "One-Time Outright Purchase",
    billingType: "Full Inclusive Checkout Total"
  },
  actualCommitment: {
    amount: 4999.00,
    currency: "₹",
    display: "₹4,999.00 (Total Commitment)",
    label: "Actual Binding Obligation",
    frequency: "Zero Recurring Obligations",
    annualizedAmount: 4999.00,
    annualizedDisplay: "₹4,999.00 (Flat)",
    multiplier: "1.0x (Transparent 1:1 Parity)",
    authorizationType: "Single Standard Transaction Capture",
    deceptiveDelta: "₹0.00 Undisclosed Variance"
  },

  // Primary Risk Classification
  riskScore: 12,
  riskTier: "VERIFIED CLEAR",

  // Executive Overview for Compliance Reviewers
  executiveSummary: 
    "Checkout terms comply with statutory consumer protection directives and fair pricing regulations. The transaction demonstrates transparent 1:1 price parity with zero negative-option recurring mandates, zero pre-selected consent boxes, and no concealed administrative surcharges. The cancellation and return framework features a 30-day unencumbered self-service digital portal with prepaid reverse pickup. Standard dispute resolution preserves local statutory consumer forum jurisdiction.",

  // Breakdown Metrics (0 - 100 Scale)
  breakdownMetrics: {
    subscriptionRisk: 8,
    cancellationFriction: 10,
    hiddenSurcharges: 12,
    arbitrationMandates: 15
  },

  // Secondary Compliance Metrics
  complianceSummary: {
    darkPatternsIdentified: 0,
    statutoryViolations: 0,
    cancellationPathway: "Symmetric Self-Service (1-Click Digital)",
    arbitrationStatus: "Statutory Consumer Redressal Preserved",
    regulatoryGrade: "COMPLIANT (Grade A)"
  },

  // Verified Compliant Disclosures
  flaggedClauses: [
    {
      id: "SAFE-01",
      category: "Billing Structure Transparency",
      severity: "SAFE",
      statutoryReference: "Consumer Protection (E-Commerce) Rules 2020, Rule 6(5)",
      verbatimQuote: 
        "This order constitutes a single, one-time payment of ₹4,999.00 inclusive of all applicable goods and services taxes. No recurring charges, subscription agreements, maintenance plans, or recurring payment mandates are attached to this checkout transaction.",
      analysis: 
        "Verified compliance: The transaction terms clearly state the total binding price prior to payment initiation, explicitly confirming zero recurring liability."
    },
    {
      id: "SAFE-02",
      category: "Self-Service Digital Cancellation & Returns",
      severity: "SAFE",
      statutoryReference: "Directives on Symmetrical Cancellation Pathways & Fair Return Standards",
      verbatimQuote: 
        "Customers may cancel unfulfilled orders or initiate returns directly from the self-service web portal within 30 days of delivery. No telephone justification, certified mail, or restocking fees are required. Return pickup is scheduled at company expense.",
      analysis: 
        "Verified compliance: Complete symmetry between purchasing convenience and termination procedure. Satisfies modern digital consumer protection criteria."
    },
    {
      id: "SAFE-03",
      category: "Preservation of Statutory Forum Rights",
      severity: "SAFE",
      statutoryReference: "Consumer Protection Act 2019, Section 35 & Nodal Grievance Framework",
      verbatimQuote: 
        "Any consumer dissatisfaction may be escalated to our designated Grievance Officer with guaranteed response within 48 hours. Nothing in these terms limits your rights to file complaints before statutory Consumer Disputes Redressal Commissions under applicable consumer law.",
      analysis: 
        "Verified compliance: Fully preserves statutory consumer protection remedies without imposing adhesive mandatory offshore arbitration or waiver of legitimate redressal rights."
    }
  ]
};

export default {
  mockHighRiskReport,
  mockSafeReport
};
