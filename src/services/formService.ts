import type { DynamicForm } from "./types";

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
