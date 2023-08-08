<script>
	import { page } from '$app/stores';
	import Th from '$lib/components/Th.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import Td from '$lib/components/Td.svelte';
	import { dateToIsoDateString } from '$lib/utils/dateToIsoDateString';
	import Pagination from '$lib/components/Pagination.svelte';
	import { isLoading } from '../../../../stores/global_setting.js';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import CategoryBrandDropdown from '$lib/components/product/CategoryBrandDropdown.svelte';
	import InputDate from '$lib/components/InputDate.svelte';
	import Button from '$lib/components/Button.svelte';

	let productMasters = [];
	let totalCount = 0;
	let currentPage = 1;
	let now = new Date();
	let dateFrom = new Date(
		now.getFullYear(),
		now.getMonth() - 2,
		1
	);
	let dateTo = now;

	let category;
	let subCategory;
	let brand;
</script>

<section
	class="flex flex-col  items-start border p-5"
>
	<div class="flex">
		<CategoryBrandDropdown
			{category}
			{subCategory}
			{brand}
		/>
	</div>
	<div class="my-2" />
	<div
		class="flex items-center justify-between w-full"
	>
		<div class="flex items-center">
			<InputDate bind:value={dateFrom} />
			<div class="mx-2">~</div>
			<InputDate bind:value={dateTo} />
			<div class="mx-2" />
			<SearchBar />
		</div>
		<!--			<Button-->
		<!--				classes="p-3"-->
		<!--				onClick={() => {-->
		<!--					open(-->
		<!--						`${$page.url.origin}/print/statistic/prods?dateFrom=${dateFrom}&dateTo=${dateTo}&category=${category}&subCategory=${subCategory}&brand=${brand}`,-->
		<!--						'_blank',-->
		<!--						'height=800, width=1200'-->
		<!--					);-->
		<!--				}}-->
		<!--			>-->
		<!--				<i class="fa fa-download mr-1" />-->
		<!--				<span>내보내기</span>-->
		<!--			</Button>-->
	</div>
</section>

<main class="flex flex-col">
	<LoadingIndicator>
		<table
			class="table-auto border-collapse w-full parent mt-3 border rounded"
		>
			<thead>
				<tr>
					<Th>카테고리</Th>
					<Th>브랜드</Th>
					<Th>상품명</Th>
					<Th>총 판매금액</Th>
					<Th>조회기간</Th>
				</tr>
			</thead>
			<tbody>
				{#each productMasters as product}
					<Tr>
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
							{dateToIsoDateString(
								product.dateCreated
							)}
						</Td>
						<Td>
							{dateToIsoDateString(
								product.dateUpdated
							)}
						</Td>
					</Tr>
				{/each}
			</tbody>
		</table>
		<Pagination
			{totalCount}
			classes="mt-10"
			current={currentPage}
		/>
	</LoadingIndicator>
</main>

<div class="my-10" />
