import React from 'react';

import './job-list.scss';
import { JobResponseType } from '../../services/job-api/types/job-response.type';
import JobCard from '../JobCard';
import { getFormattedJob } from '../../helpers/formatters/get-formatted-job.helper';
import { getFormattedContract } from '../../helpers/formatters/get-formatted-contract.helper';
import formatNumber from '../../utils/format-number';
import { getFormattedRemote } from '../../helpers/formatters/get-formatted-remote.helper';
import { getFormattedRemoteClass } from '../../helpers/formatters/get-formatted-remote-class.helper';
import { capitalizeWord } from '../../utils/capitalize-word.utils';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

type JobListProps = {
	jobs: JobResponseType[];
	refreshJobsAfterDeletion: (id: number) => void;
};

function JobList({jobs,refreshJobsAfterDeletion}: JobListProps) {
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
						refreshJobs={refreshJobsAfterDeletion}
					/>
				</li>
			))}
		</ul>
	);
}

export default JobList;
