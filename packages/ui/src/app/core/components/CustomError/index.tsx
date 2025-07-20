import { type JSX } from 'react';

function CustomError({ error }: { error: null | string }): JSX.Element {
	return (
		<>
			<p>Une erreur est survenue</p>
			<p>{error ? error : 'Veuillez réessayer plus tard.'}</p>
		</>
	);
}

export default CustomError;
