import React, { useState } from 'react';
import { InfrastructureHop } from '../../types/forensics';
import { Globe2, Server, ShieldAlert, ArrowRight, Info, MapPin, Network } from 'lucide-react';

interface InfrastructureMapProps {
  hops: InfrastructureHop[];
  primaryInfrastructure: {
    ip: string;
    country: string;
    region: string;
    city: string;
    asn: string;
    isp: string;
    hosting: string;
    reverseDns: string;
    coordinates: [number, number];
  };
}

export const InfrastructureMap: React.FC<InfrastructureMapProps> = ({
  hops,
  primaryInfrastructure
}) => {
  const [activeHopIndex, setActiveHopIndex] = useState(2); // Default to Relay Server (Hop 3)
  const selectedHop = hops[activeHopIndex] || hops[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900">Infrastructure Intelligence</h2>
          <p className="text-xs text-slate-500">
            Geographic geolocation and Autonomous System Network (ASN) tracing of intermediate hops.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
          <Network className="w-3.5 h-3.5 text-blue-600" />
          <span>{hops.length} Network Hops Recorded</span>
        </div>
      </div>

      {/* Main Grid: Visual Map Panel + Hop Route + Side Infrastructure Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Map & Route Visualization */}
        <div className="lg:col-span-8 space-y-4">
          {/* Interactive World Map Canvas */}
          <div className="relative rounded-2xl border border-slate-200 bg-slate-900 p-6 shadow-sm overflow-hidden text-white min-h-[300px] flex flex-col justify-between">
            {/* Grid & Lat/Long aesthetic overlays */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
                  Global Relay Trajectory (BGP Transit)
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Lat: {primaryInfrastructure.coordinates[0]}° N • Lon: {primaryInfrastructure.coordinates[1]}° E
              </span>
            </div>

            {/* SVG Stylized Map Layout */}
            <div className="relative z-10 my-6 py-4 flex items-center justify-center">
              <svg className="w-full h-44 text-slate-700" viewBox="0 0 800 240" fill="none">
                {/* World Map Outline Contours (Simplified geo stylization) */}
                <path
                  d="M100 80 Q 150 40, 240 60 T 380 90 T 520 60 T 680 100"
                  stroke="#334155"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M80 140 Q 200 130, 320 160 T 500 140 T 720 150"
                  stroke="#1e293b"
                  strokeWidth="1.5"
                />

                {/* Animated Connection Beams between nodes */}
                {/* Hop 1 -> Hop 2 */}
                <path
                  d="M 120 120 Q 220 70 280 110"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  className="opacity-70"
                />
                {/* Hop 2 -> Hop 3 (Malicious hop highlight) */}
                <path
                  d="M 280 110 Q 360 50 440 95"
                  stroke="#ef4444"
                  strokeWidth="3"
                  className="opacity-90"
                />
                {/* Hop 3 -> Hop 4 */}
                <path
                  d="M 440 95 Q 520 140 600 115"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  className="opacity-70"
                />
                {/* Hop 4 -> Hop 5 */}
                <path
                  d="M 600 115 Q 660 80 720 110"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />

                {/* Markers */}
                {/* Node 1: Sender */}
                <g className="cursor-pointer" onClick={() => setActiveHopIndex(0)}>
                  <circle cx="120" cy="120" r="7" fill="#f59e0b" />
                  <text x="120" y="145" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">Bucharest</text>
                </g>

                {/* Node 2: Mail Server */}
                <g className="cursor-pointer" onClick={() => setActiveHopIndex(1)}>
                  <circle cx="280" cy="110" r="7" fill="#f59e0b" />
                  <text x="280" y="135" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">Frankfurt</text>
                </g>

                {/* Node 3: Relay Server (Critical Amsterdam) */}
                <g className="cursor-pointer" onClick={() => setActiveHopIndex(2)}>
                  <circle cx="440" cy="95" r="14" fill="#ef4444" opacity="0.3" className="animate-ping-slow" />
                  <circle cx="440" cy="95" r="9" fill="#dc2626" />
                  <text x="440" y="75" textAnchor="middle" fill="#f87171" fontWeight="bold" fontSize="12" fontFamily="monospace">
                    Amsterdam [Flagged]
                  </text>
                </g>

                {/* Node 4: Cloud Proxy */}
                <g className="cursor-pointer" onClick={() => setActiveHopIndex(3)}>
                  <circle cx="600" cy="115" r="7" fill="#3b82f6" />
                  <text x="600" y="140" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">San Francisco</text>
                </g>

                {/* Node 5: Corporate Mailbox */}
                <g className="cursor-pointer" onClick={() => setActiveHopIndex(4)}>
                  <circle cx="720" cy="110" r="8" fill="#10b981" />
                  <text x="720" y="135" textAnchor="middle" fill="#34d399" fontSize="11" fontFamily="monospace">Gateway</text>
                </g>
              </svg>
            </div>

            {/* Click to select helper */}
            <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-3">
              <span>Interactive Nodes: Click any point to view forensic node telemetry.</span>
              <span className="text-amber-400 font-mono">Selected: {selectedHop.label}</span>
            </div>
          </div>

          {/* Hop Chain Flow Badges */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
              Server Hop Chain Sequence
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {hops.map((hop, idx) => {
                const isSelected = idx === activeHopIndex;
                const isMalicious = hop.status === 'malicious';
                const isSuspicious = hop.status === 'suspicious';

                return (
                  <React.Fragment key={hop.id}>
                    <button
                      onClick={() => setActiveHopIndex(idx)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-200'
                          : isMalicious
                          ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                          : isSuspicious
                          ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Server className="w-3.5 h-3.5" />
                      <span>{hop.label}</span>
                    </button>

                    {idx < hops.length - 1 && (
                      <span className="text-slate-400 font-bold text-xs">↓</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Side Infrastructure Details Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Node Telemetry</span>
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                selectedHop.status === 'malicious' ? 'bg-red-100 text-red-700 border border-red-200' :
                selectedHop.status === 'suspicious' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                'bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}>
                {selectedHop.status}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Node Identifier</span>
                <span className="font-semibold text-slate-800">{selectedHop.label}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">IP Address</span>
                <span className="font-mono font-bold text-slate-900">{selectedHop.ip}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Country</span>
                <span className="font-medium text-slate-800">{selectedHop.country}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Region / City</span>
                <span className="font-medium text-slate-800">{selectedHop.region}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">ASN</span>
                <span className="font-mono font-medium text-slate-800 text-right max-w-[170px] truncate">{selectedHop.asn}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Hosting Type</span>
                <span className="font-medium text-slate-800">{selectedHop.hostingType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Handoff Latency</span>
                <span className="font-mono text-slate-600">{selectedHop.latency}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Hop Timestamp</span>
                <span className="font-mono text-slate-600">{selectedHop.timestamp}</span>
              </div>
            </div>

            {/* Primary flagged server callout */}
            <div className="rounded-xl bg-red-50 p-3 border border-red-100 text-xs text-red-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                <span>Bulletproof Relay Identified</span>
              </div>
              <p className="text-[11px] text-red-800/90 leading-relaxed">
                IP {primaryInfrastructure.ip} ({primaryInfrastructure.asn}) has been identified as a high-frequency credential harvesting C2 node.
              </p>
            </div>
          </div>

          {/* Forensic Disclaimer Required by Section 10 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 text-[11px] text-slate-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-700">Forensic Disclaimer:</strong> IP geolocation represents infrastructure intelligence and does not prove the physical identity or location of an attacker.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
