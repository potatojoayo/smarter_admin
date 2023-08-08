<script>
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Button from '$lib/components/Button.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import Th from '$lib/components/Th.svelte';
	import Td from '$lib/components/Td.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import formatMoney from '$lib/utils/formatMoney';
	import { formatPhone } from '$lib/utils/formatPhone';
	import { changeSearchParam } from '$lib/utils/changeSearchParam';

	export let data;
	let totalCount = 0;
	let wallets = [];
	$: wallets = data.wallets;
	$: totalCount = data.totalCount;

	async function changeSortType(e) {
		changeSearchParam({
			param: 'sortType',
			value: e.target.textContent,
			invalidateAll: true
		});
	}
</script>

<nav class="flex justify-between items-center">
	<SearchBar />
	<div>
		<Button
			onClick={(e) => {
				changeSortType(e);
			}}>보유잔액순</Button
		>
		<Button
			onClick={(e) => {
				changeSortType(e);
			}}>총사용금액순</Button
		>
	</div>
</nav>

<main
	class="overflow-x-scroll relative mt-5 border rounded bg-white border"
>
	<table class="w-full">
		<thead>
			<tr>
				<Th>아이디</Th>
				<Th>체육관</Th>
				<Th>전화번호</Th>
				<Th>누적충전금액</Th>
				<Th>총사용금액</Th>
				<Th>잔액</Th>
			</tr>
		</thead>
		<tbody>
			{#each wallets as wallet}
				<Tr>
					<Td whitespaceNoWrap>{wallet.id}</Td>
					<Td whitespaceNoWrap
						>{wallet.gymName}</Td
					>
					<Td>{formatPhone(wallet.phone)}</Td>
					<Td whitespaceNoWrap
						>{formatMoney({
							money: wallet.totalChargeAmount
						})}</Td
					>
					<Td
						>{formatMoney({
							money: wallet.totalUsedAmount
						})}</Td
					>
					<Td
						>{formatMoney({
							money: wallet.balance
						})}</Td
					>
				</Tr>
			{/each}
		</tbody>
	</table>
</main>
<Pagination {totalCount} classes="my-10" />
