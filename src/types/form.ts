export type FormFieldType = 'text' | 'number' | 'date' | 'email' | 'dropdown' | 'radio' | 'checkbox' | 'textarea';

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
}
