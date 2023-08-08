import { goto } from '$app/navigation';

export async function load({ url }) {
	const now = new Date();

	let dateFrom = url.searchParams.get('dateFrom');
	let dateTo = url.searchParams.get('dateTo');
	let page = url.searchParams.get('page');
	let state = url.searchParams.get('state');
	if (!dateFrom || !dateTo || !page || !state) {
		let query = new URLSearchParams(
			url.searchParams.toString()
		);
		if (!dateFrom)
			query.set(
				'dateFrom',
				new Date(
					now.getFullYear(),
					now.getMonth() - 1,
					1,
					0,
					0,
					0
				).toISOString()
			);
		if (!page) query.set('page', '1');
		if (!dateTo) {
			now.setDate(now.getDate() + 1);
			now.setHours(0);
			now.setMinutes(0);
			now.setSeconds(0);
			query.set('dateTo', now.toISOString());
		}
		if (!state) query.set('state', '전체');

		await goto(
			`/order/claim?${query.toString()}`
		);
	}
}
