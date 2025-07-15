import { useState, useRef, useEffect } from 'react';

import { SortFilterMappingForUsers } from '../../mappers/sort-filter-mapping';
import './multi-select-sort-dropdown.scss';

interface MultiSelectSortDropdownProps {
	label: string;
	options: string[];
	selected: string[];
	onChange: (selected: string[]) => void;
}

function MultiSelectSortDropdown({
	label,
	options,
	selected,
	onChange,
}: MultiSelectSortDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleOptionClick = (option: string) => {
		onChange([option]);
		setIsOpen(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="multi-select-sort-dropdown" ref={dropdownRef}>
			<span className="sort-dropdown-label">Trier par :</span>
			<button
				className={`sort-dropdown-toggle ${!isOpen ? '' : 'sort-dropdown-toggle-open'}`}
				onClick={toggleDropdown}
			>
				{selected.length > 0
					? SortFilterMappingForUsers[selected[0]]
					: SortFilterMappingForUsers[label]}

				<span className="sort-dropdown-toggle__circle">
					<svg
						className="sort-dropdown-toggle__circle__caret"
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
				<div className="sort-dropdown-menu">
					{options.map((option) => (
						<label key={option} className="sort-dropdown-option">
							<div
								className={`dropdown-option ${selected.includes(option) ? 'selected' : ''}`}
								onClick={() => handleOptionClick(option)}
							>
								Par {SortFilterMappingForUsers[option]}
							</div>
						</label>
					))}
				</div>
			)}
		</div>
	);
}

export default MultiSelectSortDropdown;
