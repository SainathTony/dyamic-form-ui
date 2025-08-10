import React from 'react';
import type { DynamicForm } from '../services/types';

interface FormListProps {
  forms: DynamicForm[];
  loading: boolean;
  onFormSelect: (form: DynamicForm) => void;
  selectedForm: DynamicForm | null;
}
const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
const FormList: React.FC<FormListProps> = ({ forms, loading, onFormSelect, selectedForm }) => {

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
        <span>Loading forms...</span>
      </div>
    );
  }

  if (forms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
        <span>No forms have been generated yet.</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Generated Forms
        </h2>
      </div>

      <div className="space-y-4">
        {forms.map((form) => (
          <div
            key={form.form_name}
            className={`bg-white rounded-xl p-4 transition-shadow cursor-pointer ${selectedForm?.form_name === form.form_name ? 'border-2 border-primary' : ''}`}
            onClick={() => onFormSelect(form)}
          >
            <div className="flex items-center ">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {form.form_name}
                </h3>
              </div>
              <span className="text-sm text-gray-500 ml-4">
                {formatter.format(new Date(form.created_at))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormList;