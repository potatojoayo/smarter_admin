<script>
	import formatMoney from '../../../../../utils/format_money';
	import Td from '$lib/components/Td.svelte';
	import { onMount } from 'svelte';
	import Th from '$lib/components/Th.svelte';
	export let data;
	onMount(() => {
		print();
	});
</script>

<main class="p-5 ">
	<table
		class="w-full border-collapse border border-black"
	>
		<thead>
			<tr>
				<th class="border border-black">작업실</th
				>
				<th class="border border-black"
					>정산기간</th
				>
				<th class="border border-black">작업량</th
				>
				<th class="border border-black"
					>총 작업비</th
				>
				<th class="border border-black"
					>정산금액</th
				>
				<th class="border border-black"
					>정산상태</th
				>
			</tr>
		</thead>
		<tbody>
			{#each data.calculations as calc}
				<tr>
					<Td classes="border border-black">
						{calc.subcontractor.name}
					</Td>
					<Td classes="border border-black">
						{new Date(
							calc.dateFrom
						).toLocaleDateString()} ~
						{new Date(
							calc.dateTo
						).toLocaleDateString()}
					</Td>
					<Td classes="border border-black">
						{calc.workAmount}
					</Td>
					<Td classes="border border-black">
						{formatMoney(calc.totalPriceWork)}
					</Td>
					<Td classes="border border-black">
						{formatMoney(
							calc.totalPriceWorkLabor
						)}
					</Td>
					<Td classes="border border-black">
						{calc.state}
					</Td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
