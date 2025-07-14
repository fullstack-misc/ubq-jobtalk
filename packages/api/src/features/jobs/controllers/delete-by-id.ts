import { db } from '../../../../db/db';
import { Request, Response } from 'express';
import { jobService } from '../services/job-service/job.service';

export const deleteById = async (req: Request, res: Response): Promise<void> => {
	const id: number = Number.isNaN(Number(req.params.id)) ? -1 : Number(req.params.id);
	if (id < 1) {
		res.status(400).json({ error: 'Invalid job ID' });
		return;
	}

	const index = jobService.getIndexById(id);
	if (index === -1) {
		res.status(404).json({ error: 'Job not found' });
		return;
	}

	db.data.jobs.splice(index, 1);
	await db.write();

	res.status(204).send();
};
