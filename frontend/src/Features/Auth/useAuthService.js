import axios from "axios";
import { useState } from "react";
const apiURL = process.env.REACT_APP_API_AUTH;

const useAuthService = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authenticate = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(apiURL, values);
      console.log(response);
      const data = response.data;
      setLoading(false);

      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  return { authenticate, isLoading, error };
};

export default useAuthService;
