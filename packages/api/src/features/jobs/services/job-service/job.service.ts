import { jobRepository } from '../../repositories/job.repository';
import { Job } from '../../models/job.model';
import { JobServiceInterface } from './job-service.interface';
import { JobStatistics } from '../../dtos/out/statistics';
import { ContractType, JobType } from '../../types';

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
	getStatistics: function (jobs: Job[]): JobStatistics {
		if (jobs.length === 0) {
			return {
				averageSalary: null,
				mostCommonContractType: null,
				mostCommonJobTitle: null,
				offersPerCity: null,
			};
		}

		const offersPerCity: Record<string, number> = {};
		const averageSalary: number = Math.round(
			jobs.reduce((sum, job) => sum + job.salary, 0) / jobs.length,
		);

		const contractTypeCount = new Map<string, number>();
		let maxContractType: [number, ContractType] = [0, ContractType.cdi];

		const jobTitleCount = new Map<string, number>();
		let maxJobTitle: [number, JobType] = [0, JobType.fullstack];

		for (const job of jobs) {
			offersPerCity[job.location] = (offersPerCity[job.location] ?? 0) + 1;

			let contractCount = jobTitleCount.get(job.jobType) ?? 0;
			contractTypeCount.set(job.contractType, ++contractCount);
			if (maxContractType[0] < contractCount) {
				maxContractType = [contractCount, job.contractType];
			}

			let titleCount = jobTitleCount.get(job.jobType) ?? 0;
			jobTitleCount.set(job.jobType, ++titleCount);
			if (maxJobTitle[0] < titleCount) {
				maxJobTitle = [titleCount, job.jobType];
			}
		}

		return {
			averageSalary: averageSalary,
			mostCommonContractType: maxContractType[1],
			mostCommonJobTitle: maxJobTitle[1],
			offersPerCity: offersPerCity,
		};
	},
};
