import React from 'react';
import type { FormField } from '../../types/form';

const EmailField: React.FC<FormField> = ({
  name,
  label,
  value = '',
  onChange,
  required = false,
  placeholder = 'example@domain.com',
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="email"
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default EmailField;
