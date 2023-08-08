<script>
	import { onMount } from 'svelte';
	import {
		getBrands,
		getCategories,
		getSubCategories
	} from '../../../stores/product.js';
	import DropdownSelect from '../DropdownSelect.svelte';

	export let category;
	export let subCategory;
	export let brand;
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
	let brands = [];
	let selectedBrand;

	$: brand = selectedBrand
		? selectedBrand.name
		: brand;

	onMount(async () => {
		categories = [
			{ name: '전체' },
			...(await getCategories())
		];
		brands = [
			{ name: '전체' },
			...(await getBrands())
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
		selectedBrand = brands.find(
			(b) => b.name === brand
		);
	});
</script>

<DropdownSelect
	options={categories}
	bind:value={selectedCategory}
	placeholder="카테고리"
	classes="min-w-[100px] shadow border-none"
	onSelect={async (option) => {
		subCategories = [
			{ name: '전체' },
			...(await getSubCategories(option.id))
		];
		selectedSubCategory = subCategories.find(
			(sc) => sc.name === '전체'
		);
		selectedBrand = brands.find(
			(sb) => sb.name === '전체'
		);
	}}
/>
<div class="mx-1" />
<DropdownSelect
	options={subCategories}
	bind:value={selectedSubCategory}
	classes="min-w-[130px] shadow border-none"
	placeholder="서브카테고리"
	onSelect={async (option) => {
		selectedBrand = brands.find(
			(sb) => sb.name === '전체'
		);
	}}
/>
<div class="mx-1" />
<DropdownSelect
	options={brands}
	classes="min-w-[100px] shadow border-none"
	bind:value={selectedBrand}
	placeholder="브랜드"
/>
