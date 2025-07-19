import { db } from '../../../../db/db';

export function getJobId(): number {
	return db.data.jobs.length === 0 ? 1 : Math.max(...db.data.jobs.map((job) => job.id)) + 1;
}
