<script>
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Button from '$lib/components/Button.svelte';
	import Th from '$lib/components/Th.svelte';
	import CheckBox from '$lib/components/CheckBox.svelte';
	import InventoryTableRow from '$lib/components/inventory/InventoryTableRow.svelte';
	import DialogChangeInventory from '$lib/components/inventory/DialogChangeInventory.svelte';
	import { page } from '$app/stores';
	import {
		createInventoryOrder,
		getInventoryProducts,
		selectedProduct
	} from '../../../stores/inventory.js';
	import Pagination from '$lib/components/Pagination.svelte';
	import { checkedProducts } from '../../../stores/product.js';
	import CategoryBrandDropdown from '$lib/components/product/CategoryBrandDropdown.svelte';

	let products = [];
	let totalCount = 0;
	let currentPage;
	let category;
	let subCategory;
	let brand;

	$: {
		let searchKeyword =
			$page.url.searchParams.get('keyword');
		currentPage =
			$page.url.searchParams.get('page');
		let offset = (currentPage - 1) * 20;
		getInventoryProducts(
			category,
			subCategory,
			brand,
			searchKeyword,
			offset
		).then((result) => {
			products = result.products;
			totalCount = result.totalCount;
		});
	}
</script>

<nav class="flex flex-col">
	<div class="flex justify-between mt-5">
		<div class="flex flex-col">
			<div class="flex items-center">
				<CategoryBrandDropdown
					bind:category
					bind:subCategory
					bind:brand
				/>
			</div>
			<SearchBar classes="ml-5 mt-5" />
		</div>
		<div class="flex">
			<Button
				classes="p-3 h-fit"
				onClick={async () => {
					if ($checkedProducts.length === 0) {
						return alert(
							'발주하실 상품을 선택해주세요.'
						);
					}
					if (
						confirm(
							'선택하신 상품의 발주서를 생성하시겠습니까?'
						)
					) {
						if (
							await createInventoryOrder(
								$checkedProducts
							)
						) {
							alert(
								'선택하신 상품의 발주서가 생성되었습니다.'
							);
							return location.reload();
						}
						alert('실패');
					}
				}}
			>
				<span>발주하기</span>
			</Button>
		</div>
	</div>
</nav>

<main class="mt-5 border rounded">
	<table class="w-full">
		<thead>
			<tr>
				<Th>상품번호</Th>
				<!--				<Th>카테고리</Th>-->
				<!--				<Th>브랜드</Th>-->
				<Th>상품명</Th>
				<Th>상태</Th>
				<Th>색깔</Th>
				<Th>사이즈</Th>
				<Th>재고수량</Th>
				<Th>입고예정수량</Th>
				<Th>임계재고수량</Th>
				<Th>목표재고수량</Th>
				<Th>상품등록일</Th>
				<Th
					><CheckBox
						parent
						group="inventory"
						onChange={(checked) => {
							if (checked) {
								$checkedProducts = products;
							} else {
								$checkedProducts = [];
							}
						}}
					/></Th
				>
			</tr>
		</thead>
		<tbody>
			{#each products as product}
				<InventoryTableRow {product} />
			{/each}
		</tbody>
	</table>
</main>

<Pagination {totalCount} classes="my-10" />

{#if $selectedProduct}
	<DialogChangeInventory />
{/if}
