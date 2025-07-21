export function capitalizeWord(word: string): string {
	return !word ? '' : `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
}
