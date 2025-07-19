import { Request, Response } from 'express';
import { jobService } from '../services/job-service/job.service';

export const getStatistics = (request: Request, response: Response): void => {
	try {
		const data = jobService.getAll();
		if (data.length === 0) {
			response.status(404).json({ message: 'No jobs found' });
			return;
		}

		const statistics = jobService.getStatistics(data);
		response.status(200).json(statistics);
	} catch (error) {
		console.error('Error retrieving job statistics:', error);
		response.status(500).json({ error: 'Failed to retrieve job statistics' });
	}
};
