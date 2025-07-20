import jobApi from './job-api';
import { JobStatisticsResponseType } from './types';

export async function getJobStatistics(): Promise<JobStatisticsResponseType> {
	const response = await jobApi.get<JobStatisticsResponseType>('/jobs/stats');
	return response.data;
}
