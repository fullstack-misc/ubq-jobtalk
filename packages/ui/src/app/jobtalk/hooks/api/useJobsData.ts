import { useCallback, useEffect, useRef, useState } from 'react';
import { JobResponseType } from '../../services/job-api/types/job-response.type';
import { getJobs } from '../../services/job-api/get-jobs.service';
import { toast } from 'react-toastify';

function useJobsData() {
	const [jobsData, setJobsData] = useState<JobResponseType[]>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<null | string>(null);

	const aborControllerRef = useRef<AbortController | null>(null);

	const fetchJobs = useCallback(async () => {
		aborControllerRef.current?.abort();
		const abortController = new AbortController();
		aborControllerRef.current = abortController;

		setIsLoading(true);
		setError(null);

		try {
			const data = await getJobs({ signal: abortController.signal });
			setJobsData(data);
		} catch (err) {
			if (!abortController.signal.aborted) {
				setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
				toast.error("Erreur lors de la récupération des offres d'emploi.");
			}
		} finally {
			if (!abortController.signal.aborted) {
				setIsLoading(false);
			}
		}
	}, []);

	useEffect(() => {
		fetchJobs();

		return () => aborControllerRef.current?.abort(); // cleanup on unmount
	}, [fetchJobs]);

	return {
		jobsData,
		isLoading,
		error,
		fetchJobs,
	};
}

export default useJobsData;
