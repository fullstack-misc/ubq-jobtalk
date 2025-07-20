import { useState } from 'react';

import { JobFormData } from '../../components/JobForm';
import { postJob } from '../../services/job-api/post-job.service';
import { toast } from 'react-toastify';
import { patchJob } from '../../services/job-api/patch-job-by-id.service';
import { deleteJobById } from '../../services/job-api/delete-job-by-id.service';

function useJobActions() {
	const [isLoadingAction, setIsLoadingAction] = useState(false);
	const [error, setError] = useState<null | string>(null);

	const addJob = async (data: JobFormData) => {
		try {
			setIsLoadingAction(true);
			setError(null);
			await postJob(data);
			toast.success('Poste ajouté avec succès !');
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Une erreur est survenue.');
			toast.error("Erreur lors de l'ajout du poste.");
		} finally {
			setIsLoadingAction(false);
		}
	};

	const updateJob = async (id: number, data: JobFormData) => {
		try {
			setIsLoadingAction(true);
			setError(null);
			await patchJob(id, data);
			toast.success('Poste mis à jour avec succès !');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
			toast.error('Erreur lors de la mise à jour du poste.');
		} finally {
			setIsLoadingAction(false);
		}
	};

	const deleteJob = async (id: number) => {
		setIsLoadingAction(true);
		setError(null);

		try {
			await deleteJobById(id);
			toast.success('Poste supprimé avec succès !');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
			toast.error('Erreur lors de la suppression du poste.');
			throw err;
		} finally {
			setIsLoadingAction(false);
		}
	};

	return {
		addJob,
		updateJob,
		deleteJob,
		isLoadingAction,
		error,
	};
}

export default useJobActions;
