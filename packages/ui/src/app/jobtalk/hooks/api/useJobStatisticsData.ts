import { JobStatisticsResponseType } from '../../services/job-api/types';
import { getJobStatistics } from '../../services/job-api/get-job-statistics.service';
import { useEffect, useState } from 'react';

function useJobStatisticsData() {
	const [jobStatistics, setJobStatistics] = useState<JobStatisticsResponseType>({
		averageSalary: null,
		mostCommonContractType: null,
		mostCommonJobTitle: null,
		offersPerCity: null,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		const controller = new AbortController();
		let isCancelled = false;

		const fetchJobStatistics = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const data = await getJobStatistics();
				if (!isCancelled) {
					setJobStatistics(data);
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

		fetchJobStatistics();

		return () => {
			isCancelled = true;
			controller.abort();
		};
	}, []);

	return {
		jobStatistics,
		isLoading,
		error,
	};
}

export default useJobStatisticsData;
