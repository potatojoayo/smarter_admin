import { getSubcontractorCalculations } from '../../../../../stores/calculate.js';

export async function load({ url }) {
	let year = url.searchParams.get('year');
	let month = url.searchParams.get('month');
	let subcontractor = url.searchParams.get(
		'subcontractor'
	);

	let data = await getSubcontractorCalculations(
		year,
		month,
		subcontractor
	);
	let calculations = data.calculations;
	return {
		calculations
	};
}
