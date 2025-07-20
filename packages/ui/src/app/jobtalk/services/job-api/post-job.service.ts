import jobApi from './job-api';
import { JobFormData } from '../../components/JobForm';

export async function postJob(data: JobFormData): Promise<void> {
	return await jobApi.post('/jobs/', data);
}
