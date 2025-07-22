import { JSONFilePreset } from "lowdb/node";
import jobs from "./jobs.json";
import { Job } from '../src/features/jobs/models/job.model';

export interface DBData {
	jobs: Job[];
}

const defaultData:DBData = { jobs: jobs as Job[] };

let db: Awaited<ReturnType<typeof JSONFilePreset<DBData>>>;
(async () => {
	db = await JSONFilePreset<DBData>('db.json', defaultData);
})();

export { db };
