import { ContractType, JobType } from '../../types';
import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const JobStatisticsSchema = z
	.object({
		averageSalary: z.number().nullable(),
		mostCommonContractType: z.enum(ContractType).nullable(),
		mostCommonJobTitle: z.enum(JobType).nullable(),
		offersPerCity: z.record(z.string(), z.number()).nullable(),
	})
	.openapi('JobStatistics');

export type JobStatistics = z.infer<typeof JobStatisticsSchema>;
