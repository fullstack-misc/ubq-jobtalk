import { JobResponseType } from '../../jobtalk/services/job-api/types/job-response.type';

export function sortJobsByMostRecentDate(jobs: JobResponseType[]): JobResponseType[] {
	return jobs.sort(
		(job1, job2) => new Date(job2.createdAt).getTime() - new Date(job1.createdAt).getTime(),
	);
}
