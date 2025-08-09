import React, { useState } from 'react';
import TextArea from '../components/TextArea';
import Button from '../components/Button';

interface FormGeneratorProps { }

const FormGenerator: React.FC<FormGeneratorProps> = () => {
    const [value, setValue] = useState('');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="px-4 py-8 bg-background-light dark:bg-background-dark">
            <form
                onSubmit={handleSubmit}
                className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col gap-6"
            >
                <h2 className="text-2xl font-bold mb-2 text-primary">Generate form</h2>
                <TextArea
                    value={value}
                    onChange={setValue}
                    placeholder={"Enter information about your form. Please specify the fields you want to include in the form.\nE.g. name, designation, email, salary"}
                    label="Fields"
                    required
                    className=""
                />
                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={value.trim().length === 0}
                >
                    Generate Form
                </Button>
            </form>
        </div>
    );
};

export default FormGenerator;
