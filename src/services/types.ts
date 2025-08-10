import type { FormFieldType } from "../types/form";

type FormField = {
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