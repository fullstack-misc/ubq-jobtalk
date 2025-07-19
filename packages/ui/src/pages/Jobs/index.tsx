import { fr } from 'date-fns/locale';
import { formatDistanceToNow, parseISO } from 'date-fns';
import useJobsData from '../../hooks/api/useJobsData';
import CustomError from '../../components/CustomError';
import Loader from '../../components/Loader';
import JobCard from '../../components/JobCard';
import formatNumber from '../../utils/format-number';

import { capitalizeWord } from '../../utils/capitalize-word.utils';
import { getFormattedContract } from '../../helpers/formatters/get-formatted-contract.helper';
import { getFormattedJob } from '../../helpers/formatters/get-formatted-job.helper';
import { getFormattedRemoteClass } from '../../helpers/formatters/get-formatted-remote-class.helper';
import { getFormattedRemote } from '../../helpers/formatters/get-formatted-remote.helper';
import Filters, { FiltersState } from '../../components/Filters';
import { useEffect, useMemo, useState } from 'react';
import { JobMappingFromJobTypeToUsers } from '../../mappers/job-mapping';
import { ContractMappingFromContractTypeToUsers } from '../../mappers/contract-mapping-to-users';
import { RemoteMappingFromRemoteTypeToUsers } from '../../mappers/remote-mapping';
import { JobResponseType } from '../../services/job-api/types/job-response.type';
import { sortJobsByMostRecentDate } from '../../helpers/sort-by-date.helper';
import { SortFilterMappingOption } from '../../mappers/sort-filter-mapping';
import './jobs.scss';
import Modal from '../../components/Modal';
import JobForm, { JobFormData } from '../../components/JobForm';
import useJobActions from '../../hooks/api/useJobActions';

function Jobs() {
	const { jobsData, isLoading, error } = useJobsData();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [jobs, setJobs] = useState(jobsData);
	const [filters, setFilters] = useState<FiltersState>({
		job: [],
		contract: [],
		remote: [],
		sort: SortFilterMappingOption.DATE,
	});

	useEffect(() => {
		setJobs(jobsData);

		return () => setJobs([]);
	}, [jobsData]);

	const { addJob } = useJobActions();

	const refreshJobsAfterDeletion = (id: number): void => {
		setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
	};

	const filteredJobs = useMemo((): JobResponseType[] => {
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

	if (isLoading) {
		return <Loader />;
	}
	if (error) {
		return <CustomError error={error} />;
	}

	const handleSubmit = async (data: JobFormData) => {
		await addJob(data);
		setIsModalOpen(false);
	};

	return (
		<>
			{isModalOpen && (
				<Modal onClose={() => setIsModalOpen(false)}>
					<JobForm isEdit={false} onSubmit={handleSubmit} onClose={() => setIsModalOpen(false)} />
				</Modal>
			)}
			<div className="job-list__header">
				<h1>Les jobs</h1>
				<div>
					<button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
						Ajouter une offre
					</button>
				</div>
			</div>
			<Filters filters={filters} onChange={setFilters} />
			<ul className="job-list">
				{filteredJobs.map((job) => (
					<li key={`${job.jobType}-${job.id}`}>
						<JobCard
							{...job}
							formattedJob={getFormattedJob(job.jobType)}
							formattedContract={getFormattedContract(job.contractType)}
							formattedNumber={formatNumber(job.salary)}
							formattedRemote={getFormattedRemote(job.remoteType)}
							remoteClass={getFormattedRemoteClass(job.remoteType)}
							timeAgo={capitalizeWord(
								formatDistanceToNow(parseISO(job.createdAt), { addSuffix: true, locale: fr }),
							)}
							refreshJobs={refreshJobsAfterDeletion}
						/>
					</li>
				))}
			</ul>
		</>
	);
}

export default Jobs;
