import React, { useState } from 'react';
import { ThreatIntelligenceIndicator } from '../../types/forensics';
import { ThreatIntelTable } from '../investigation/ThreatIntelTable';
import { Database, Search, ShieldCheck, ExternalLink, RefreshCw, AlertTriangle } from 'lucide-react';

interface ThreatIntelViewProps {
  indicators: ThreatIntelligenceIndicator[];
}

export const ThreatIntelView: React.FC<ThreatIntelViewProps> = ({ indicators }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const types = ['All', 'Domain', 'IP', 'URL', 'Attachment', 'SHA-256'];

  const filtered = indicators.filter((item) => {
    if (selectedType !== 'All' && item.type !== selectedType) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return item.indicator.toLowerCase().includes(q) || item.details.toLowerCase().includes(q);
    }
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Threat Intelligence</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Global telemetry correlation of active phishing kits, bulletproof hosting ASNs, and dropper signatures.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
          <span>Sync Feed</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedType === t
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative min-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search IOC, domain, hash, or IP..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      <ThreatIntelTable indicators={filtered} />
    </div>
  );
};
