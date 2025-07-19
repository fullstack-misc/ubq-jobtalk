import { db } from '../../../../db/db';
import { Request, Response } from 'express';
import { Job } from '../models/job.model';

export const add = async (request: Request, response: Response) => {
	try {
		db.data.jobs.push(Job.fromDto(request.body));
		await db.write();

		response.status(201).send();
	} catch (error) {
		console.error('Error writing to database:', error);
		response.status(500).json({ error: 'Failed to save job' });
	}
};
