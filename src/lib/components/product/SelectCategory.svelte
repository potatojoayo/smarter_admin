<script>
	import { goto } from '$app/navigation';
	import { getCategories } from '../../../stores/product.js';
	import { onMount } from 'svelte';

	let categories = [];

	let selectedCategory;

	export let productMaster;

	onMount(async () => {
		categories = await getCategories();
		if (productMaster.category) {
			selectedCategory = categories.find(
				(c) =>
					c.name === productMaster.category.name
			);
		}
	});
</script>

<div class="flex flex-col mt-3">
	<div class="text-lg mb-3 flex justify-between">
		<div class="flex">
			<span class="cursor-default mr-2"
				>카테고리 선택</span
			>
			<span class="text-red-500">*</span>
		</div>
		<i
			class="fa fa-gear cursor-pointer"
			on:click={() => goto('/product/category')}
		/>
	</div>
	<div class="flex ">
		<div
			class="border w-fit rounded-tl rounded-bl  w-52 h-60 overflow-x-scroll bg-white"
		>
			{#each categories as category}
				<div
					class="py-2 cursor-pointer  px-5 flex justify-between items-center
						{productMaster.category &&
					productMaster.category.name ===
						category.name
						? 'bg-primary text-white'
						: 'hover:bg-gray-300'}
"
					on:click={() => {
						productMaster.category = {
							id: category.id,
							name: category.name,
							order: category.order,
							depth: category.depth
						};
						selectedCategory = category;
					}}
				>
					<span>
						{category.name}
					</span>
					<i
						class="fa fa-chevron-right text-sm"
					/>
				</div>
			{/each}
		</div>
		<div
			class="border-t border-r border-b w-fit rounded-tr rounded-br  w-52 h-60 overflow-y-scroll bg-white"
		>
			{#if productMaster.category && selectedCategory && selectedCategory.children}
				{#each selectedCategory.children as childCategory}
					<div
						class="py-2 cursor-pointer px-5
						{productMaster.subCategory &&
						productMaster.subCategory.name ===
							childCategory.name
							? 'bg-primary text-white'
							: 'hover:bg-gray-300'}"
						on:click={() => {
							productMaster.subCategory =
								childCategory;
							for (let product of productMaster.products) {
								product.subCategory =
									childCategory.name;
							}
							productMaster = productMaster;
						}}
					>
						<span>
							{childCategory.name}
						</span>
					</div>
				{/each}
			{:else}
				<div class="py-2 px-5">
					카테고리를 선택해주세요
				</div>
			{/if}
		</div>
	</div>
</div>
