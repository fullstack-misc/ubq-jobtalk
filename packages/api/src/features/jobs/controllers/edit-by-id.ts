import { db } from '../../../../db/db';
import { Request, Response } from 'express';
import { jobService } from '../services/job-service/job.service';

export const editById = async (request: Request, response: Response): Promise<void> => {
	try {
		if (!jobService.isIdParameterValid(request.params.id)) {
			response.status(400).json({ message: 'Invalid job ID' });
			return;
		}

		const job = jobService.getById(+request.params.id);
		if (!job) {
			response.status(400).send();
			return;
		}

		Object.assign(job, request.body);
		await db.write();

		response.status(204).json();
	} catch (error) {
		console.error('Error updating job:', error);
		response.status(500).json({ error: 'Failed to update job' });
	}
};
