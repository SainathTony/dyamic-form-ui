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
    const fetchForms = async () => {
      setFormsLoading(true);
      try {
        const res = await getForms();
        if (typeof res === 'string') {
          toast.error('Failed to load forms. Please try again later.');
          console.error('Error fetching forms:', res);
          return;
        }
        setForms(res);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(`Error: ${errorMessage}`);
        console.error('Error in fetchForms:', error);
      } finally {
        setFormsLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handlePromptSubmit = (userInput: string) => {
    if (!userInput.trim()) {
      toast.error('Please enter a description for the form');
      return;
    }

    setIsFormGenerating(true);
    sendFormDescription(userInput)
      .then((res) => {
        if (typeof res === 'string') {
          toast.error('Failed to generate form. Please try again.');
          console.error('Error generating form:', res);
          return;
        }
        // Add the new form to the forms list and select it
        setForms(prevForms => [res, ...prevForms]);
        setSelectedForm(res);
        toast.success('Form generated successfully!');
      })
      .catch((error) => {
        const errorMessage = error instanceof Error ? error.message : 'Failed to generate form';
        toast.error(`Error: ${errorMessage}`);
        console.error('Error in handlePromptSubmit:', error);
      })
      .finally(() => {
        setIsFormGenerating(false);
      });
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
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden h-screen">
      <div className={`h-full flex flex-col ${selectedForm ? 'w-full md:w-1/2' : 'w-full max-w-4xl mx-auto'}`}>
        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          <FormGenerator onSubmit={handlePromptSubmit} isLoading={isFormGenerating} />
          <FormList forms={forms} loading={formsLoading} onFormSelect={setSelectedForm} selectedForm={selectedForm} />
        </div>
      </div>

      {selectedForm && (
        <div className="h-full w-full md:w-1/2 flex flex-col bg-gray-50 md:border-l border-gray-200">
          <div className="p-4 md:p-6 overflow-y-auto flex-1">
            <GeneratedForm
              key={submittedFormId === selectedForm.id ? `form-${Date.now()}` : 'form'}
              form={selectedForm}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
