import axios from 'axios';

const jobApi = axios.create({
	baseURL: import.meta.env.PUBLIC_JOB_API_URL || 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default jobApi;
