import { JobRepositoryInterface } from '../interfaces/job-repository.interface';
import { db } from '../../../../db/db';
import { Job } from '../models/job.model';

export const jobRepository: JobRepositoryInterface = {
	getAll: () => {
		return (db.data.jobs || []) as Job[];
	},
	getById: (id: number): undefined | Job => {
		return !db.data.jobs ? undefined : (db.data.jobs as Job[]).find((job) => job.id === id);
	},
	getIndexById: (id: number): number => {
		return !db.data.jobs ? -1 : (db.data.jobs as Job[]).findIndex((job) => job.id === id);
	},
};
