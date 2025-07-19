import { Request, Response } from 'express';
import { jobService } from '../services/job-service/job.service';

export const list = (request: Request, response: Response): void => {
	try {
		const data = jobService.getAll();
		if (data.length === 0) {
			response.status(404).json({ message: 'No jobs found' });
			return;
		}

		response.status(200).json(data);
	} catch (error) {
		console.error('Error retrieving jobs:', error);
		response.status(500).json({ error: 'Failed to retrieve jobs' });
	}
};
