import type { FormFieldType } from "../types/form";

type FormField = {
    id: number;
    name: string;
    type: FormFieldType;
    placeholder: string;
    required: boolean;
    options?: string[];
}

export type DynamicForm = {
    id: number;
    form_name: string;
    fields: FormField[];
    created_at: Date;
}

export type FormRecord = {
    submission_id: number;
    form_id: number;
    form_name: string;
    form_data: Record<string, string>;
    submitted_at: Date;
}