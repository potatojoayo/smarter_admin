<script>
	import { onMount } from 'svelte';
	import { getBrands } from '../../stores/product.js';
	import DropdownSelect from './DropdownSelect.svelte';
	let brands = [];
	onMount(async () => {
		brands = [
			{ name: '전체' },
			...(await getBrands())
		];
	});
	export let selectedBrand;
</script>

<div class="flex flex-col">
	<span class="mb-1">브랜드</span>

	<DropdownSelect
		options={brands}
		bind:value={selectedBrand}
		placeholder="브랜드를 선택해주세요"
	/>
</div>
