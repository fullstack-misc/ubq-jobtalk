import useJobsData from '../../hooks/api/useJobsData';
import CustomError from '../../../core/components/CustomError';
import Loader from '../../../core/components/Loader';

import Filters from '../../components/Filters';
import { useEffect, useState } from 'react';
import { SortFilterMappingOption } from '../../../core/mappers/sort-filter-mapping';
import './jobs.scss';
import Modal from '../../components/Modal';
import JobForm, { JobFormData } from '../../components/JobForm';
import useJobActions from '../../hooks/api/useJobActions';
import JobList from '../../components/JobList';
import useFilteredJobs from '../../hooks/jobs/useFilteredJobs';
import { FiltersState } from '../../components/Filters/FilterTags';

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
	const filteredJobs = useFilteredJobs(jobs, filters);

	const refreshJobsAfterDeletion = (id: number): void => {
		setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
	};

	const handleSubmit = async (data: JobFormData) => {
		await addJob(data);
		setIsModalOpen(false);
	};

	if (isLoading) {
		return <Loader />;
	}
	if (error) {
		return <CustomError error={error} />;
	}

	return (
		<>
			<div className="job-list__header">
				<h1>Les jobs</h1>
				<div>
					<button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
						Ajouter une offre
					</button>
				</div>
			</div>
			<Filters filters={filters} onChange={setFilters} />
			<JobList jobs={filteredJobs} refreshJobsAfterDeletion={refreshJobsAfterDeletion} />

			{isModalOpen && (
				<Modal onClose={() => setIsModalOpen(false)}>
					<JobForm isEdit={false} onSubmit={handleSubmit} onClose={() => setIsModalOpen(false)} />
				</Modal>
			)}
		</>
	);
}

export default Jobs;
