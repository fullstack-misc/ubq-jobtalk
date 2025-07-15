import { useState } from 'react';

import JobForm, { JobFormData } from '../JobForm';
import { useDeleteJob } from '../../hooks/api/useDeleteJob';

import './job-card.scss';
import Modal from '../Modal';
import { JobResponseType } from '../../services/job-api/types/job-response.type';
import useJobActions from '../../hooks/api/useJobActions';

interface JobCardProps extends JobResponseType {
	id: number;
	companyName: string;
	location: string;
	formattedContract: string;
	formattedJob: string;
	formattedNumber: string;
	formattedRemote: string;
	remoteClass: string;
	timeAgo: string;
	refreshJobs: (id: number) => void;
}

function JobCard({
	id,
	companyName,
	location,
	jobType,
	salary,
	remoteType,
	contractType,
	formattedContract,
	formattedJob,
	formattedNumber,
	formattedRemote,
	remoteClass,
	timeAgo,
	refreshJobs,
}: JobCardProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { updateJob } = useJobActions();

	const { deleteJob } = useDeleteJob();

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	const handleSubmit = async (data: JobFormData) => {
		await updateJob(id, data);
		handleCloseModal();
	};

	const handleDelete = async () => {
		try {
			await deleteJob(id);
			handleCloseModal();
			refreshJobs(id);
		} catch (error) {
			console.error('Failed to delete job', error);
		}
	};

	return (
		<>
			<article className="job-card">
				<div className="job-card__body">
					<div className="job-card__body__logo">
						<span className="job-card__body__logo__letter">
							{!companyName ? '' : companyName[0].toUpperCase()}
						</span>
					</div>
					<div className="job-card__body__details">
						<p>
							<span className="job-card__body__details__job">{formattedJob}</span>
							<span className={remoteClass}>{formattedRemote}</span>
						</p>
						<p className="job-card__body__details__company">
							{companyName} - {location}
							<span className="job-card__body__details__dash"></span>
							<span>{formattedContract}</span>
						</p>
					</div>
				</div>
				<div className="job-card__info">
					<div className="job-card__info__details">
						<p>
							Salaire : <span className="job-card__info__details__salary">{formattedNumber}</span>
						</p>
						<p className="job-card__body__details__time">{timeAgo}</p>
					</div>
					<div>
						<button className="btn btn-secondary" onClick={handleOpenModal}>
							Modifier
						</button>
					</div>
				</div>
			</article>

			{isModalOpen && (
				<div className="modal-overlay">
					<div className="modal-content">
						{isModalOpen && (
							<Modal onClose={() => setIsModalOpen(false)}>
								<JobForm
									isEdit={true}
									onSubmit={handleSubmit}
									onDelete={handleDelete}
									onClose={handleCloseModal}
									defaultValues={{
										jobType,
										companyName,
										location,
										contractType,
										salary,
										remoteType,
									}}
								/>
							</Modal>
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default JobCard;
