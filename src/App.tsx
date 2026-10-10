import React, { useState } from 'react';
import { NavigationTab, Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { DropZone } from './components/analyze/DropZone';
import { AnalysisProgress } from './components/analyze/AnalysisProgress';
import { InvestigationResultsView } from './components/investigation/InvestigationResultsView';
import { InvestigationsView } from './components/pages/InvestigationsView';
import { ThreatIntelView } from './components/pages/ThreatIntelView';
import { ReportsView } from './components/pages/ReportsView';
import { SettingsView } from './components/pages/SettingsView';
import { CASE_1024, RECENT_INVESTIGATIONS, MOCK_REPORTS } from './data/mockData';
import { EmailInvestigationCase } from './types/forensics';
import { apiClient } from './api/client';

export const App: React.FC = () => {
  // App views: 'landing' or in-app tabs ('dashboard', 'analyze', 'analyzing', 'results', 'investigations', 'threat-intel', 'reports', 'settings')
  const [currentView, setCurrentView] = useState<
    'landing' | 'dashboard' | 'analyze' | 'analyzing' | 'results' | 'investigations' | 'threat-intel' | 'reports' | 'settings'
  >('landing');

  const [activeCase, setActiveCase] = useState<EmailInvestigationCase>(CASE_1024);
  const [casesList, setCasesList] = useState<EmailInvestigationCase[]>(RECENT_INVESTIGATIONS);
  const [reportsList, setReportsList] = useState(MOCK_REPORTS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active sidebar navigation mapping
  const getSidebarTab = (): NavigationTab => {
    if (currentView === 'dashboard') return 'dashboard';
    if (currentView === 'analyze' || currentView === 'analyzing') return 'analyze';
    if (currentView === 'investigations' || currentView === 'results') return 'investigations';
    if (currentView === 'threat-intel') return 'threat-intel';
    if (currentView === 'reports') return 'reports';
    if (currentView === 'settings') return 'settings';
    return 'dashboard';
  };

  // 1. Landing Page Navigation
  const handleGetStarted = () => {
    setCurrentView('dashboard');
  };

  const handleViewDemo = () => {
    setActiveCase(CASE_1024);
    setCurrentView('results');
  };

  // 2. Analyze Email Flow
  const handleStartAnalysis = async (file?: File, rawText?: string) => {
    setCurrentView('analyzing');
  };

  const handleUseDemoEmail = () => {
    setActiveCase(CASE_1024);
    setCurrentView('analyzing');
  };

  const handleAnalysisAnimationComplete = () => {
    setCurrentView('results');
  };

  // 3. View Case Detail
  const handleViewCase = (caseItem: EmailInvestigationCase) => {
    setActiveCase(caseItem);
    setCurrentView('results');
  };

  // 4. Sidebar Nav Selection
  const handleSelectSidebarTab = (tab: NavigationTab) => {
    if (tab === 'analyze') {
      setCurrentView('analyze');
    } else if (tab === 'investigations') {
      setCurrentView('investigations');
    } else if (tab === 'threat-intel') {
      setCurrentView('threat-intel');
    } else if (tab === 'reports') {
      setCurrentView('reports');
    } else if (tab === 'settings') {
      setCurrentView('settings');
    } else {
      setCurrentView('dashboard');
    }
  };

  // Render Landing Page
  if (currentView === 'landing') {
    return (
      <LandingPage
        onGetStarted={handleGetStarted}
        onViewDemo={handleViewDemo}
      />
    );
  }

  // Render Main Application Shell
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Bar */}
      <Navbar
        onNavigateHome={() => setCurrentView('landing')}
        onOpenMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeTab={getSidebarTab()}
          onSelectTab={handleSelectSidebarTab}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Workspace Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {currentView === 'dashboard' && (
              <DashboardView
                cases={casesList}
                onViewCase={handleViewCase}
                onNavigateToAnalyze={() => setCurrentView('analyze')}
              />
            )}

            {currentView === 'analyze' && (
              <DropZone
                onStartAnalysis={handleStartAnalysis}
                onUseDemo={handleUseDemoEmail}
              />
            )}

            {currentView === 'analyzing' && (
              <AnalysisProgress
                onComplete={handleAnalysisAnimationComplete}
              />
            )}

            {currentView === 'results' && (
              <InvestigationResultsView
                caseData={activeCase}
                onBackToDashboard={() => setCurrentView('dashboard')}
              />
            )}

            {currentView === 'investigations' && (
              <InvestigationsView
                cases={casesList}
                onViewCase={handleViewCase}
              />
            )}

            {currentView === 'threat-intel' && (
              <ThreatIntelView
                indicators={activeCase.threatIntel}
              />
            )}

            {currentView === 'reports' && (
              <ReportsView
                reports={reportsList}
                cases={casesList}
              />
            )}

            {currentView === 'settings' && (
              <SettingsView />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
