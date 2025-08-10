import React from 'react';
import type { FormField } from '../../types/form';

const CheckboxField: React.FC<FormField> = ({
  name,
  label,
  value = false,
  onChange,
  required = false,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange?.(e.target.checked)}
          required={required}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      </div>
    </div>
  );
};

export default CheckboxField;
