import { Request, Response } from 'express';
import { jobService } from '../services/job-service/job.service';

/**
 * @openapi
 * /jobs/stats:
 *   get:
 *     summary: Get job statistics
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Job statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobStatistics'
 *       500:
 *         description: Failed to retrieve job statistics
 */
export const getStatistics = (request: Request, response: Response): void => {
	try {
		const data = jobService.getAll();
		const statistics = jobService.getStatistics(data);

		response.status(200).json(statistics);
	} catch (error) {
		console.error('Error retrieving job statistics:', error);
		response.status(500).json({ error: 'Failed to retrieve job statistics' });
	}
};
