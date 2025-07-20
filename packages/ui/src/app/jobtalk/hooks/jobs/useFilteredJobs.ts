import { JobResponseType } from '../../services/job-api/types/job-response.type';
import { FiltersState } from '../../components/Filters/FilterTags';
import { useMemo } from 'react';
import { JobMappingFromJobTypeToUsers } from '../../../core/mappers/job-mapping';
import { ContractMappingFromContractTypeToUsers } from '../../../core/mappers/contract-mapping-to-users';
import { RemoteMappingFromRemoteTypeToUsers } from '../../../core/mappers/remote-mapping';
import { SortFilterMappingOption } from '../../../core/mappers/sort-filter-mapping';
import { sortJobsByMostRecentDate } from '../../../core/helpers/sort-by-date.helper';

function useFilteredJobs(jobs: JobResponseType[], filters: FiltersState): JobResponseType[] {
	return useMemo((): JobResponseType[] => {
		if (!jobs) return [];

		let result = [...jobs];

		if (filters.job.length > 0) {
			result = result.filter((job) =>
				filters.job.includes(JobMappingFromJobTypeToUsers[job.jobType]),
			);
		}
		if (filters.contract.length > 0) {
			result = result.filter((job) =>
				filters.contract.includes(ContractMappingFromContractTypeToUsers[job.contractType]),
			);
		}
		if (filters.remote.length > 0) {
			result = result.filter((job) =>
				filters.remote.includes(RemoteMappingFromRemoteTypeToUsers[job.remoteType]),
			);
		}

		if (filters.sort === SortFilterMappingOption.DATE) {
			result = sortJobsByMostRecentDate(result);
		} else if (filters.sort === SortFilterMappingOption.SALARY) {
			result = result.sort((job1, job2) => job2.salary - job1.salary);
		}

		return result;
	}, [jobs, filters]);
}

export default useFilteredJobs;
