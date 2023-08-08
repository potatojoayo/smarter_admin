import { goto } from '$app/navigation';
import { checkedProducts } from '../../../stores/product.js';

export async function load({ url }) {
	checkedProducts.set([]);
	let page = url.searchParams.get('page');
	if (!page) {
		let query = new URLSearchParams(
			url.searchParams.toString()
		);
		if (!page) query.set('page', '1');

		await goto(`/inventory?${query.toString()}`);
	}
}
