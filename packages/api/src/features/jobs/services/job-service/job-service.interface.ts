import { Job } from '../../models/job.model';
import { JobStatistics } from '../../dtos/out/statistics';
import { JobDto } from '../../dtos/in/job.dto';

export interface JobServiceInterface {
	addJob(job: Job): Promise<void>;
	deleteByIndex(index: number): Promise<void>;
	editJob(job: Job, data: Partial<JobDto>): Promise<void>;
	getAll(): Job[];
	getById(id: number): Job | undefined;
	getIndexById(id: number): number;
	getStatistics(jobs: Job[]): JobStatistics;
	isIdParameterValid(id: string): boolean;
}
