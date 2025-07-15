import { useState, useRef, useEffect } from 'react';

import './multi-select-dropdown.scss';

interface MultiSelectDropdownProps {
	label: string;
	options: string[];
	selected: string[];
	onChange: (selected: string[]) => void;
	onSelect: (option: string) => void;
}

function MultiSelectDropdown({
	label,
	options,
	selected,
	onChange,
	onSelect,
}: MultiSelectDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleClickOutside = (event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleCheckboxChange = (option: string) => {
		if (selected.includes(option)) {
			const filtered = selected.filter((item) => item !== option);
			onChange(filtered);
		} else {
			onChange([...selected, option]);
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
				<span className="dropdown-toggle__circle">
					<svg
						className="dropdown-toggle__circle__caret"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M2.79164 5.2915C3.18038 4.9028 3.81065 4.90287 4.19945 5.29149L8 9.09226L11.8005 5.29168C12.1893 4.90307 12.8195 4.90293 13.2082 5.29159C13.5972 5.68035 13.5973 6.31089 13.2083 6.69968L8.70375 11.2043C8.50941 11.3985 8.25421 11.4956 8 11.4956C7.74559 11.4956 7.49036 11.3982 7.29616 11.2041L2.7916 6.6995C2.40281 6.3107 2.40278 5.68024 2.79164 5.2915Z"
							fill="#7650E0"
						/>
					</svg>
				</span>
			</button>

			{isOpen && (
				<div className="dropdown-menu">
					{options.map((option) => (
						<label key={option} className="dropdown-option">
							<input
								className="dropdown-option__checkbox"
								type="checkbox"
								checked={selected.includes(option)}
								onChange={() => handleCheckboxChange(option)}
							/>
							<span className="dropdown-option__checkmark"></span>
							{option}
						</label>
					))}
				</div>
			)}
		</div>
	);
}

export default MultiSelectDropdown;
