import React, { useState, useEffect } from 'react';
import { AppState, TabView, TechnicalACMEntry, SharedRMEntry, CMMCModelEntry, ReportMetadata } from './types';
import { IntroSection } from './components/IntroSection';
import { MatrixEditor } from './components/MatrixEditor';
import { ReportView } from './components/ReportView';
import { DownloadIcon, PrinterIcon } from './components/Icons';

// Initial State
const INITIAL_STATE: AppState = {
  metadata: {
    organizationName: '',
    author: '',
    facilities: '',
    dateCompleted: '',
    nextReviewDate: ''
  },
  techEntries: [],
  sharedEntries: [],
  cmmcEntries: []
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>('intro');
  const [data, setData] = useState<AppState>(() => {
    const saved = localStorage.getItem('cmmc-acm-data');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('cmmc-acm-data', JSON.stringify(data));
  }, [data]);

  const handleMetadataChange = (key: keyof ReportMetadata, value: string) => {
    setData(prev => ({
      ...prev,
      metadata: { ...prev.metadata, [key]: value }
    }));
  };

  // CRUD Handlers for Technical ACM
  const addTechEntry = (item: Omit<TechnicalACMEntry, 'id'>) => {
    setData(prev => ({
      ...prev,
      techEntries: [...prev.techEntries, { ...item, id: crypto.randomUUID() }]
    }));
  };
  const editTechEntry = (id: string, item: TechnicalACMEntry) => {
    setData(prev => ({
      ...prev,
      techEntries: prev.techEntries.map(e => e.id === id ? item : e)
    }));
  };
  const deleteTechEntry = (id: string) => {
    setData(prev => ({
      ...prev,
      techEntries: prev.techEntries.filter(e => e.id !== id)
    }));
  };

  // CRUD Handlers for Shared RM
  const addSharedEntry = (item: Omit<SharedRMEntry, 'id'>) => {
    setData(prev => ({
      ...prev,
      sharedEntries: [...prev.sharedEntries, { ...item, id: crypto.randomUUID() }]
    }));
  };
  const editSharedEntry = (id: string, item: SharedRMEntry) => {
    setData(prev => ({
      ...prev,
      sharedEntries: prev.sharedEntries.map(e => e.id === id ? item : e)
    }));
  };
  const deleteSharedEntry = (id: string) => {
    setData(prev => ({
      ...prev,
      sharedEntries: prev.sharedEntries.filter(e => e.id !== id)
    }));
  };

  // CRUD Handlers for CMMC Model
  const addCMMCEntry = (item: Omit<CMMCModelEntry, 'id'>) => {
    setData(prev => ({
      ...prev,
      cmmcEntries: [...prev.cmmcEntries, { ...item, id: crypto.randomUUID() }]
    }));
  };
  const editCMMCEntry = (id: string, item: CMMCModelEntry) => {
    setData(prev => ({
      ...prev,
      cmmcEntries: prev.cmmcEntries.map(e => e.id === id ? item : e)
    }));
  };
  const deleteCMMCEntry = (id: string) => {
    setData(prev => ({
      ...prev,
      cmmcEntries: prev.cmmcEntries.filter(e => e.id !== id)
    }));
  };

  // Export & Print
  const handleDownload = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `cmmc-acm-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    // Switch to report view then print
    setActiveTab('report');
    setTimeout(() => window.print(), 100);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white shadow-md z-10 print:hidden flex-shrink-0">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">CMMC Access Control Builder</h1>
              <p className="text-xs text-slate-400">Educational Tool for CMMC L2 Compliance</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm transition border border-slate-700"
            >
              <DownloadIcon className="w-4 h-4" />
              <span>Download JSON</span>
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition font-medium shadow-lg shadow-blue-900/20"
            >
              <PrinterIcon className="w-4 h-4" />
              <span>Print Report</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden print:block print:overflow-visible print:h-auto">
        {/* Sidebar Navigation (Desktop) */}
        <nav className="w-64 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto hidden md:block print:hidden">
          <div className="p-4 space-y-1">
            <NavButton active={activeTab === 'intro'} onClick={() => setActiveTab('intro')} label="1. Report Configuration" desc="Org details & facilities" />
            <div className="h-px bg-gray-100 my-2"></div>
            <NavButton active={activeTab === 'tech'} onClick={() => setActiveTab('tech')} label="2. Technical ACM" desc="Internal Systems & Roles" />
            <NavButton active={activeTab === 'shared'} onClick={() => setActiveTab('shared')} label="3. Shared / CRM" desc="Cloud & External Partners" />
            <NavButton active={activeTab === 'cmmc'} onClick={() => setActiveTab('cmmc')} label="4. CMMC Model Matrix" desc="Evidence & Justification" />
            <div className="h-px bg-gray-100 my-2"></div>
            <NavButton active={activeTab === 'report'} onClick={() => setActiveTab('report')} label="View Full Report" desc="Preview before printing" />
          </div>
          
          <div className="p-6 mt-10">
             <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs text-slate-600">
                <strong className="block mb-2 text-slate-800">Instructions:</strong>
                Navigate through the tabs to build your documentation. Data is saved automatically to your browser. Use the print button to generate a PDF.
             </div>
          </div>
        </nav>

        {/* Mobile Navigation (Tabs) */}
        <nav className="md:hidden bg-white border-b border-gray-200 overflow-x-auto flex flex-shrink-0 print:hidden">
           <div className="flex min-w-full p-2 gap-2">
              <button onClick={() => setActiveTab('intro')} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm ${activeTab === 'intro' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>Config</button>
              <button onClick={() => setActiveTab('tech')} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm ${activeTab === 'tech' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>Tech ACM</button>
              <button onClick={() => setActiveTab('shared')} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm ${activeTab === 'shared' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>Shared RM</button>
              <button onClick={() => setActiveTab('cmmc')} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm ${activeTab === 'cmmc' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>CMMC Model</button>
              <button onClick={() => setActiveTab('report')} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm ${activeTab === 'report' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>Report</button>
           </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50 print:bg-white print:p-0 print:overflow-visible">
          
          {activeTab === 'intro' && (
            <IntroSection metadata={data.metadata} onChange={handleMetadataChange} />
          )}

          {activeTab === 'tech' && (
            <div className="max-w-6xl mx-auto">
              <MatrixEditor<TechnicalACMEntry>
                title="Technical Access Control Matrix"
                description="Map subjects to objects and define precise permission levels."
                educationalNote="Subjects must align with organizational roles (AC.L2-3.1.4). Objects must include all systems processing CUI."
                columns={[
                  { key: 'subject', label: 'Subject', placeholder: 'e.g., Network Admin Group' },
                  { key: 'object', label: 'Object/Resource', placeholder: 'e.g., File Server Volume X' },
                  { key: 'permission', label: 'Permissions', placeholder: 'e.g., Read, Write, Execute' }
                ]}
                data={data.techEntries}
                onAdd={addTechEntry}
                onEdit={editTechEntry}
                onDelete={deleteTechEntry}
              />
            </div>
          )}

          {activeTab === 'shared' && (
             <div className="max-w-6xl mx-auto">
              <MatrixEditor<SharedRMEntry>
                title="Shared / Customer Responsibility Matrix"
                description="Document access controls managed by external partners or cloud providers."
                educationalNote="Clearly define the Share Partner to delineate responsibility boundaries for CMMC assessment."
                columns={[
                  { key: 'subject', label: 'Subject', placeholder: 'e.g., MSP Admin' },
                  { key: 'object', label: 'Object/Resource', placeholder: 'e.g., Hosted Exchange Server' },
                  { key: 'permission', label: 'Permissions', placeholder: 'e.g., Full Control' },
                  { key: 'partner', label: 'Share Partner', placeholder: 'e.g., AWS, Microsoft 365' }
                ]}
                data={data.sharedEntries}
                onAdd={addSharedEntry}
                onEdit={editSharedEntry}
                onDelete={deleteSharedEntry}
              />
            </div>
          )}

          {activeTab === 'cmmc' && (
            <div className="max-w-6xl mx-auto">
              <MatrixEditor<CMMCModelEntry>
                title="CMMC Model Matrix"
                description="Provide detailed justification and evidence links for compliance verification."
                educationalNote="The 'Justification' column validates Least Privilege (AC.L2-3.1.5). 'Evidence Link' is critical for C3PAO audits."
                columns={[
                  { key: 'subjectId', label: 'Subject ID', placeholder: 'e.g., Role-DBA-01' },
                  { key: 'object', label: 'Object/Resource', placeholder: 'e.g., CUI Repository A' },
                  { key: 'permission', label: 'Permission Level', placeholder: 'e.g., Read-Only' },
                  { key: 'justification', label: 'Justification / Business Need', placeholder: 'Required for monthly auditing task...' },
                  { key: 'evidenceLink', label: 'Supporting Evidence Link', placeholder: 'e.g., Policy-AC-01.pdf, Section 4' }
                ]}
                data={data.cmmcEntries}
                onAdd={addCMMCEntry}
                onEdit={editCMMCEntry}
                onDelete={deleteCMMCEntry}
              />
            </div>
          )}

          {activeTab === 'report' && (
            <ReportView data={data} />
          )}

        </main>
      </div>
    </div>
  );
};

const NavButton = ({ active, onClick, label, desc }: { active: boolean, onClick: () => void, label: string, desc: string }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 group ${
      active ? 'bg-slate-900 text-white shadow-md' : 'hover:bg-slate-100 text-slate-600'
    }`}
  >
    <div className="font-medium">{label}</div>
    <div className={`text-xs mt-0.5 ${active ? 'text-slate-300' : 'text-slate-400'}`}>{desc}</div>
  </button>
);

export default App;