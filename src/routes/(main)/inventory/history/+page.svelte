<script>
	import InputDate from '$lib/components/InputDateSearchParam.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { page } from '$app/stores';
	import Th from '$lib/components/Th.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import Td from '$lib/components/Td.svelte';
	import { getChangeHistories } from '../../../../stores/inventory.js';
	import Pagination from '$lib/components/Pagination.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';

	$: dateFrom =
		$page.url.searchParams.get('dateFrom');
	$: dateTo =
		$page.url.searchParams.get('dateTo');

	let histories = [];
	let totalCount = 0;

	$: {
		getChangeHistories(
			$page.url.searchParams.get('page'),
			$page.url.searchParams.get('dateFrom'),
			$page.url.searchParams.get('dateTo'),
			$page.url.searchParams.get('keyword')
		).then((result) => {
			histories = result.histories;
			totalCount = result.totalCount;
		});
	}
</script>

<nav class="flex flex-col">
	<div class="flex justify-between mt-5">
		<div class="flex items-center">
			<InputDate param="dateFrom" max={dateTo} />
			<span class="mx-3 text-3xl"> ~ </span>
			<InputDate param="dateTo" />
			<SearchBar classes="ml-5" />
		</div>
	</div>
</nav>

<LoadingIndicator>
	<main class="mt-5 border rounded">
		<table class="w-full">
			<thead>
				<tr>
					<Th>날짜</Th>
					<Th>상품번호</Th>
					<Th>색상</Th>
					<Th>사이즈</Th>
					<Th>상품명</Th>
					<Th>이전 재고수량</Th>
					<Th>변동 재고수량</Th>
					<Th>최종 재고수량</Th>
					<Th>변동사유</Th>
				</tr>
			</thead>
			<tbody>
				{#each histories as history}
					<Tr>
						<Td classes="h-16"
							>{new Date(
								history.dateCreated
							).toLocaleDateString()}</Td
						>
						<Td>{history.product.modelNumber}</Td>
						<Td>{history.product.color}</Td>
						<Td>{history.product.size}</Td>
						<Td>{history.product.name}</Td>
						<Td>{history.quantityBefore}</Td>
						<Td>
							<div
								class="{history.quantityChanged >=
								0
									? 'bg-green-200 border-green-200 text-green-800'
									: 'bg-rose-200 border-rose-200 text-rose-800'} border rounded p-2"
							>
								{history.quantityChanged > 0
									? `+${history.quantityChanged}`
									: history.quantityChanged}
							</div>
						</Td>
						<Td>{history.quantityAfter}</Td>
						<Td>{history.reason}</Td>
					</Tr>
				{/each}
			</tbody>
		</table>
	</main>

	<Pagination {totalCount} classes="my-10" />
</LoadingIndicator>
