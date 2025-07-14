export const JobType = {
	manager: 'manager',
	fullstack: 'fullstack',
	back: 'back',
	front: 'front',
} as const;

export type JobType = (typeof JobType)[keyof typeof JobType];
