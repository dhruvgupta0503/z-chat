import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          ...options,
          credentials: 'include', // Ensure credentials are included
        });
        const result = await response.json();
        
        if (response.ok) {
          setData(result);
        } else {
          // Handle 401 Unauthorized specifically
          if (response.status === 401) {
            setError('Unauthorized access - perhaps your token has expired');
            // Optionally, trigger a token refresh mechanism here
          } else {
            setError(result);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useFetch;
