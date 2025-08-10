import type { DynamicForm, FormRecord } from "./types";

const BASE_URL = 'http://localhost:8080';


export async function sendFormDescription(description: string): Promise<DynamicForm | string> {
    try {
        const response = await fetch(`${BASE_URL}/api/forms/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formInput: description }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return errorText;
        }

        const formResponse = await response.json();
        return formResponse.data;
    } catch (error: any) {
        return error?.message || 'Unknown error';
    }
}

export async function getForms(): Promise<DynamicForm[] | string> {
    try {
        const response = await fetch(`${BASE_URL}/api/forms`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            return errorText;
        }

        const data = await response.json();
        return data.data;
    } catch (error: any) {
        return error?.message || 'Unknown error';
    }
}


export async function saveSubmission(formId: number, formData: { id: number; value: string }[]): Promise<FormRecord | string> {
    try {
        // Convert array of {id, value} to Record<number, string>
        const formDataMap = formData.reduce<Record<number, string>>((acc, { id, value }) => {
            acc[id] = value;
            return acc;
        }, {});

        const response = await fetch(`${BASE_URL}/api/forms/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                form_id: formId, 
                form_data: formDataMap 
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return errorText;
        }

        const formResponse = await response.json();
        return formResponse.data;
    } catch (error: any) {
        return error?.message || 'Unknown error';
    }
}


export async function getFormRecords(formId: number, searchTerm?: string): Promise<FormRecord | string> {
    try {
        const url = new URL(`${BASE_URL}/api/forms/${formId}/submissions`);
        if (searchTerm) {
            url.searchParams.append('searchTerm', searchTerm);
        }
        
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            return errorText;
        }

        const data = await response.json();
        return data.data;
    } catch (error: any) {
        return error?.message || 'Unknown error';
    }
}