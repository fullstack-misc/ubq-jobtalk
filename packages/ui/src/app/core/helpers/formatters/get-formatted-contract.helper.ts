import { ContractTypeType } from '../../../jobtalk/services/job-api/types';
import { capitalizeWord } from '../../../shared/utils/capitalize-word.utils';

export function getFormattedContract(contract: ContractTypeType): string {
	return contract === 'cdi' || contract === 'cdd'
		? contract.toUpperCase()
		: capitalizeWord(contract);
}
