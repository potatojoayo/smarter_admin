import { redirect } from '@sveltejs/kit';

export async function load({ url, parent }) {
	const now = new Date();

	let dateFrom = url.searchParams.get('dateFrom');
	let dateTo = url.searchParams.get('dateTo');
	let page = url.searchParams.get('page');
	let subcontractor = url.searchParams.get(
		'subcontractor'
	);

	const { me } = await parent();

	if (
		!dateFrom ||
		!dateTo ||
		!page ||
		!subcontractor
	) {
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
		if (me && me.subcontractor) {
			query.set(
				'subcontractor',
				me.subcontractor.name
			);
		} else {
			query.set('subcontractor', '전체');
		}
		throw redirect(
			302,
			`/work?${query.toString()}`
		);
	}

	return {
		me
	};
}
