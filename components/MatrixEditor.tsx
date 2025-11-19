import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, InfoIcon } from './Icons';

interface ColumnDefinition<T> {
  key: keyof T;
  label: string;
  placeholder?: string;
  type?: 'text' | 'select';
  options?: string[];
}

interface MatrixEditorProps<T> {
  title: string;
  description: string;
  columns: ColumnDefinition<T>[];
  data: T[];
  onAdd: (item: Omit<T, 'id'>) => void;
  onEdit: (id: string, item: T) => void;
  onDelete: (id: string) => void;
  educationalNote?: string;
}

export function MatrixEditor<T extends { id: string }>({
  title,
  description,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  educationalNote
}: MatrixEditorProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<T>>({});

  const openAddModal = () => {
    setEditingId(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const openEditModal = (item: T) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      onEdit(editingId, formData as T);
    } else {
      onAdd(formData as Omit<T, 'id'>);
    }
    setIsModalOpen(false);
  };

  const handleChange = (key: keyof T, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition shadow-sm"
          >
            <PlusIcon className="w-4 h-4" />
            Add Entry
          </button>
        </div>
        {educationalNote && (
          <div className="flex gap-3 items-start bg-yellow-50 p-3 rounded-md border border-yellow-100">
            <InfoIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800 italic">{educationalNote}</p>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-700 uppercase bg-slate-50 border-b border-gray-200">
              <tr>
                {columns.map(col => (
                  <th key={String(col.key)} className="px-6 py-3 font-semibold tracking-wider">
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-400">
                    No entries found. Click "Add Entry" to begin.
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    {columns.map(col => (
                      <td key={`${row.id}-${String(col.key)}`} className="px-6 py-4 whitespace-pre-wrap max-w-xs">
                        {String(row[col.key] || '')}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(row)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition"
                          title="Edit"
                        >
                          <EditIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(row.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all">
            <div className="bg-slate-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">
                {editingId ? 'Edit Entry' : 'New Entry'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {columns.map(col => (
                <div key={String(col.key)}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {col.label}
                  </label>
                  {col.type === 'select' ? (
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      value={String(formData[col.key] || '')}
                      onChange={e => handleChange(col.key, e.target.value)}
                    >
                      <option value="">Select...</option>
                      {col.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px]"
                      placeholder={col.placeholder}
                      value={String(formData[col.key] || '')}
                      onChange={e => handleChange(col.key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md shadow-sm transition"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}