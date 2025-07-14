import { jobRepository } from '../../repositories/job.repository';
import { Job } from '../../models/job.model';
import { JobServiceInterface } from './job-service';

export const jobService: JobServiceInterface = {
	getAll: () => {
		return jobRepository.getAll();
	},
	getById: (id: number): Job | undefined => {
		return jobRepository.getById(id);
	},
	getIndexById: (id: number): number => {
		return jobRepository.getIndexById(id);
	},
};
