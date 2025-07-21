import { jobRepository } from '../../repositories/job.repository';
import { Job } from '../../models/job.model';
import { JobServiceInterface } from './job-service.interface';
import { JobStatistics } from '../../dtos/out/statistics';
import { ContractType, JobType } from '../../types';
import { getRoundedAverageSalary } from '../../helpers/get-rounded-average-salary.helper.spec.ts/get-rounded-average-salary.helper';
import { db } from '../../../../../db/db';
import { JobDto } from '../../dtos/in/job.dto';

export const jobService: JobServiceInterface = {
	addJob: async (job: Job): Promise<void> => {
		await jobRepository.addJob(job);
	},
	deleteByIndex: async (index: number): Promise<void> => {
		await jobRepository.deleteByIndex(index);
	},
	editJob: async (job: Job, data: Partial<JobDto>): Promise<void> => {
		await jobRepository.editJob(job, data);
	},
	getAll: () => {
		return jobRepository.getAll();
	},
	getById: (id: number): Job | undefined => {
		return jobRepository.getById(id);
	},
	getIndexById: (id: number): number => {
		return jobRepository.getIndexById(id);
	},
	getStatistics: (jobs: Job[]): JobStatistics => {
		if (jobs.length === 0) {
			return {
				averageSalary: null,
				mostCommonContractType: null,
				mostCommonJobTitle: null,
				offersPerCity: null,
			};
		}

		const offersPerCity: Record<string, number> = {};

		const contractTypeCount = new Map<string, number>();
		let maxContractType: [number, null | ContractType] = [0, null];

		const jobTitleCount = new Map<string, number>();
		let maxJobTitle: [number, null | JobType] = [0, null];

		for (const job of jobs) {
			offersPerCity[job.location] = (offersPerCity[job.location] ?? 0) + 1;

			let contractCount = contractTypeCount.get(job.contractType) ?? 0;
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
			averageSalary: getRoundedAverageSalary(jobs),
			mostCommonContractType: maxContractType[1],
			mostCommonJobTitle: maxJobTitle[1],
			offersPerCity: Object.keys(offersPerCity).length === 0 ? null : offersPerCity,
		};
	},
	isIdParameterValid(providedId: string): boolean {
		const id = Number(providedId);

		return Number.isNaN(id) ? false : id >= 1;
	},
};
