<script>
	import DropdownSelectSelf from '$lib/components/DropdownSelectSelf.svelte';
	import Th from '$lib/components/Th.svelte';
	import formatMoney from '$lib/utils/formatMoney';
	import Td from '$lib/components/Td.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import InputDate from '$lib/components/InputDate.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	export let data;

	let subcontractors = [
		'전체',
		...data.subcontractors
	];
	let selectedSubcontractor = '전체';

	const now = new Date();
	let totalCount = 0;
	let currentPage = 1;

	let dateFrom = new Date(
		now.getFullYear(),
		now.getMonth() - 2,
		1
	);
	let dateTo = now;

	let statistics = [];
</script>

<section class="flex flex-col border rounded p-5">
	<div class="flex items-center">
		<span class="w-28">작업실</span>
		<div class="mx-3" />
		<DropdownSelectSelf
			options={subcontractors}
			bind:value={selectedSubcontractor}
		/>
	</div>
	<div class="my-2" />
	<div class="flex items-center">
		<span class="w-28">정산기간</span>
		<div class="mx-3" />
		<div class="flex items-center">
			<InputDate bind:value={dateFrom} />
			<div class="mx-2">~</div>
			<InputDate bind:value={dateTo} />
			<div class="mx-2" />
		</div>
	</div>
</section>

<LoadingIndicator>
	<main class="mt-5 border rounded">
		<table class="w-full">
			<thead>
				<tr>
					<Th>작업실</Th>
					<Th>작업량</Th>
					<Th>작업비 합계</Th>
					<Th>작업용역비 합계</Th>
					<Th>조회기간</Th>
				</tr>
			</thead>
			<tbody>
				{#each statistics as stat}
					<Tr>
						<Td>
							{stat.subcontractor.name}
						</Td>
						<Td>
							{stat.workAmount}
						</Td>
						<Td>
							{formatMoney({
								money: stat.totalPriceWork
							})}
						</Td>
						<Td>
							{formatMoney({
								money: stat.totalPriceWorkLabor
							})}
						</Td>
						<Td>
							{new Date(
								stat.dateFrom
							).toLocaleDateString()} ~
							{new Date(
								stat.dateTo
							).toLocaleDateString()}
						</Td>
					</Tr>
				{/each}
			</tbody>
		</table>
	</main>

	<Pagination
		{totalCount}
		classes="my-10"
		current={currentPage}
	/>
</LoadingIndicator>
