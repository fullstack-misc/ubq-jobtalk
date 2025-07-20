export const RemoteType = {
	partial: 'partial',
	fullRemote: 'fullRemote',
	ponctual: 'ponctual',
} as const;

export type RemoteTypeType = null | (typeof RemoteType)[keyof typeof RemoteType];
