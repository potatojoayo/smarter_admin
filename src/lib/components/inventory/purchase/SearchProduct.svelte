<script>
	import CategoryNav from '../../product/CategoryNav.svelte';
	import BrandNav from '../../product/BrandNav.svelte';
	import SearchBar from '../../SearchBar.svelte';
	import SelectableMultipleProductTable from './SelectableMultipleProductTable.svelte';
	import { getProducts } from '../../../../stores/product.js';
	import { page } from '$app/stores';
	import Pagination from '../../Pagination.svelte';

	export let selected;
	let products = [];
	let totalCount = 0;

	$: {
		getProducts(
			$page.url.searchParams.get('page'),
			$page.url.searchParams.get('category'),
			$page.url.searchParams.get('subcategory'),
			$page.url.searchParams.get('brand'),
			$page.url.searchParams.get('keyword')
		).then((result) => {
			products = result.products;
			totalCount = result.totalCount;
		});
	}
</script>

<section>
	<div class="flex p-5 shadow mt-5 rounded">
		<div class="flex flex-col w-fit">
			<CategoryNav />
			<div class="my-5" />
			<BrandNav />
		</div>

		<div
			class="flex-1 ml-10 flex flex-col min-w-[800px]"
		>
			<SearchBar />
			<SelectableMultipleProductTable
				bind:selected
				{products}
			/>
			<Pagination
				{totalCount}
				classes="my-5"
				onClick={() => {
					selected = [];
				}}
			/>
		</div>
	</div>
</section>
