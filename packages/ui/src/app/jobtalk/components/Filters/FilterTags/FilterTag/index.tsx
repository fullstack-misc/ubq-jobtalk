import { TagsState } from '../../index';

type FilterTagProps = {
	option: string;
	tagKey: keyof TagsState;
	handleRemoveTag: (tagKey: keyof TagsState, value: string) => void;
};

function FilterTag({ option, tagKey, handleRemoveTag }: FilterTagProps) {
	return (
		<span key={option} className="tag filter-tag">
			{option}
			<button className="close" type="button" onClick={() => handleRemoveTag(tagKey, option)}>
				×
			</button>
		</span>
	);
}

export default FilterTag;
