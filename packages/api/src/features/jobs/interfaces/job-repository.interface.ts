import { Job } from '../models/job.model';

export interface JobRepositoryInterface {
	getAll(): Job[];
	getById(id: number): undefined | Job;
	getIndexById(id: number): number;
}
