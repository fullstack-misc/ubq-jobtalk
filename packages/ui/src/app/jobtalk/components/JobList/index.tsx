import './job-list.scss';
import { JobResponseType } from '../../services/job-api/types/job-response.type';
import JobCard from './JobCard';
import { getFormattedJob } from '../../../core/helpers/formatters/get-formatted-job.helper';
import { getFormattedContract } from '../../../core/helpers/formatters/get-formatted-contract.helper';
import formatNumber from '../../../shared/utils/format-number';
import { getFormattedRemote } from '../../../core/helpers/formatters/get-formatted-remote.helper';
import { getFormattedRemoteClass } from '../../../core/helpers/formatters/get-formatted-remote-class.helper';
import { capitalizeWord } from '../../../shared/utils/capitalize-word.utils';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

type JobListProps = {
	jobs: JobResponseType[];
	refreshJobsAfterUpdate: (id: number, updatedJob: JobResponseType) => void;
	refreshJobsAfterDeletion: (id: number) => void;
};

function JobList({ jobs,refreshJobsAfterUpdate, refreshJobsAfterDeletion }: JobListProps) {
	return (
		<ul className="job-list">
			{jobs.map((job) => (
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
						refreshJobsAfterUpdate={refreshJobsAfterUpdate}
						refreshJobsAfterDeletion={refreshJobsAfterDeletion}
					/>
				</li>
			))}
		</ul>
	);
}

export default JobList;
