import jobApi from './job-api';
import { JobFormData } from '../../components/JobForm';

export async function patchJob(id: number, data: JobFormData): Promise<void> {
	return await jobApi.patch(`/jobs/${id}`, data);
}
