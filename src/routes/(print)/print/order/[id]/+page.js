import { getOrderMastersByids } from '../../../../../stores/order.js';

export async function load({ params }) {
	let ids = params.id.split(',');
	const orders = await getOrderMastersByids(ids);
	return {
		orders
	};
}
