import { get } from 'svelte/store';
import { wOrders } from '../../../../../../stores/order.js';

export async function load({ params }) {
	let orderId = params.id;
	const order = get(wOrders).find(
		(o) => o.id === +orderId
	);
	return {
		order
	};
}
