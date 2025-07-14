import { JobDto } from '../dtos/in/job.dto';
import { getJobId } from '../services/id.service';
import { ContractType, JobType, RemoteType } from '../types';

export class Job {
	constructor(
		public readonly id: number,
		public readonly companyName: string,
		public readonly jobType: JobType,
		public readonly contractType: ContractType,
		public readonly location: string,
		public readonly salary: number,
		public readonly createdAt: string,
		public readonly remoteType: RemoteType,
	) {}

	public static fromDto(dto: JobDto): Job {
		return new Job(
			getJobId(),
			dto.companyName,
			dto.jobType,
			dto.contractType,
			dto.location,
			dto.salary,
			new Date().toISOString().split('T')[0],
			dto.remoteType,
		);
	}
}
