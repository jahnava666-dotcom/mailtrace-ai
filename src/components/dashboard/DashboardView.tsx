import React from 'react';
import { EmailInvestigationCase } from '../../types/forensics';
import { StatCards } from './StatCards';
import { RecentTable } from './RecentTable';
import { Shield, Sparkles, Mail, ArrowRight, Activity, AlertOctagon } from 'lucide-react';

interface DashboardViewProps {
  cases: EmailInvestigationCase[];
  onViewCase: (c: EmailInvestigationCase) => void;
  onNavigateToAnalyze: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  cases,
  onViewCase,
  onNavigateToAnalyze
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              SOC Mail Gateway • Real-Time Protection
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Security Investigation Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time mailbox telemetry, forensic extraction, and threat classification stream.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToAnalyze}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all hover:scale-[1.01]"
          >
            <Mail className="h-4 w-4" />
            <span>Analyze Email</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards (Section 3 requirement) */}
      <StatCards
        analyzedCount={128}
        threatsCount={34}
        highRiskCount={17}
        criticalCount={8}
      />

      {/* Recent Investigations Table (Section 3 requirement) */}
      <RecentTable
        cases={cases}
        onViewCase={onViewCase}
        onNavigateToAnalyze={onNavigateToAnalyze}
      />
    </div>
  );
};
