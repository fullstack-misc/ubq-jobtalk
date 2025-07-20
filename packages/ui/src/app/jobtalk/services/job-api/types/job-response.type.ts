import type { ContractTypeType } from './contract-type.type';
import type { JobTypeType } from './job-type.type';
import type { RemoteTypeType } from './remote-type.type';

export type JobResponseType = {
	id: number;
	companyName: string;
	jobType: JobTypeType;
	contractType: ContractTypeType;
	location: string;
	salary: number;
	createdAt: string;
	remoteType: RemoteTypeType;
};
