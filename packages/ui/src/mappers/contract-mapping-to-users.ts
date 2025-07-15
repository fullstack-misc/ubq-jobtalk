export enum ContractMappingToUsers {
	Full_time = 'CDI',
	Fixed_term = 'CDD',
	Internship = 'Stage',
}

export const ContractMappingFromUsersToContractType: Record<ContractMappingToUsers, string> = {
	[ContractMappingToUsers.Full_time]: 'cdi',
	[ContractMappingToUsers.Fixed_term]: 'cdd',
	[ContractMappingToUsers.Internship]: 'stage',
};

export const ContractMappingFromContractTypeToUsers: Record<string, ContractMappingToUsers> = {
	cdi: ContractMappingToUsers.Full_time,
	cdd: ContractMappingToUsers.Fixed_term,
	stage: ContractMappingToUsers.Internship,
};
