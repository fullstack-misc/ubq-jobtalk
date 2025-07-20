export enum RemoteMappingToUsers {
	Partial_remote = 'Télétravail partiel',
	Full_remote = 'Télétravail total',
	Ponctual_remote = 'Télétravail ponctuel',
	Not_specified = 'Non spécifié',
}

export const RemoteMappingFromUsersToRemoteType: Record<RemoteMappingToUsers, string> = {
	[RemoteMappingToUsers.Partial_remote]: 'partial',
	[RemoteMappingToUsers.Full_remote]: 'fullRemote',
	[RemoteMappingToUsers.Ponctual_remote]: 'ponctual',
	[RemoteMappingToUsers.Not_specified]: 'non_spécifié',
};

export const RemoteMappingFromRemoteTypeToUsers: Record<string, RemoteMappingToUsers> = {
	partial: RemoteMappingToUsers.Partial_remote,
	fullRemote: RemoteMappingToUsers.Full_remote,
	ponctual: RemoteMappingToUsers.Ponctual_remote,
	'non spécifié': RemoteMappingToUsers.Not_specified,
};
