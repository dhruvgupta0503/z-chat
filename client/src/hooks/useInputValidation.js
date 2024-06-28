// src/hooks/useInputValidation.js
import { useState } from 'react';

const useInputValidation = (validate) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
    setError(validate(event.target.value));
  };

  return {
    value,
    error,
    handleChange,
  };
};

export default useInputValidation;
