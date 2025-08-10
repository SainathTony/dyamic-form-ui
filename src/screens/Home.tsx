import React, { useState, useEffect } from 'react';
import FormGenerator from './FormGenerator';
import GeneratedForm from './GeneratedForm';
import FormList from './FormList';
import { getForms, saveSubmission, sendFormDescription } from '../services/formService';
import type { DynamicForm } from '../services/types';
import { toast } from 'react-hot-toast';

const Home = () => {
  const [forms, setForms] = useState<DynamicForm[]>([]);
  const [formsLoading, setFormsLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState<DynamicForm | null>(null);
  const [isFormGenerating, setIsFormGenerating] = useState(false);

  useEffect(() => {
    setFormsLoading(true);
    getForms().then((res) => {
      if (typeof res === 'string') {
        console.error('Error fetching forms:', res);
        return;
      }
      setForms(res);
    }).finally(() => {
      setFormsLoading(false);
    });
  }, []);

  const handlePromptSubmit = (userInput: string) => {
    setIsFormGenerating(true);
    sendFormDescription(userInput).then((res) => {
      if (typeof res === 'string') {
        console.error('Error fetching forms:', res);
        return;
      }
      setSelectedForm(res);
      console.log(res);
    }).finally(() => {
      setIsFormGenerating(false);
    })
  };

  const [submittedFormId, setSubmittedFormId] = useState<number | null>(null);

  const handleFormSubmit = (formId: number, formData: { id: number; value: string }[]) => {
    const submissionPromise = saveSubmission(formId, formData);
    
    toast.promise(submissionPromise, {
      loading: 'Submitting form...',
      success: (res) => {
        if (typeof res === 'string') {
          throw new Error(res);
        }
        setSubmittedFormId(formId);
        return 'Form submitted successfully!';
      },
      error: (err) => {
        console.error('Error in form submission:', err);
        return err.message || 'Failed to submit form. Please try again.';
      },
    });
  };

  // Reset the form when a new form is selected
  useEffect(() => {
    if (selectedForm) {
      setSubmittedFormId(null);
    }
  }, [selectedForm]);

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
      {/* Left Container - Form Generator and List */}
      <div className={`p-4 md:p-6 overflow-y-auto ${selectedForm ? 'flex-1 md:w-1/2' : 'w-full max-w-4xl mx-auto'}`}>
        <div className="p-4 md:p-6 w-full">
          <FormGenerator onSubmit={handlePromptSubmit} isLoading={isFormGenerating} />
          <FormList forms={forms} loading={formsLoading} onFormSelect={setSelectedForm} selectedForm={selectedForm} />
        </div>
      </div>

      {/* Right Container - Generated Form */}
      {selectedForm && (
        <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800 md:border-l border-gray-200 dark:border-gray-700">
          <GeneratedForm 
            key={submittedFormId === selectedForm.id ? `form-${Date.now()}` : 'form'}
            form={selectedForm} 
            onSubmit={handleFormSubmit} 
          />
        </div>
      )}
    </div>
  );
};

export default Home;
