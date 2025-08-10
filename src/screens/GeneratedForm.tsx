import React from 'react';
import Button from '../components/Button';
import type { DynamicForm } from '../services/types';
import { FormFieldRenderer } from '../components/form-fields';

interface GeneratedFormProps {
  form: DynamicForm;
}

const GeneratedForm: React.FC<GeneratedFormProps> = ({ form }) => {
  // Initialize form values with empty strings or default values
  const [formValues, setFormValues] = React.useState<Record<string, any>>(
    form.fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.type === 'checkbox' ? false : ''
    }), {})
  );

  const handleChange = (field: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Generated form values:', formValues);
  };

  if (!form.fields.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <span>No form generated yet.</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-8 flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold mb-2 text-primary">{form.form_name}</h2>
      {form.fields.map((field) => {
        const fieldValue = formValues[field.name] ?? '';
        
        return (
          <FormFieldRenderer
            key={field.name}
            id={field.name}
            name={field.name}
            label={field.name}
            type={field.type}
            value={fieldValue}
            onChange={(value) => handleChange(field.name, value)}
            required={field.required}
            placeholder={field.placeholder}
            options={field.type === 'dropdown' || field.type === 'radio' ? field.options : undefined}
            className="w-full"
          />
        );
      })}
      <Button type="submit" variant="primary" size="md">
        Submit
      </Button>
    </form>
  );
};

export default GeneratedForm;
