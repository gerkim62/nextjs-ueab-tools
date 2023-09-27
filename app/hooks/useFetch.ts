import { useState, useEffect } from "react";

function useFetch(url: string) {
  // State to store the fetched data
  const [data, setData] = useState(null);
  // State to track loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from the provided URL
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err as any);
        setLoading(false);
      }
    }

    // Call the fetchData function when the component mounts
    fetchData();
  }, [url]);

  // Return the data, loading, and error states as an object
  return { data, loading, error };
}

export default useFetch;
