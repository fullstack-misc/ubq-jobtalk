import { Job } from '../../models/job.model';

export interface JobServiceInterface {
	getAll(): Job[];
	getById(id: number): Job | undefined;
	getIndexById(id: number): number;
}
