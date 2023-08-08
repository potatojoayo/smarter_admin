<script>
	import { onMount } from 'svelte';
	import { getCategories } from '../../stores/product.js';
	import DropdownSelect from './DropdownSelect.svelte';
	let categories = [];
	onMount(async () => {
		categories = [
			{ name: '전체' },
			...(await getCategories())
		];
	});
	export let selectedCategory;
</script>

<div class="flex flex-col">
	<span class="mb-1">카테고리</span>

	<DropdownSelect
		options={categories}
		bind:value={selectedCategory}
		placeholder="카테고리를 선택해주세요"
	/>
</div>
