<script>
	import CategoryItem from './CategoryItem.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getCategories } from '../../../stores/product.js';

	let categories = [];
	onMount(async () => {
		categories = await getCategories();
	});
</script>

<div
	class="cursor-default whitespace-nowrap px-5 py-3 min-w-[230px] flex justify-between"
>
	<span class="text-lg mr-1 whitespace-nowrap"
		>카테고리</span
	>
	<i
		class="fa fa-gear text-lg cursor-pointer"
		on:click={() => goto('/product/category')}
	/>
</div>
<div class="h-80 overflow-y-scroll p-3">
	<CategoryItem
		category={{ name: '전체', children: [] }}
	/>
	{#each categories as category}
		<CategoryItem {category} />
	{/each}
</div>
