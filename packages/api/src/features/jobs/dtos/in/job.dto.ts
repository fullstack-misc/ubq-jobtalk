import { z } from 'zod';
import { ContractType, JobType, RemoteType } from '../../types';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const JobSchema = z
	.object({
		companyName: z.string().trim().min(1),
		jobType: z.enum(JobType),
		contractType: z.enum(ContractType),
		location: z.string().trim().min(1),
		salary: z.number().gte(0),
		remoteType: z.enum(RemoteType),
	})
	.openapi('Job');

export type JobDto = z.infer<typeof JobSchema>;
