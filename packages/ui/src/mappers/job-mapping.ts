export enum JobMappingToUsers {
	BackEnd_Developer = 'Développeur Backend',
	Front_Developer = 'Développeur Frontend',
	Fullstack_Developer = 'Développeur Fullstack',
	Manager = 'Manager',
}

export const JobMappingFromUsersToJobType: Record<JobMappingToUsers, string> = {
	[JobMappingToUsers.BackEnd_Developer]: 'back',
	[JobMappingToUsers.Front_Developer]: 'front',
	[JobMappingToUsers.Fullstack_Developer]: 'fullstack',
	[JobMappingToUsers.Manager]: 'manager',
};

export const JobMappingFromJobTypeToUsers: Record<string, JobMappingToUsers> = {
	back: JobMappingToUsers.BackEnd_Developer,
	front: JobMappingToUsers.Front_Developer,
	fullstack: JobMappingToUsers.Fullstack_Developer,
	manager: JobMappingToUsers.Manager,
};
