import './checkbox-input.scss';

type CheckboxInputProps = {
	option: string;
	selected: string[];
	handleCheckboxChange: (option: string) => void;
};

function CheckboxInput({ option, selected, handleCheckboxChange }: CheckboxInputProps) {
	return (
		<label key={option} className="checkbox-input-option">
			<input
				className="checkbox-input-option__checkbox"
				type="checkbox"
				checked={selected.includes(option)}
				onChange={() => handleCheckboxChange(option)}
			/>
			<span className="checkbox-input-option__checkmark"></span>
			{option}
		</label>
	);
}

export default CheckboxInput;
