import jobApi from './job-api';

export async function deleteJobById(id: number): Promise<void> {
	await jobApi.delete(`/jobs/${id}`);
}
