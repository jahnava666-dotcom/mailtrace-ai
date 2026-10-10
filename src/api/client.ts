import { CASE_1024, RECENT_INVESTIGATIONS, MOCK_REPORTS, AI_PRESET_RESPONSES } from '../data/mockData';
import { EmailInvestigationCase, GeneratedReport, ThreatIntelligenceIndicator } from '../types/forensics';

// Configurable base URL for when FastAPI backend is connected
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * MailTrace AI Client Layer
 * Abstracted interface mirroring future FastAPI endpoints:
 * - POST /analyze-email
 * - GET /investigations
 * - GET /investigations/{id}
 * - GET /threat-intelligence
 * - POST /generate-report
 * - POST /ai-assistant
 */
export const apiClient = {
  // POST /analyze-email
  analyzeEmail: async (input: { file?: File; rawText?: string; isDemo?: boolean }): Promise<EmailInvestigationCase> => {
    if (API_BASE_URL) {
      // Future live FastAPI call:
      // const formData = new FormData();
      // if (input.file) formData.append('file', input.file);
      // const res = await fetch(`${API_BASE_URL}/analyze-email`, { method: 'POST', body: formData });
      // return await res.json();
    }

    // High fidelity simulated delay for forensic processing
    await new Promise((resolve) => setTimeout(resolve, 1800));

    // If a custom file was dropped, synthesize realistic metadata or return CASE_1024
    if (input.file) {
      return {
        ...CASE_1024,
        caseId: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
        date: 'Just now',
        subject: input.file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ') || 'Suspicious Attachment Investigation',
      };
    }

    return CASE_1024;
  },

  // GET /investigations
  getInvestigations: async (): Promise<EmailInvestigationCase[]> => {
    if (API_BASE_URL) {
      // const res = await fetch(`${API_BASE_URL}/investigations`);
      // return await res.json();
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
    return RECENT_INVESTIGATIONS;
  },

  // GET /investigations/{id}
  getInvestigationById: async (id: string): Promise<EmailInvestigationCase | null> => {
    if (API_BASE_URL) {
      // const res = await fetch(`${API_BASE_URL}/investigations/${id}`);
      // return await res.json();
    }
    const found = RECENT_INVESTIGATIONS.find((c) => c.caseId.toLowerCase() === id.toLowerCase());
    return found || CASE_1024;
  },

  // GET /threat-intelligence
  getThreatIntelligence: async (): Promise<ThreatIntelligenceIndicator[]> => {
    if (API_BASE_URL) {
      // const res = await fetch(`${API_BASE_URL}/threat-intelligence`);
      // return await res.json();
    }
    return CASE_1024.threatIntel;
  },

  // POST /generate-report
  generateReport: async (caseId: string, format: 'PDF' | 'JSON' | 'STIX 2.1' = 'PDF'): Promise<GeneratedReport> => {
    if (API_BASE_URL) {
      // const res = await fetch(`${API_BASE_URL}/generate-report`, { method: 'POST', body: JSON.stringify({ caseId, format }) });
      // return await res.json();
    }
    await new Promise((resolve) => setTimeout(resolve, 600));
    const newReport: GeneratedReport = {
      reportId: `REP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      caseId: caseId,
      title: `Forensic Dossier: ${caseId}`,
      threatLevel: CASE_1024.verdict,
      riskScore: CASE_1024.riskScore,
      createdAt: 'Just now',
      author: 'MailTrace AI Engine (Automated SOC Tier 2)',
      format: format,
      summary: `Automated forensic export containing header anomalies, IOCs, SPF/DKIM/DMARC breakdown, and remediation plan for ${caseId}.`
    };
    return newReport;
  },

  // POST /ai-assistant
  askAiAssistant: async (query: string, caseData?: EmailInvestigationCase): Promise<string> => {
    if (API_BASE_URL) {
      // const res = await fetch(`${API_BASE_URL}/ai-assistant`, { method: 'POST', body: JSON.stringify({ query, caseId: caseData?.caseId }) });
      // return (await res.json()).response;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    const q = query.toLowerCase();

    if (q.includes('why') || q.includes('malicious') || q.includes('classified')) {
      return AI_PRESET_RESPONSES.why;
    }
    if (q.includes('next') || q.includes('investigate') || q.includes('step')) {
      return AI_PRESET_RESPONSES.investigate;
    }
    if (q.includes('dmarc') || q.includes('spf') || q.includes('dkim') || q.includes('auth')) {
      return AI_PRESET_RESPONSES.dmarc;
    }
    if (q.includes('attachment') || q.includes('zip') || q.includes('file')) {
      return AI_PRESET_RESPONSES.attachment;
    }
    if (q.includes('mitigate') || q.includes('action') || q.includes('block') || q.includes('fix')) {
      return AI_PRESET_RESPONSES.mitigation;
    }
    return AI_PRESET_RESPONSES.default;
  }
};
