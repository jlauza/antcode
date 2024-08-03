import { message } from "antd";
import axios from "axios";
import { useState } from "react";
const apiURL = process.env.REACT_APP_API_AUTH;

const useAuthService = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authenticate = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(apiURL, values);

      const data = response.data;

      setLoading(false);

      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  const unauthenticate = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${apiURL}/logout`);
      console.log(res);
      return res;
      setLoading(false);
    } catch (error) {
      console.error("Something went wrong: ", error);
      message.error(error);
    }
  };

  return { authenticate, unauthenticate, isLoading, error };
};

export default useAuthService;
