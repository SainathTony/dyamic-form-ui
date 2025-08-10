import React from 'react';
import type { FormField } from '../../types/form';
import TextField from './TextField';
import NumberField from './NumberField';
import DateField from './DateField';
import EmailField from './EmailField';
import DropdownField from './DropdownField';
import RadioField from './RadioField';
import CheckboxField from './CheckboxField';
import TextArea from '../TextArea';

const FormFieldRenderer: React.FC<FormField> = (props) => {
  const { type } = props;

  switch (type) {
    case 'text':
      return <TextField {...props} />;
    case 'number':
      return <NumberField {...props} />;
    case 'date':
      return <DateField {...props} />;
    case 'email':
      return <EmailField {...props} />;
    case 'dropdown':
      return <DropdownField {...props} />;
    case 'radio':
      return <RadioField {...props} />;
    case 'checkbox':
      return <CheckboxField {...props} />;
    case 'textarea':
      return (
        <div className="mb-4">
          <TextArea
            label={props.label}
            value={props.value || ''}
            onChange={props.onChange}
            placeholder={props.placeholder || ''}
            required={props.required || false}
            className={props.className || ''}
          />
        </div>
      );
    default:
      return <TextField {...props} />;
  }
};

export default FormFieldRenderer;
