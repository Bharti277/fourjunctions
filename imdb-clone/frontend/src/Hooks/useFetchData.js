import { useState, useEffect } from "react";
import { instance } from "../utils/api";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  const fetchData = async () => {
    try {
      const res = await instance.get(url);
      setData(res.data.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, data, isError };
};

export default useFetchData;
