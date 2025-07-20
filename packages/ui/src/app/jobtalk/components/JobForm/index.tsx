import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import './job-form.scss';
import { JobMappingFromUsersToJobType, JobMappingToUsers } from '../../../core/mappers/job-mapping';
import {
	ContractMappingFromUsersToContractType,
	ContractMappingToUsers,
} from '../../../core/mappers/contract-mapping-to-users';
import {
	RemoteMappingFromUsersToRemoteType,
	RemoteMappingToUsers,
} from '../../../core/mappers/remote-mapping';
import { JobType } from '../../services/job-api/types/job-type.type';
import { ContractType } from '../../services/job-api/types/contract-type.type';
import { RemoteType } from '../../services/job-api/types/remote-type.type';
import SelectCaretIcon from '../../../core/components/SelectCaretIcon';

const jobSchema = z.object({
	jobType: z.enum(JobType, { error: 'Nom du poste requis' }),
	companyName: z.string().trim().min(1, 'Entreprise requise'),
	location: z.string().trim().min(1, 'Ville requise'),
	contractType: z.enum(ContractType, { error: 'Type de contrat requis' }),
	salary: z
		.number({ error: 'Salaire doit être un nombre' })
		.min(0, 'Salaire ne doit pas être négatif'),
	remoteType: z.enum(RemoteType, { error: 'Télétravail requis' }),
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
						<SelectCaretIcon classPrefix="job-form" />
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
						<SelectCaretIcon classPrefix="job-form" />
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
						<SelectCaretIcon classPrefix="job-form" />
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
