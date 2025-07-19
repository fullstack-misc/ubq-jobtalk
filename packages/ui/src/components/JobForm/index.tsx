import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import './job-form.scss';
import { JobMappingFromUsersToJobType, JobMappingToUsers } from '../../mappers/job-mapping';
import {
	ContractMappingFromUsersToContractType,
	ContractMappingToUsers,
} from '../../mappers/contract-mapping-to-users';
import {
	RemoteMappingFromUsersToRemoteType,
	RemoteMappingToUsers,
} from '../../mappers/remote-mapping';

const jobSchema = z.object({
	jobType: z.enum(['manager', 'back', 'front', 'fullstack'], {
		required_error: 'Nom du poste requis',
	}),
	companyName: z.string().min(1, 'Entreprise requise'),
	location: z.string().min(1, 'Ville requise'),
	contractType: z.enum(['cdi', 'cdd', 'stage'], {
		required_error: 'Type de contrat requis',
	}),
	salary: z
		.number({ invalid_type_error: 'Salaire doit être un nombre' })
		.min(0, 'Salaire ne doit pas être négatif'),
	remoteType: z.enum(['partial', 'fullRemote', 'ponctual'], {
		required_error: 'Télétravail requis',
	}),
});

export type JobFormData = z.infer<typeof jobSchema>;

type JobFormProps = {
	isEdit: boolean;
	onSubmit: (data: JobFormData) => void;
	onClose: () => void;
	onDelete?: () => void;
	defaultValues?: JobFormData;
};

function JobForm({ defaultValues, isEdit, onSubmit, onDelete, onClose }: JobFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<JobFormData>({
		resolver: zodResolver(jobSchema),
		defaultValues,
	});

	return (
		<div className="job-form">
			<div className="job-form__header">
				<h2>{!isEdit ? 'Ajouter' : 'Modifier'} une offre d'emploi</h2>
				<button className=" close close-modal" type="button" onClick={onClose}>
					✕
				</button>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="job-form__body">
				<div className="job-form__field">
					<label htmlFor="job">Nom du poste</label>
					<div className="select-wrapper">
						<select id="job" {...register('jobType')}>
							<option value="">Sélectionnez</option>
							<option value={JobMappingFromUsersToJobType[JobMappingToUsers.BackEnd_Developer]}>
								{JobMappingToUsers.BackEnd_Developer}
							</option>
							<option value={JobMappingFromUsersToJobType[JobMappingToUsers.Fullstack_Developer]}>
								{JobMappingToUsers.Fullstack_Developer}
							</option>
							<option value={JobMappingFromUsersToJobType[JobMappingToUsers.Front_Developer]}>
								{JobMappingToUsers.Front_Developer}
							</option>
							<option value={JobMappingFromUsersToJobType[JobMappingToUsers.Manager]}>
								{JobMappingToUsers.Manager}
							</option>
						</select>
						<span className="circle">
							<svg
								className="circle__caret"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M2.79164 5.2915C3.18038 4.9028 3.81065 4.90287 4.19945 5.29149L8 9.09226L11.8005 5.29168C12.1893 4.90307 12.8195 4.90293 13.2082 5.29159C13.5972 5.68035 13.5973 6.31089 13.2083 6.69968L8.70375 11.2043C8.50941 11.3985 8.25421 11.4956 8 11.4956C7.74559 11.4956 7.49036 11.3982 7.29616 11.2041L2.7916 6.6995C2.40281 6.3107 2.40278 5.68024 2.79164 5.2915Z"
									fill="#7650E0"
								/>
							</svg>
						</span>
						{errors.jobType && <p className="error">{errors.jobType.message}</p>}
					</div>
				</div>
				<div className="job-form__field">
					<label htmlFor="company">Entreprise</label>
					<input className="input-field" id="company" {...register('companyName')} />
					{errors.companyName && <p className="error">{errors.companyName.message}</p>}
				</div>
				<div className="job-form__field">
					<label htmlFor="location">Ville</label>
					<input className="input-field" id="location" {...register('location')} />
					{errors.location && <p className="error">{errors.location.message}</p>}
				</div>
				<div className="job-form__field">
					<label htmlFor="contract">Type de contrat</label>
					<div className="select-wrapper">
						<select id="contract" {...register('contractType')}>
							<option value="">Sélectionnez</option>
							<option
								value={ContractMappingFromUsersToContractType[ContractMappingToUsers.Full_time]}
							>
								{ContractMappingToUsers.Full_time}
							</option>
							<option
								value={ContractMappingFromUsersToContractType[ContractMappingToUsers.Fixed_term]}
							>
								{ContractMappingToUsers.Fixed_term}
							</option>
							<option
								value={ContractMappingFromUsersToContractType[ContractMappingToUsers.Internship]}
							>
								{ContractMappingToUsers.Internship}
							</option>
						</select>
						<span className="circle">
							<svg
								className="circle__caret"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M2.79164 5.2915C3.18038 4.9028 3.81065 4.90287 4.19945 5.29149L8 9.09226L11.8005 5.29168C12.1893 4.90307 12.8195 4.90293 13.2082 5.29159C13.5972 5.68035 13.5973 6.31089 13.2083 6.69968L8.70375 11.2043C8.50941 11.3985 8.25421 11.4956 8 11.4956C7.74559 11.4956 7.49036 11.3982 7.29616 11.2041L2.7916 6.6995C2.40281 6.3107 2.40278 5.68024 2.79164 5.2915Z"
									fill="#7650E0"
								/>
							</svg>
						</span>
						{errors.contractType && <p className="error">{errors.contractType.message}</p>}
					</div>
				</div>
				<div className="job-form__field">
					<label htmlFor="salary">Salaire</label>
					<input
						className="input-field"
						id="salary"
						type="number"
						{...register('salary', { valueAsNumber: true })}
					/>
					{errors.salary && <p className="error">{errors.salary.message}</p>}
				</div>
				<div className="job-form__field">
					<label htmlFor="remote">Télétravail</label>
					<div className="select-wrapper">
						<select id="remote" {...register('remoteType')}>
							<option value="">Sélectionnez</option>
							<option
								value={RemoteMappingFromUsersToRemoteType[RemoteMappingToUsers.Partial_remote]}
							>
								{RemoteMappingToUsers.Partial_remote}
							</option>
							<option
								value={RemoteMappingFromUsersToRemoteType[RemoteMappingToUsers.Ponctual_remote]}
							>
								{RemoteMappingToUsers.Ponctual_remote}
							</option>
							<option value={RemoteMappingFromUsersToRemoteType[RemoteMappingToUsers.Full_remote]}>
								{RemoteMappingToUsers.Full_remote}
							</option>
						</select>
						<span className="circle">
							<svg
								className="circle__caret"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M2.79164 5.2915C3.18038 4.9028 3.81065 4.90287 4.19945 5.29149L8 9.09226L11.8005 5.29168C12.1893 4.90307 12.8195 4.90293 13.2082 5.29159C13.5972 5.68035 13.5973 6.31089 13.2083 6.69968L8.70375 11.2043C8.50941 11.3985 8.25421 11.4956 8 11.4956C7.74559 11.4956 7.49036 11.3982 7.29616 11.2041L2.7916 6.6995C2.40281 6.3107 2.40278 5.68024 2.79164 5.2915Z"
									fill="#7650E0"
								/>
							</svg>
						</span>
						{errors.remoteType && <p className="error">{errors.remoteType.message}</p>}
					</div>
				</div>
				<div className="job-form__actions">
					{isEdit && (
						<button
							type="button"
							className="job-form__actions__delete btn btn-danger"
							onClick={onDelete}
						>
							Supprimer
						</button>
					)}
					<button type="submit" className="job-form__actions__submit btn btn-primary">
						Enregistrer l'annonce
					</button>
				</div>
			</form>
		</div>
	);
}

export default JobForm;
