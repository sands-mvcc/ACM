import React from 'react';
import { AppState } from '../types';

interface ReportViewProps {
  data: AppState;
}

export const ReportView: React.FC<ReportViewProps> = ({ data }) => {
  return (
    <div className="max-w-5xl mx-auto bg-white p-8 print:p-0 print:w-full">
      {/* Report Header */}
      <div className="text-center border-b-2 border-slate-800 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Access Control Matrix Report</h1>
        <p className="text-gray-500 uppercase tracking-widest font-semibold">CMMC Level 2 Audit Documentation</p>
      </div>

      {/* Metadata Section */}
      <div className="grid grid-cols-2 gap-4 mb-10 text-sm border border-gray-300 p-4 rounded-lg break-inside-avoid">
        <div>
          <span className="block text-gray-500 font-semibold">Organization:</span>
          <span className="text-lg font-medium text-slate-900">{data.metadata.organizationName || 'N/A'}</span>
        </div>
        <div>
          <span className="block text-gray-500 font-semibold">Completed By:</span>
          <span className="text-lg font-medium text-slate-900">{data.metadata.author || 'N/A'}</span>
        </div>
        <div className="col-span-2">
          <span className="block text-gray-500 font-semibold">Facilities:</span>
          <span className="text-slate-900">{data.metadata.facilities || 'N/A'}</span>
        </div>
        <div>
          <span className="block text-gray-500 font-semibold">Date Completed:</span>
          <span className="text-slate-900">{data.metadata.dateCompleted || 'N/A'}</span>
        </div>
        <div>
          <span className="block text-gray-500 font-semibold">Next Review:</span>
          <span className="text-slate-900">{data.metadata.nextReviewDate || 'N/A'}</span>
        </div>
      </div>

      {/* Technical ACM */}
      <div className="mb-10 break-inside-avoid page-break">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">1. Technical Access Control Matrix</h2>
        <table className="w-full text-sm text-left border-collapse border border-slate-300">
          <thead className="bg-slate-100">
            <tr>
              <th className="border border-slate-300 px-4 py-2 w-1/3">Subjects</th>
              <th className="border border-slate-300 px-4 py-2 w-1/3">Objects/Resources</th>
              <th className="border border-slate-300 px-4 py-2 w-1/3">Permissions</th>
            </tr>
          </thead>
          <tbody>
            {data.techEntries.map(item => (
              <tr key={item.id}>
                <td className="border border-slate-300 px-4 py-2">{item.subject}</td>
                <td className="border border-slate-300 px-4 py-2">{item.object}</td>
                <td className="border border-slate-300 px-4 py-2">{item.permission}</td>
              </tr>
            ))}
            {data.techEntries.length === 0 && (
              <tr><td colSpan={3} className="text-center p-4 italic text-gray-500">No entries recorded.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Shared RM */}
      <div className="mb-10 break-inside-avoid page-break">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-green-600 pl-3">2. Shared/Customer Responsibility Matrix</h2>
        <table className="w-full text-sm text-left border-collapse border border-slate-300">
          <thead className="bg-slate-100">
            <tr>
              <th className="border border-slate-300 px-4 py-2">Subjects</th>
              <th className="border border-slate-300 px-4 py-2">Objects/Resources</th>
              <th className="border border-slate-300 px-4 py-2">Permissions</th>
              <th className="border border-slate-300 px-4 py-2">Share Partner</th>
            </tr>
          </thead>
          <tbody>
            {data.sharedEntries.map(item => (
              <tr key={item.id}>
                <td className="border border-slate-300 px-4 py-2">{item.subject}</td>
                <td className="border border-slate-300 px-4 py-2">{item.object}</td>
                <td className="border border-slate-300 px-4 py-2">{item.permission}</td>
                <td className="border border-slate-300 px-4 py-2">{item.partner}</td>
              </tr>
            ))}
            {data.sharedEntries.length === 0 && (
              <tr><td colSpan={4} className="text-center p-4 italic text-gray-500">No entries recorded.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CMMC Model */}
      <div className="mb-10 break-inside-avoid page-break">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-purple-600 pl-3">3. CMMC Model Matrix</h2>
        <table className="w-full text-sm text-left border-collapse border border-slate-300">
          <thead className="bg-slate-100">
            <tr>
              <th className="border border-slate-300 px-4 py-2">Subject ID</th>
              <th className="border border-slate-300 px-4 py-2">Object/Resource</th>
              <th className="border border-slate-300 px-4 py-2">Permission Level</th>
              <th className="border border-slate-300 px-4 py-2">Justification</th>
              <th className="border border-slate-300 px-4 py-2">Evidence Link</th>
            </tr>
          </thead>
          <tbody>
            {data.cmmcEntries.map(item => (
              <tr key={item.id}>
                <td className="border border-slate-300 px-4 py-2 font-medium">{item.subjectId}</td>
                <td className="border border-slate-300 px-4 py-2">{item.object}</td>
                <td className="border border-slate-300 px-4 py-2">{item.permission}</td>
                <td className="border border-slate-300 px-4 py-2">{item.justification}</td>
                <td className="border border-slate-300 px-4 py-2 text-blue-600 underline">{item.evidenceLink}</td>
              </tr>
            ))}
            {data.cmmcEntries.length === 0 && (
              <tr><td colSpan={5} className="text-center p-4 italic text-gray-500">No entries recorded.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center text-xs text-gray-400 mt-12 pt-4 border-t border-gray-200">
        Generated by CMMC Access Control Matrix Builder - Instructional Tool
      </div>
    </div>
  );
};