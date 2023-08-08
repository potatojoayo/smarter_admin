<script>
	import { onMount } from 'svelte';
	import {
		getCategories,
		getSubCategories
	} from '../../stores/product.js';
	import DropdownSelect from './DropdownSelect.svelte';

	export let category;
	export let subCategory;
	let categories = [];
	let selectedCategory;
	$: category = selectedCategory
		? selectedCategory.name
		: category;
	let subCategories = [];
	let selectedSubCategory;
	$: subCategory = selectedSubCategory
		? selectedSubCategory.name
		: subCategory;
	onMount(async () => {
		categories = [
			{ name: '전체' },
			...(await getCategories())
		];
		selectedCategory = categories.find(
			(c) => c.name === category
		);
		if (selectedCategory) {
			selectedSubCategory =
				selectedCategory.children.find(
					(c) => c.name === subCategory
				);
		}
	});
</script>

<DropdownSelect
	options={categories}
	bind:value={selectedCategory}
	placeholder="카테고리"
	classes="min-w-[100px]"
	onSelect={async (option) => {
		subCategories = [
			{ name: '전체' },
			...(await getSubCategories(option.id))
		];
		selectedSubCategory = { name: '전체' };
	}}
/>
<div class="mx-1" />
<DropdownSelect
	options={subCategories}
	bind:value={selectedSubCategory}
	classes="min-w-[130px]"
	placeholder="서브카테고리"
/>
<div class="mx-1" />
