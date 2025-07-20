import { JobTypeType } from './job-type.type';
import { ContractTypeType } from './contract-type.type';

export type JobStatisticsResponseType = {
	averageSalary: null | number;
	mostCommonContractType: null | ContractTypeType;
	mostCommonJobTitle: null | JobTypeType;
	offersPerCity: null | Record<string, number>;
};
