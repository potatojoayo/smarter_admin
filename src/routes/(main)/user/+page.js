import { goto } from '$app/navigation';

export async function load({ url }) {
	const now = new Date();

	let page = url.searchParams.get('page');
	let membership =
		url.searchParams.get('membership');
	let hasDraft = url.searchParams.get('hasDraft');

	if (!page || !membership || !hasDraft) {
		let query = new URLSearchParams(
			url.searchParams.toString()
		);
		if (!page) query.set('page', '1');
		if (!membership)
			query.set('membership', '전체');

		if (!hasDraft) query.set('hasDraft', '전체');

		await goto(`/user?${query.toString()}`);
	}
}
