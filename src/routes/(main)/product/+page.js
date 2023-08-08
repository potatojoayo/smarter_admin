import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
	const now = new Date();

	let page = url.searchParams.get('page');
	let state = url.searchParams.get('state');

	if (!page || !state) {
		let query = new URLSearchParams(
			url.searchParams.toString()
		);
		if (!page) query.set('page', '1');
		if (!state) query.set('state', '전체');

		throw redirect(
			302,
			`/product?${query.toString()}`
		);
	}
}
