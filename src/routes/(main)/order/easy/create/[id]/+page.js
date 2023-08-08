import { goto } from '$app/navigation';
import { getEasyOrder } from '../../../../../../stores/order.js';

export async function load({ params, url }) {
	const nodeId = params.id;

	const easyOrder = await getEasyOrder(nodeId);

	let page = url.searchParams.get('page');
	if (!page) {
		let query = new URLSearchParams(
			url.searchParams.toString()
		);
		if (!page) query.set('page', '1');

		await goto(
			`easy/create/${nodeId}?${query.toString()}`
		);
	}

	return {
		easyOrder
	};
}
