// src/hooks/useStrongPassword.js
import { useState } from 'react';

const useStrongPassword = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  const validateStrength = (password) => {
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (strongPassword.test(password)) {
      setStrength('strong');
    } else if (password.length >= 6) {
      setStrength('medium');
    } else {
      setStrength('weak');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validateStrength(event.target.value);
  };

  return {
    password,
    strength,
    handlePasswordChange,
  };
};

export default useStrongPassword;
