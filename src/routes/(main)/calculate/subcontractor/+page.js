import { goto } from '$app/navigation';
import { getAgencies } from '../../../../stores/user.js';
import { getSubcontractors } from '../../../../stores/subcontractor.js';

export async function load({ url }) {
	const now = new Date();

	let dateFrom = url.searchParams.get('dateFrom');
	let dateTo = url.searchParams.get('dateTo');

	if (!dateFrom || !dateTo) {
		let query = new URLSearchParams(
			url.searchParams.toString()
		);
		if (!dateFrom) {
			query.set(
				'dateFrom',
				new Date(
					now.getFullYear(),
					now.getMonth(),
					1,
					0,
					0,
					0
				).toISOString()
			);
		}
		if (!dateTo) {
			query.set(
				'dateTo',
				new Date(
					now.getFullYear(),
					now.getMonth() + 1,
					1,
					0,
					0,
					0
				).toISOString()
			);
		}

		await goto(
			`/calculate/subcontractor?${query.toString()}`
		);
		return {};
	}
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
