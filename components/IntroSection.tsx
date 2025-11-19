import React from 'react';
import { ReportMetadata } from '../types';

interface IntroSectionProps {
  metadata: ReportMetadata;
  onChange: (key: keyof ReportMetadata, value: string) => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ metadata, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">Report Configuration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
          <input
            type="text"
            value={metadata.organizationName}
            onChange={(e) => onChange('organizationName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="e.g. Acme Cyber Defense"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author / Completed By</label>
          <input
            type="text"
            value={metadata.author}
            onChange={(e) => onChange('author', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="e.g. Jane Doe, CISO"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">List of Physical Facilities</label>
          <textarea
            value={metadata.facilities}
            onChange={(e) => onChange('facilities', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-24"
            placeholder="e.g. HQ (New York), Data Center (Virginia)..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Completed</label>
          <input
            type="date"
            value={metadata.dateCompleted}
            onChange={(e) => onChange('dateCompleted', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date for Next Review</label>
          <input
            type="date"
            value={metadata.nextReviewDate}
            onChange={(e) => onChange('nextReviewDate', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4">
        <h3 className="font-semibold text-blue-800">Professor's Note:</h3>
        <p className="text-sm text-blue-700 mt-1">
          This section establishes the context for the CMMC audit. The <strong>Date for Next Review</strong> is crucial for demonstrating the "maintenance" aspect of maturity in CMMC (AC.L2-3.1.1). Ensure all physical locations processing CUI are listed.
        </p>
      </div>
    </div>
  );
};