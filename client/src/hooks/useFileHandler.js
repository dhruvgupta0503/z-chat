// src/hooks/useFileHandler.js
import { useState } from 'react';

const useFileHandler = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return {
    file,
    handleFileChange,
  };
};

export default useFileHandler;
