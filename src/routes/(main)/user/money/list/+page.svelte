<script>
	import LgBlack from '$lib/components/base/LgBlack.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import Th from '$lib/components/Th.svelte';
	import Td from '$lib/components/Td.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import DropdownSelectValue from '$lib/components/DropdownSelectValue.svelte';
	import formatMoney from '$lib/utils/formatMoney';
	import { page } from '$app/stores';
	import { formatPhone } from '$lib/utils/formatPhone';
	import { formatDate } from '$lib/utils/formatDate';
	import { goto } from '$app/navigation';

	export let data;
	let histories = [];
	let totalCount = 0;
	$: histories = data.gymsSmarterMoneyHistories;
	$: totalCount = data.totalCount;

	let years = [2023, 2022, 2021, 2020];
	let year = new Date().getFullYear();
	let months = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
	];
	let month = new Date().getMonth() + 1;
</script>

<nav>
	<div class="flex justify-between items-center">
		<div class="flex space-x-2">
			<div
				class="flex justify-center items-center space-x-2"
			>
				<DropdownSelectValue
					classes="min-w-[80px] ml-5 h-10 shadow border-none z-10"
					options={years}
					onSelect={async (option) => {
						let query = new URLSearchParams(
							$page.url.searchParams.toString()
						);
						query.set('year', option);
						query.set('page', '1');
						await goto(`?${query.toString()}`);
					}}
					value={year}
				/>
				<LgBlack>년</LgBlack>
			</div>
			<div
				class="flex justify-center items-center space-x-2"
			>
				<DropdownSelectValue
					classes="min-w-[80px] ml-5 h-10 shadow border-none z-10"
					options={months}
					onSelect={async (option) => {
						let query = new URLSearchParams(
							$page.url.searchParams.toString()
						);
						query.set('month', option);
						query.set('page', '1');
						await goto(`?${query.toString()}`);
					}}
					value={month}
				/>
				<LgBlack>월</LgBlack>
			</div>
		</div>

		<SearchBar />
	</div>
</nav>

<main
	class="overflow-x-scroll relative mt-5 border rounded bg-white border"
>
	<table class="w-full">
		<thead>
			<tr>
				<Th>거래일시</Th>
				<Th>체육관</Th>
				<Th>전화번호</Th>
				<Th>주문번호</Th>
				<Th>내용</Th>
				<Th>거래금액</Th>
			</tr>
		</thead>
		<tbody>
			{#each histories as history}
				<Tr>
					<Td whitespaceNoWrap
						>{formatDate(history.dateCreated)}</Td
					>
					<Td whitespaceNoWrap
						>{history.wallet.gymName}</Td
					>
					<Td
						>{formatPhone(
							history.wallet.phone
						)}</Td
					>
					<Td whitespaceNoWrap
						>{history.historyNumber}</Td
					>
					<Td>{history.transactionType}</Td>
					<Td
						>{formatMoney({
							money: history.amount
						})}</Td
					>
				</Tr>
			{/each}
		</tbody>
	</table>
</main>
<Pagination {totalCount} classes="my-10" />
