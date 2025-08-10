import React from 'react';
import type { FormField } from '../../types/form';

const RadioField: React.FC<FormField> = ({
  name,
  label,
  value = '',
  onChange,
  required = false,
  options = [],
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              id={`${name}-${option}`}
              name={name}
              type="radio"
              checked={value === option}
              onChange={() => onChange?.(option)}
              required={required}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label
              htmlFor={`${name}-${option}`}
              className="ml-2 block text-sm text-gray-700"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioField;
