import { JobResponseType } from './types/job-response.type';
import jobApi from './job-api';

export async function getJobs(options: { signal?: AbortSignal }): Promise<JobResponseType[]> {
	const response = await jobApi.get<JobResponseType[]>('/jobs', { signal: options?.signal });
	return response.data;
}
