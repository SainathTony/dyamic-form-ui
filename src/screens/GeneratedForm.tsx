import React from 'react';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

interface GeneratedFormProps {
  fields: string[];
}

const GeneratedForm: React.FC<GeneratedFormProps> = ({ fields }) => {
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Generated form values:', formValues);
  };

  if (!fields.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <span>No form generated yet.</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold mb-2 text-primary">Generated Form</h2>
      {fields.map((field) => (
        <TextInput
          key={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formValues[field] || ''}
          onChange={(val) => handleChange(field, val)}
          placeholder={`Enter ${field}`}
          required
          className=""
        />
      ))}
      <Button type="submit" variant="primary" size="md">
        Submit
      </Button>
    </form>
  );
};

export default GeneratedForm;
