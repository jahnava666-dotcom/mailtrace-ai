import React, { useState } from 'react';
import { EmailInvestigationCase } from '../../types/forensics';
import { RiskBadge } from '../common/RiskBadge';
import { Search, Filter, Eye, ShieldAlert, ArrowUpDown } from 'lucide-react';

interface InvestigationsViewProps {
  cases: EmailInvestigationCase[];
  onViewCase: (c: EmailInvestigationCase) => void;
}

export const InvestigationsView: React.FC<InvestigationsViewProps> = ({ cases, onViewCase }) => {
  const [filterVerdict, setFilterVerdict] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterOptions = ['All', 'Safe', 'Suspicious', 'High Risk', 'Critical'];

  const filteredCases = cases.filter((c) => {
    // Verdict filter
    if (filterVerdict === 'Safe' && c.verdict !== 'Likely Safe') return false;
    if (filterVerdict === 'Suspicious' && c.verdict !== 'Suspicious') return false;
    if (filterVerdict === 'High Risk' && c.verdict !== 'High Risk') return false;
    if (filterVerdict === 'Critical' && c.verdict !== 'Critical Threat') return false;

    // Search query filter (Case ID, Email, Domain, IP)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = c.caseId.toLowerCase().includes(q);
      const matchEmail = c.email.toLowerCase().includes(q);
      const matchDomain = c.primaryInfrastructure.reverseDns?.toLowerCase().includes(q) || c.from.toLowerCase().includes(q);
      const matchIp = c.primaryInfrastructure.ip.toLowerCase().includes(q);
      return matchId || matchEmail || matchDomain || matchIp;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Investigations Archive</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Historical repository of parsed email incidents, threat scorings, and SOC case logs.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Verdict:
          </span>
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilterVerdict(opt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterVerdict === opt
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Case ID, Email, Domain, or IP..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {/* Cases Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5">Case ID</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Email Sender</th>
                <th className="px-5 py-3.5">Risk Score</th>
                <th className="px-5 py-3.5">Verdict</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-slate-400">
                    No investigations match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredCases.map((c) => (
                  <tr
                    key={c.caseId}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => onViewCase(c)}
                  >
                    <td className="px-5 py-4 font-mono font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span>{c.caseId}</span>
                    </td>

                    <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                      {c.date}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-800">{c.email}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">{c.subject}</div>
                    </td>

                    <td className="px-5 py-4 font-mono font-bold">
                      <span className={c.riskScore >= 80 ? 'text-red-600' : c.riskScore >= 60 ? 'text-orange-600' : 'text-emerald-600'}>
                        {c.riskScore}/100
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <RiskBadge verdict={c.verdict} size="sm" />
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 uppercase">
                        {c.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewCase(c);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
