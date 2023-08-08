import { getAgencyCalculations } from '../../../../stores/calculate.js';

export async function load({ url }) {
	let year = url.searchParams.get('year');
	let month = url.searchParams.get('month');
	let agency = url.searchParams.get('agency');

	let data = await getAgencyCalculations(
		year,
		month,
		agency
	);
	let calculations = data.calculations;
	return {
		calculations
	};
}
