import { SortFilterMappingOption } from '../../../../core/mappers/sort-filter-mapping';
import { TagsState } from '../index';
import FilterTag from './FilterTag';

export type FiltersState = {
	job: string[];
	contract: string[];
	remote: string[];
	sort: SortFilterMappingOption;
};

type FilterTagsProps = {
	filters: FiltersState;
	handleRemoveTag: (key: keyof TagsState, value: string) => void;
};

function FilterTags({ filters, handleRemoveTag }: FilterTagsProps) {
	return (
		<div className="selected-tags">
			{Object.entries(filters).map(([key, values]) =>
				!Array.isArray(values)
					? null
					: values.map((option) => (
							<FilterTag
								key={`${key}-${option}`}
								option={option}
								handleRemoveTag={handleRemoveTag}
								tagKey={key as keyof TagsState}
							/>
						)),
			)}
		</div>
	);
}

export default FilterTags;
