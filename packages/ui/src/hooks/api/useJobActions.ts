import { useState } from 'react';

import { JobFormData } from '../../components/JobForm';
import { postJob } from '../../services/job-api/post-job.service';
import { toast } from 'react-toastify';
import { capitalizeWord } from '../../utils/capitalize-word.utils';
import { patchJob } from '../../services/job-api/patch-job-by-id.service';

function useJobActions() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<null | string>(null);

	const addJob = async (data: JobFormData) => {
		try {
			setIsSubmitting(true);
			setError(null);

			data.companyName = capitalizeWord(data.companyName.trim());
			data.location = capitalizeWord(data.location);
			await postJob(data);
			toast.success('Poste ajouté avec succès !');
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Une erreur est survenue.');
			toast.error("Erreur lors de l'ajout du poste.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const updateJob = async (id: number, data: JobFormData) => {
		try {
			setIsSubmitting(true);
			setError(null);

			data.companyName = capitalizeWord(data.companyName.trim());
			data.location = capitalizeWord(data.location);
			await patchJob(id, data);
			toast.success('Poste mis à jour avec succès !');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
			toast.error('Erreur lors de la mise à jour du poste.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		addJob,
		updateJob,
		isSubmitting,
		error,
	};
}

export default useJobActions;
