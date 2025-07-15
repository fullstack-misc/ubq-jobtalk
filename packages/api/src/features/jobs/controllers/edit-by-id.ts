import { db } from '../../../../db/db';
import { Request, Response } from 'express';
import { jobService } from '../services/job-service/job.service';

export const editById = async (req: Request, res: Response): Promise<void> => {
	const id: null | number = Number.isNaN(Number(req.params.id)) ? null : Number(req.params.id);
	if (!id) {
		res.status(400).json({ message: 'Invalid job ID' });
		return;
	}

	const job = jobService.getById(id);
	if (!job) {
		res.status(400).send();
		return;
	}

	Object.assign(job, req.body);
	await db.write();

	res.status(204).json();
};
