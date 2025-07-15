import { ContractTypeType } from '../../services/job-api/types';
import { capitalizeWord } from '../../utils/capitalize-word.utils';

export function getFormattedContract(contract: ContractTypeType): string {
	return contract === 'cdi' || contract === 'cdd'
		? contract.toUpperCase()
		: capitalizeWord(contract);
}
