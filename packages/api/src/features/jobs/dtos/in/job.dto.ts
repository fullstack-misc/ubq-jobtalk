import { z } from 'zod';
import { ContractType, JobType, RemoteType } from '../../types';

export const JobSchema = z.object({
	companyName: z.string(),
	jobType: z.enum(JobType),
	contractType: z.enum(ContractType),
	location: z.string(),
	salary: z.number(),
	remoteType: z.enum(RemoteType),
});

export type JobDto = z.infer<typeof JobSchema>;
