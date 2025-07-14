import { db } from '../../../../db/db';
import { Request, Response } from 'express';
import { Job } from '../models/job.model';

export const add = async (req: Request, res: Response) => {
	db.data.jobs.push(Job.fromDto(req.body));
	await db.write();

	res.status(201).send();
};
