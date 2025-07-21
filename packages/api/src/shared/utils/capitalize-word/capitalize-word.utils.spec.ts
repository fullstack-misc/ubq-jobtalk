import { capitalizeWord } from './capitalize-word.utils';

describe('capitalizeWord', () => {
	it('should capitalize a mixed-case word', () => {
		expect(capitalizeWord('jAVaScRiPt')).toBe('Javascript');
	});

	it('should handle a single character', () => {
		expect(capitalizeWord('a')).toBe('A');
	});

	it('should handle an empty string', () => {
		expect(capitalizeWord('')).toBe('');
	});

	it('should handle non-alphabetic characters', () => {
		expect(capitalizeWord('123abc')).toBe('123abc');
	});
});
