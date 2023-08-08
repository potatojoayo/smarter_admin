import { goto } from '$app/navigation';

export async function load({ url }) {
	let state = url.searchParams.get('state');
	let page = url.searchParams.get('page');

	let query = new URLSearchParams(
		url.searchParams.toString()
	);

	if (!state || !page) {
		state = '전체';
		query.set('state', state);
		query.set('page', 1);
		await goto(`/user/money?${query.toString()}`);
	}
}
