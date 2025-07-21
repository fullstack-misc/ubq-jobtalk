import { Request, Response } from 'express';
import { Job } from '../models/job.model';
import { jobService } from '../services/job-service/job.service';

/**
 * @openapi
 * /jobs:
 *   post:
 *     summary: Add a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *       500:
 *         description: Failed to save job
 */
export const add = async (request: Request, response: Response) => {
	try {
		await jobService.addJob(Job.fromDto(request.body));

		response.status(201).send();
	} catch (error) {
		console.error('Error writing to database:', error);
		response.status(500).json({ error: 'Failed to save job' });
	}
};
