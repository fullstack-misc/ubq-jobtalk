import { useState, useRef, useEffect } from 'react';

import './multi-select-dropdown.scss';
import CheckboxInput from './CheckboxInput';
import SelectCaretIcon from '../../../../core/components/SelectCaretIcon';

interface MultiSelectDropdownProps {
	label: string;
	options: string[];
	selectedFilterOptions: string[];
	onChange: (selected: string[]) => void;
	onSelect: (option: string) => void;
}

function MultiSelectDropdown({
	label,
	options,
	selectedFilterOptions,
	onChange,
	onSelect,
}: MultiSelectDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleClickOutside = (event: MouseEvent) => {
		if (!dropdownRef.current?.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	const handleCheckboxChange = (option: string) => {
		if (selectedFilterOptions.includes(option)) {
			const filtered = selectedFilterOptions.filter((item) => item !== option);
			onChange(filtered);
		} else {
			onChange([...selectedFilterOptions, option]);
		}

		onSelect(option);
	};

	return (
		<div className="multi-select-dropdown" ref={dropdownRef}>
			<button
				className={`dropdown-toggle ${!isOpen ? '' : 'dropdown-toggle-open'}`}
				onClick={toggleDropdown}
			>
				{label}
				<SelectCaretIcon classPrefix="multi-select-dropdown" />
			</button>

			{isOpen && (
				<div className="dropdown-menu">
					{options.map((option) => (
						<CheckboxInput
							key={option}
							option={option}
							selected={selectedFilterOptions}
							handleCheckboxChange={handleCheckboxChange}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default MultiSelectDropdown;
