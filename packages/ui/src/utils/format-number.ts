function formatNumber(number: number): string {
	const abs = Math.abs(number);

	const oneQuadrillion = 1_000_000_000_000_000;
	if (abs >= oneQuadrillion) {
		return (number / oneQuadrillion).toFixed(1).replace(/\.0$/, '') + 'T';
	}

	const oneTrillion = 1_000_000_000_000;
	if (abs >= oneTrillion) {
		return (number / oneTrillion).toFixed(1).replace(/\.0$/, '') + 'B';
	}

	const oneMillion = 1_000_000;
	if (abs >= oneMillion) {
		return (number / oneMillion).toFixed(1).replace(/\.0$/, '') + 'M';
	}

	const oneThousand = 1_000;
	if (abs >= oneThousand) {
		return (number / oneThousand).toFixed(1).replace(/\.0$/, '') + 'k';
	}

	return number.toString();
}

export default formatNumber;
