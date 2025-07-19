import { JobDto } from '../dtos/in/job.dto';
import { getJobId } from '../services/id.service';
import { ContractType, JobType, RemoteType } from '../types';
import { capitalizeWord } from '../../../shared/utils/capitalize-word.utils';

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
			capitalizeWord(dto.companyName.trim()),
			dto.jobType,
			dto.contractType,
			capitalizeWord(dto.location.trim()),
			dto.salary,
			new Date().toISOString().split('T')[0],
			dto.remoteType,
		);
	}
}
