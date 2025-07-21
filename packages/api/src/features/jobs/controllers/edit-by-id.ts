import { Request, Response } from 'express';
import { jobService } from '../services/job-service/job.service';

/**
 * @openapi
 * /jobs/{id}:
 *   patch:
 *     summary: Update a job by ID
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the job to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       204:
 *         description: Job updated successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Job not found
 *       500:
 *         description: Failed to update job
 */
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

		await jobService.editJob(job, request.body);
		response.status(204).json();
	} catch (error) {
		console.error('Error updating job:', error);
		response.status(500).json({ error: 'Failed to update job' });
	}
};
