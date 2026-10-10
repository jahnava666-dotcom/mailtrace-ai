import React, { useState } from 'react';
import { User, Bell, Palette, Sliders, Check, Shield } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [name, setName] = useState('Alex Carter');
  const [email, setEmail] = useState('alex.carter@corporate-security.net');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoReport, setAutoReport] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure analyst credentials, notification thresholds, and automated forensic engine parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-sm transition-all"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : null}
          <span>{saved ? 'Preferences Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Account Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          <User className="w-4 h-4 text-blue-600" />
          <span>Account Information</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Analyst Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Corporate Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          <Bell className="w-4 h-4 text-amber-500" />
          <span>Notification Alerts</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <div className="font-semibold text-slate-800">Email Alerts</div>
              <div className="text-slate-500 text-[11px]">Receive digest notifications when new email files are triaged.</div>
            </div>
            <button
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                emailAlerts ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  emailAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <div className="font-semibold text-slate-800">Critical Threat Alerts</div>
              <div className="text-slate-500 text-[11px]">Immediately page on-duty SOC analyst when risk score exceeds 80/100.</div>
            </div>
            <button
              onClick={() => setCriticalAlerts(!criticalAlerts)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                criticalAlerts ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  criticalAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          <Palette className="w-4 h-4 text-indigo-500" />
          <span>Appearance</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <div>
            <div className="font-semibold text-slate-800">Interface Theme</div>
            <div className="text-slate-500 text-[11px]">Currently using High-Contrast SOC Light theme (Recommended for investigation clarity).</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-medium">Light</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  darkMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-xs text-slate-600 font-medium">Dark</span>
          </div>
        </div>
      </div>

      {/* Investigation Preferences */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          <Sliders className="w-4 h-4 text-emerald-500" />
          <span>Investigation Preferences</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <div>
            <div className="font-semibold text-slate-800">Automatic Report Generation</div>
            <div className="text-slate-500 text-[11px]">Automatically generate and archive compliance dossier upon analysis completion.</div>
          </div>
          <button
            onClick={() => setAutoReport(!autoReport)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
              autoReport ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                autoReport ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
