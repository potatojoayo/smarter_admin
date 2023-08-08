<script>
	import CategoryNav from '../../product/CategoryNav.svelte';
	import BrandNav from '../../product/BrandNav.svelte';
	import SearchBar from '../../SearchBar.svelte';
	import SelectableProductTable from './SelectableProductMasterTable.svelte';

	export let products;
	export let selected = null;
	export let onClick = () => {};
</script>

<section>
	div class="flex p-5 shadow mt-5 rounded">
		<div class="flex flex-col w-fit">
			<CategoryNav />
		</div>
		<div class="flex flex-col ml-5">
			<BrandNav />
		</div>

		<div class="flex-1 ml-10 flex flex-col">
			<SearchBar />
			<SelectableProductTable
				{products}
				bind:selected
				{onClick}
			/>
		</div>
	</div>
</section>
