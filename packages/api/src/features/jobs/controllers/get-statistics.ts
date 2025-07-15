import { Request, Response } from 'express';
import { jobService } from '../services/job-service/job.service';

export const getStatistics = (req: Request, res: Response): void => {
	const data = jobService.getAll();
	if (data.length === 0) {
		res.status(404).json({ message: 'No jobs found' });
		return;
	}

	const statistics = jobService.getStatistics(data);
	res.status(200).json(statistics);
};
