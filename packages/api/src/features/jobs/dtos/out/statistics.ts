import { ContractType, JobType } from '../../types';

export type JobStatistics = {
	averageSalary: null | number;
	mostCommonContractType: null | ContractType;
	mostCommonJobTitle: null | JobType;
	offersPerCity: null | Record<string, number>;
};
