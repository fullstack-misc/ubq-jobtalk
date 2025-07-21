import { Job } from '../models/job.model';
import { JobDto } from '../dtos/in/job.dto';

export interface JobRepositoryInterface {
	addJob(job: Job): Promise<void>;
	deleteByIndex(index: number): Promise<void>;
	editJob(job: Job, data: Partial<JobDto>): Promise<void>;
	getAll(): Job[];
	getById(id: number): undefined | Job;
	getIndexById(id: number): number;
}
