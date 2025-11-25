import { useState } from 'react';

const useForm = <T extends Object>(initialState: T) => {
  const [values, setValues] = useState(initialState);
  const [formError, setFormError] = useState('');

  const handleInputChange = (target: EventTarget & HTMLInputElement | EventTarget & HTMLSelectElement | EventTarget & HTMLTextAreaElement | { name: string, value: unknown }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const reset = () => {
    setValues(initialState);
  };

  const updateValues = (newValues: Partial<T>) => {
    setValues({
      ...values,
      ...newValues,
    });
  };

  return {
    ...values,
    handleInputChange,
    reset,
    formError,
    setFormError,
    updateValues,
  };
};

export default useForm;
