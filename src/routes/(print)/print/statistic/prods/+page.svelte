<script>
	import formatMoney from '../../../../../utils/format_money';
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
				<th class="border border-black"
					>카테고리</th
				>
				<th class="border border-black">브랜드</th
				>
				<th class="border border-black">상품명</th
				>
				<th class="border border-black"
					>총 판매금액</th
				>
				<th class="border border-black"
					>조회기간</th
				>
			</tr>
		</thead>
		<tbody>
			{#each data.statistics as statistic}
				<tr>
					<Td classes="border border-black">
						{statistic.category} > {statistic.subCategory}
					</Td>
					<Td classes="border border-black">
						{statistic.brand}
					</Td>
					<Td classes="border border-black">
						{statistic.product}
					</Td>
					<Td classes="border border-black">
						{formatMoney(
							statistic.totalPriceWorkLabor
						)}
					</Td>
					<Td classes="border border-black">
						{new Date(
							statistic.dateFrom
						).toLocaleDateString()} ~
						{new Date(
							statistic.dateTo
						).toLocaleDateString()}
					</Td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
