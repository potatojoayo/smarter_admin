export async function load({ url }) {
	let dateFrom = url.searchParams.get('dateFrom');
	let dateTo = url.searchParams.get('dateTo');
	let category = url.searchParams.get('category');
	let subCategory = url.searchParams.get(
		'subCategory'
	);
	let brand = url.searchParams.get('brand');

	let statistics = [];
	return {
		statistics
	};
}
