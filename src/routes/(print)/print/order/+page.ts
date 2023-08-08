import { getOrderMaster } from '$stores/order';

export async function load({ params }) {
	let nodeId = params.id;
	const order = await getOrderMaster(nodeId);
	return {
		order
	};
}
