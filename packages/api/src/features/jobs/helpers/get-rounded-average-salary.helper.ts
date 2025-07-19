import { Job } from '../models/job.model';

export function getRoundedAverageSalary(jobs: Job[]): number {
	return Math.round(jobs.reduce((sum, job) => sum + job.salary, 0) / jobs.length);
}
