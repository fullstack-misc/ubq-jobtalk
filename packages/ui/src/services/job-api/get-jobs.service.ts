import { JobResponseType } from './types/job-response.type';
import jobApi from './job-api';

export async function getJobs(): Promise<JobResponseType[]> {
	const response = await jobApi.get<JobResponseType[]>('/jobs');
	return response.data;
}
