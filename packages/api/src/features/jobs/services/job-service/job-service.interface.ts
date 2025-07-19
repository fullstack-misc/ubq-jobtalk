import { Job } from '../../models/job.model';
import { JobStatistics } from '../../dtos/out/statistics';

export interface JobServiceInterface {
	getAll(): Job[];
	getById(id: number): Job | undefined;
	getIndexById(id: number): number;
	getStatistics(jobs: Job[]): JobStatistics;
	isIdParameterValid(id: string): boolean;
}
