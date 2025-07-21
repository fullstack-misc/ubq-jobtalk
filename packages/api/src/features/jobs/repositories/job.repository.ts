import { JobRepositoryInterface } from '../interfaces/job-repository.interface';
import { db } from '../../../../db/db';
import { Job } from '../models/job.model';
import { JobDto } from '../dtos/in/job.dto';

export const jobRepository: JobRepositoryInterface = {
	addJob: async (job: Job): Promise<void> => {
		db.data.jobs.push(job);
		await db.write();
	},
	deleteByIndex: async (index: number): Promise<void> => {
		db.data.jobs.splice(index, 1);
		await db.write();
	},
	editJob: async (job: Job, data: Partial<JobDto>): Promise<void> => {
		Object.assign(job, data);
		await db.write();
	},
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
