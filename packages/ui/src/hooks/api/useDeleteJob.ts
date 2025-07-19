import { useState } from 'react';
import { deleteJobById } from '../../services/job-api/delete-job-by-id.service';

export function useDeleteJob() {
	const [isDeleting, setIsDeleting] = useState(false);
	const [deleteJobError, setDeleteJobError] = useState<null | string>(null);

	const deleteJob = async (id: number) => {
		setIsDeleting(true);
		setDeleteJobError(null);

		try {
			await deleteJobById(id);
		} catch (err) {
			setDeleteJobError(err instanceof Error ? err.message : 'Une erreur est survenue.');
		} finally {
			setIsDeleting(false);
		}
	};

	return { deleteJob, isDeleting, deleteJobError };
}
