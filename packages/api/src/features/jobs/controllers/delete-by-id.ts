import { db } from '../../../../db/db';
import { Request, Response } from 'express';
import { jobService } from '../services/job-service/job.service';

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Job deleted successfully
 *       400:
 *         description: Invalid job ID
 *       404:
 *         description: Job not found
 *       500:
 *         description: Failed to update job
 */
export const deleteById = async (request: Request, response: Response): Promise<void> => {
	try {
		if (!jobService.isIdParameterValid(request.params.id)) {
			response.status(400).json({ error: 'Invalid job ID' });
			return;
		}

		const index = jobService.getIndexById(+request.params.id);
		if (index === -1) {
			response.status(404).json({ error: 'Job not found' });
			return;
		}

		db.data.jobs.splice(index, 1);
		await db.write();

		response.status(204).send();
	} catch (error) {
		console.error('Error deleting job:', error);
		response.status(500).json({ error: 'Failed to delete job' });
	}
};
