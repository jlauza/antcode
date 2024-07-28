import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const apiURL = process.env.REACT_APP_API_AUTH;
const apiURLlogout = process.env.REACT_APP_API_AUTH_LOGOUT;

const useAuthService = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const unauthenticate = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.get(apiURLlogout);
      setLoading(false);

      navigate("/login");
    } catch (error) {
      console.error("Something went wrong: ", error);
      message.error(error);
    }
  };

  return { authenticate, unauthenticate, isLoading, error };
};

export default useAuthService;
