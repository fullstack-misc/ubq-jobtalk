import { RemoteTypeType } from '../../../jobtalk/services/job-api/types';
import { RemoteType } from '../../../jobtalk/services/job-api/types/remote-type.type';

export function getFormattedRemote(remote: RemoteTypeType): string {
	switch (remote) {
		case RemoteType.fullRemote:
			return 'Télétravail total';
		case RemoteType.partial:
			return 'Télétravail partiel';
		default:
			return 'Télétravail ponctuel';
	}
}
