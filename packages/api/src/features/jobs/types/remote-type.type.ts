export const RemoteType = {
	partial: 'partial',
	fullRemote: 'fullRemote',
	ponctual: 'ponctual',
} as const;

export type RemoteType = null | (typeof RemoteType)[keyof typeof RemoteType];
