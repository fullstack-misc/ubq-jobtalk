import { JobType, JobTypeType } from '../../../jobtalk/services/job-api/types/job-type.type';

export function getFormattedJob(job: JobTypeType): string {
	switch (job) {
		case JobType.back:
			return 'Dev Backend';
		case JobType.front:
			return 'Dev Frontend';
		case JobType.fullstack:
			return 'Dev Fullstack';
		default:
			return 'Projet / Product Management';
	}
}
