<script>
	import formatMoney from '../../../../utils/format_money';
	import Td from '$lib/components/Td.svelte';
	import { onMount } from 'svelte';
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
				<th
					rowspan="2"
					class="border border-black"
				>
					지사(체육사)
				</th>
				<th
					rowspan="2"
					class="border border-black"
				>
					정산기간
				</th>
				<th
					rowspan="2"
					class="border border-black"
				>
					소속체육관 매출합계
				</th>
				<th
					rowspan="1"
					colspan="2"
					class="border border-black"
				>
					정산
				</th>
				<th
					rowspan="2"
					class="border border-black"
					>최종정산금액</th
				>
				<th
					rowspan="2"
					class="border border-black">정산상태</th
				>
			</tr>
			<tr>
				<th class="border border-black">
					정산대상금액
				</th>
				<th class="border border-black">
					플랫폼사용료
				</th>
			</tr>
		</thead>
		<tbody>
			{#each data.calculations as calc}
				<tr>
					<Td classes="border border-black">
						{calc.agency.name}
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
						{formatMoney(calc.agencyTotalSell)}
					</Td>
					<Td classes="border border-black">
						{formatMoney(calc.priceProfit)}
					</Td>
					<Td classes="border border-black">
						{formatMoney(calc.pricePlatform)}
					</Td>
					<Td classes="border border-black">
						{formatMoney(calc.netProfit)}
					</Td>
					<Td classes="border border-black">
						{calc.state}
					</Td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
