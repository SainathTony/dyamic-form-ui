import React from 'react';
import Button from '../components/Button';
import type { DynamicForm } from '../services/types';
import { FormFieldRenderer } from '../components/form-fields';
import { useNavigate } from 'react-router-dom';

interface GeneratedFormProps {
  form: DynamicForm;
  onSubmit: (formId: number, formData: { id: number; value: string }[]) => void;
}

const GeneratedForm: React.FC<GeneratedFormProps> = ({ form, onSubmit }) => {
  const navigate = useNavigate();
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

    // Create an array of { id, value } objects
    const formData = form.fields.map(field => {
      const fieldValue = formValues[field.name];
      
      // Convert the value to string, handling different value types
      let value = '';
      if (fieldValue !== undefined && fieldValue !== null) {
        if (field.type === 'checkbox') {
          value = fieldValue ? 'true' : 'false';
        } else {
          value = String(fieldValue);
        }
      }
      
      return {
        id: field.id,
        value: value
      };
    });

    console.log('Form data to submit:', formData);

    // Call the parent's onSubmit with the formatted data
    onSubmit(form.id, formData);
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
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-bold mb-2 text-primary">{form.form_name}</h2>
        <Button variant="secondary" size="md" onClick={() => navigate(`${form.id}/records`)}>
          View Records
        </Button>
      </div>
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
