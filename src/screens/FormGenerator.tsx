import React, { useState } from 'react';
import TextArea from '../components/TextArea';
import Button from '../components/Button';

interface FormGeneratorProps { 
    onSubmit: (userInput: string) => void;
    isLoading: boolean;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ onSubmit, isLoading }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(value);
    };

    return (
        <div className="py-8">
            <form
                onSubmit={handleSubmit}
                className="w-full py-4 flex flex-col gap-6"
            >
                <TextArea
                    value={value}
                    onChange={setValue}
                    placeholder={"e.g. Create a Employee Survey application/Form to help me collect the employee data like Employee Name, Employee Id, Employee Gender, Employee Date of Birth..."}
                    label="Ask what kind of form you want to generate"
                    required
                    className=""
                />
                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={value.trim().length === 0 || isLoading}
                >
                    {isLoading ? 'Generating...' : 'Generate Form'}
                </Button>
            </form>
        </div>
    );
};

export default FormGenerator;
