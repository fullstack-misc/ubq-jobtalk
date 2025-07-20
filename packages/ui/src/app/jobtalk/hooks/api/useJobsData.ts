import { useEffect, useState } from 'react';
import { JobResponseType } from '../../services/job-api/types/job-response.type';
import { getJobs } from '../../services/job-api/get-jobs.service';

function useJobsData() {
	const [jobsData, setJobsData] = useState<JobResponseType[]>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		const controller = new AbortController();
		let isCancelled = false;

		const fetchJobs = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const data = await getJobs();
				if (!isCancelled) {
					setJobsData(data);
				}
			} catch (err) {
				if (!isCancelled) {
					setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
				}
			} finally {
				if (!isCancelled) {
					setIsLoading(false);
				}
			}
		};

		fetchJobs();

		return () => {
			isCancelled = true;
			controller.abort();
		};
	}, []);

	return {
		jobsData,
		isLoading,
		error,
	};
}

export default useJobsData;
