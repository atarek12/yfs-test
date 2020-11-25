import { useState, useCallback, useRef, useEffect } from 'react';

export const useFetch = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();

	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(
		async (url, method = 'GET', headers = {}, body = null) => {
			setIsLoading(true);
			const httpAbortCtrl = new AbortController();
			activeHttpRequests.current.push(httpAbortCtrl);

			try {
				const response = await fetch(url, {
					method,
					headers,
					body,
					signal: httpAbortCtrl.signal,
				});
				const responseData = await response.arrayBuffer();
				activeHttpRequests.current = activeHttpRequests.current.filter(
					(reqCtrl) => reqCtrl !== httpAbortCtrl
				);
				if (!response.ok) throw new Error(responseData.message);
				setIsLoading(false);
				return responseData;
			} catch (err) {
				setIsLoading(false);
				setError(err.message || 'Something went wrong, please try again.');
				throw err;
			}
		},
		[]
	);

	// clean up
	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
		};
	}, []);

	// handle error --> clear it
	const clearError = useCallback(() => {
		setError(null);
	}, []);

	// return
	return { isLoading, error, sendRequest, clearError };
};
