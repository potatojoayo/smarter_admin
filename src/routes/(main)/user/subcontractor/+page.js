import { goto } from '$app/navigation';

export async function load({ url }) {
	let page = url.searchParams.get('page');

	if (!page) {
		let query = new URLSearchParams(
			url.searchParams.toString()
		);
		if (!page) query.set('page', '1');

		await goto(
			`/user/subcontractor?${query.toString()}`
		);
	}
}
