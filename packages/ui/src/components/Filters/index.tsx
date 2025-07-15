import { useState } from 'react';

import MultiSelectDropdown from '../MultiSelectDropdown';
import { JobMappingToUsers } from '../../mappers/job-mapping';
import { ContractMappingToUsers } from '../../mappers/contract-mapping-to-users';
import { RemoteMappingToUsers } from '../../mappers/remote-mapping';
import { SortFilterMappingOption } from '../../mappers/sort-filter-mapping';

import './filters.scss';
import MultiSelectSortDropdown from '../MultiSelectSortDropdown';

export type FiltersState = {
	job: string[];
	contract: string[];
	remote: string[];
	sort: SortFilterMappingOption;
};

type FiltersProps = {
	filters: FiltersState;
	onChange: (filters: FiltersState) => void;
};

type TagsState = {
	job: string[];
	contract: string[];
	remote: string[];
};

export default function Filters({ filters, onChange }: FiltersProps) {
	const [tags, setTags] = useState({
		job: [],
		contract: [],
		remote: [],
	});

	const handleChange = (key: keyof FiltersState, value: string[] | string) => {
		onChange({
			...filters,
			[key]: value,
		});
	};

	const handleSelect = (key: keyof TagsState, value: string[] | string) => {
		if (!tags[key].includes(value)) {
			const updatedTags = {
				...tags,
				[key]: [...tags[key], value],
			};

			setTags(updatedTags);
			// handleChange(key, updatedTags[key]);
		}
	};

	const handleRemoveTag = (key: keyof TagsState, value: string) => {
		onChange({
			...filters,
			[key]: filters[key].filter((tag) => tag !== value),
		});
	};

	return (
		<>
			<div className="filters">
				<div className="filters__job">
					<MultiSelectDropdown
						label="Poste"
						options={[
							JobMappingToUsers.BackEnd_Developer,
							JobMappingToUsers.Fullstack_Developer,
							JobMappingToUsers.Front_Developer,
							JobMappingToUsers.Manager,
						]}
						selected={filters.job}
						onChange={(value) => handleChange('job', value)}
						onSelect={(value) => handleSelect('job', value)}
					/>
					<MultiSelectDropdown
						label="Type de contrat"
						options={[
							ContractMappingToUsers.Full_time,
							ContractMappingToUsers.Fixed_term,
							ContractMappingToUsers.Internship,
						]}
						selected={filters.contract}
						onChange={(value) => handleChange('contract', value)}
						onSelect={(value) => handleSelect('contract', value)}
					/>
					<MultiSelectDropdown
						label="Télétravail"
						options={[
							RemoteMappingToUsers.Partial_remote,
							RemoteMappingToUsers.Ponctual_remote,
							RemoteMappingToUsers.Full_remote,
							RemoteMappingToUsers.Not_specified,
						]}
						selected={filters.remote}
						onChange={(value) => handleChange('remote', value)}
						onSelect={(value) => handleSelect('remote', value)}
					/>
				</div>
				<MultiSelectSortDropdown
					label={SortFilterMappingOption.DATE}
					options={[SortFilterMappingOption.DATE, SortFilterMappingOption.SALARY]}
					selected={[filters.sort]}
					onChange={(value) =>
						handleChange('sort', value[value.length - 1] || SortFilterMappingOption.DATE)
					}
				/>
			</div>

			<div className="selected-tags">
				{Object.entries(filters).map(([key, values]) =>
					!Array.isArray(values)
						? null
						: values.map((option) => (
								// TODO
								<span key={option} className="tag filter-tag">
									{option}
									<button
										className="close"
										type="button"
										onClick={() => handleRemoveTag(key as keyof TagsState, option)}
									>
										×
									</button>
								</span>
							)),
				)}
			</div>
		</>
	);
}
