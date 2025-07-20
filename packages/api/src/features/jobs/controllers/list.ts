import { Request, Response } from 'express';
import { jobService } from '../services/job-service/job.service';

/**
 * @openapi
 * /jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       404:
 *         description: No jobs found
 *       500:
 *         description: Failed to retrieve jobs
 */
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
