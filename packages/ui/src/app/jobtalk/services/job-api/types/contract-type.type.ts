export const ContractType = {
	cdi: 'cdi',
	cdd: 'cdd',
	stage: 'stage',
} as const;

export type ContractTypeType = (typeof ContractType)[keyof typeof ContractType];
