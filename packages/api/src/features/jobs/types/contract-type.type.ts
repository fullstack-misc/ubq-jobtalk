export const ContractType = {
	cdi: 'cdi',
	cdd: 'cdd',
	stage: 'stage',
} as const;

export type ContractType = (typeof ContractType)[keyof typeof ContractType];
