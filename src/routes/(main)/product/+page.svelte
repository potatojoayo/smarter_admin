<script>
	import { page } from '$app/stores';
	import ProductStateNav from '$lib/components/product/ProductStateNav.svelte';
	import Button from '$lib/components/Button.svelte';
	import Th from '$lib/components/Th.svelte';
	import { goto } from '$app/navigation';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import Td from '$lib/components/Td.svelte';
	import {
		getProductMasters,
		productPage,
		category,
		subCategory,
		brand
	} from '$stores/product.js';
	import Pagination from '$lib/components/Pagination.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import { isLoading } from '$stores/global_setting.js';
	import CategoryBrandDropdown from '$lib/components/product/CategoryBrandDropdown.svelte';
	import formatMoney from '$lib/utils/formatMoney';
	import { getColor } from '$lib/utils/getColor';

	let productMasters = [];
	let currentPage = $productPage;
	let totalCount = 0;
	let state;
	let prevCategory;
	let prevSubCategory;
	let prevBrand;

	$: {
		state = $page.url.searchParams.get('state');
		let keyword =
			$page.url.searchParams.get('keyword');

		$productPage = currentPage;

		if (prevCategory !== $category) {
			if (prevCategory) {
				$productPage = 1;
			}
			prevCategory = $category;
		}

		if (prevSubCategory !== $subCategory) {
			if (prevSubCategory) {
				$productPage = 1;
			}
			prevSubCategory = $subCategory;
		}

		if (prevBrand !== $brand) {
			if (prevBrand) {
				$productPage = 1;
			}
			prevBrand = $brand;
		}

		loadProductMasters(
			$category,
			$subCategory,
			$brand,
			keyword,
			$productPage
		);
	}

	async function loadProductMasters(
		category,
		subCategory,
		brand,
		input,
		p
	) {
		currentPage = $productPage;
		isLoading.set(true);
		const result = await getProductMasters(
			p,
			category,
			subCategory,
			brand,
			state,
			input
		);
		productMasters = result.productMasters;
		totalCount = result.totalCount;
		isLoading.set(false);
	}
</script>

<main class="flex flex-col ">
	<ProductStateNav />
	<div class="flex mt-5">
		<CategoryBrandDropdown
			bind:category={$category}
			bind:subCategory={$subCategory}
			bind:brand={$brand}
		/>
	</div>
	<div
		class="flex justify-between items-center mt-4"
	>
		<SearchBar />

		<Button
			classes="p-3"
			onClick={() => goto('product/new')}
			>새 상품등록</Button
		>
	</div>

	<LoadingIndicator>
		<table
			class="table-auto border-collapse w-full parent mt-8 bg-white border"
		>
			<thead>
				<tr>
					<Th>상품사진</Th>
					<Th>카테고리</Th>
					<Th>브랜드</Th>
					<Th>제품명</Th>
					<Th>상태</Th>
					<Th>색상</Th>
					<Th>사이즈</Th>
					<Th>소비자가</Th>
					<Th>학부모가</Th>
					<Th>체육관가</Th>
					<Th>이리스원가</Th>
				</tr>
			</thead>
			<tbody>
				{#each productMasters as product}
					<Tr
						onClick={() => {
							goto(`product/${product.id}`);
						}}
					>
						<Td>
							<img
								src={`${product.thumbnail}`}
								alt=""
								class="w-14 h-14"
							/>
						</Td>
						<Td>
							{`${product.category.name} > ${product.subCategory.name}`}
						</Td>
						<Td>
							{product.brand.name}
						</Td>
						<Td>
							{product.name}
						</Td>
						<Td>
							<div
								class="{getColor(
									product.state
								)} rounded p-1 text-center text-sm"
							>
								{product.state}
							</div>
						</Td>
						<Td classes="max-w-[200px]">
							{product.colors.join(', ')}
						</Td>
						<Td classes="max-w-[200px]">
							{product.sizes.join(', ')}
						</Td>
						<Td>
							{formatMoney({
								money: product.priceConsumer
							})}
						</Td>
						<Td>
							{formatMoney({
								money: product.priceParent
							})}
						</Td>
						<Td>
							{formatMoney({
								money: product.priceGym
							})}
						</Td>
						<Td>
							{formatMoney({
								money: product.priceVendor
							})}
						</Td>
					</Tr>
				{/each}
			</tbody>
		</table>
		<Pagination
			{totalCount}
			classes="mt-10"
			current={currentPage}
			onChange={(p) => {
				currentPage = p;
			}}
		/>
	</LoadingIndicator>
</main>

<div class="my-10" />
