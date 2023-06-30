import { useState, useEffect } from "react";
import { AbortController } from "node-abort-controller";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abort = new AbortController();
        fetch(url, { signal: abort.signal })
            .then((response) => {
                if (!response.ok) {
                    throw Error("Could not fetch the requested data");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setIsLoading(false);
                setError(null);
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                    console.log("Fetch Aborted");
                } else {
                    setIsLoading(false);
                    setError(error.message);
                }
            });
        return () => abort.abort();
    }, [url]);
    return { data, isLoading, error };
};

export default useFetch;
