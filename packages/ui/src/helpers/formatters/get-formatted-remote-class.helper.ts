import { RemoteType, RemoteTypeType } from '../../services/job-api/types/remote-type.type';

export function getFormattedRemoteClass(remote: RemoteTypeType): string {
	switch (remote) {
		case RemoteType.fullRemote:
			return 'remote-chip full-remote-chip';
		case RemoteType.partial:
			return 'remote-chip partial-remote-chip';
		default:
			return 'remote-chip punctual-remote-chip';
	}
}
