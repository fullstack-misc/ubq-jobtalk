export enum SortFilterMappingForUsers {
	date = 'Date',
	salary = 'Salaire',
}

export enum SortFilterMappingOption {
	DATE = 'date',
	SALARY = 'salary',
}

export const SortFilterMappingOptionToUsers: Record<
	SortFilterMappingOption,
	SortFilterMappingForUsers
> = {
	[SortFilterMappingOption.DATE]: SortFilterMappingForUsers.date,
	[SortFilterMappingOption.SALARY]: SortFilterMappingForUsers.salary,
};
