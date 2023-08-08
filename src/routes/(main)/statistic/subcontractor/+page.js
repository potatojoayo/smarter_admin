import { getSubcontractors } from '../../../../stores/subcontractor.js';

export async function load() {
	let subcontractors = await getSubcontractors(
		false,
		false
	);
	subcontractors = subcontractors.map(
		(s) => s.name
	);

	return {
		subcontractors
	};
}
