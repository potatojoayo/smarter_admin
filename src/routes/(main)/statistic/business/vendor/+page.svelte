<script>
	import Th from '$lib/components/Th.svelte';
	import InputDate from '$lib/components/InputDate.svelte';
	import StatisticBusinessNav from '$lib/components/statistic/StatisticBusinessNav.svelte';

	export let data;

	const now = new Date();
	let dateFrom = new Date(
		now.getFullYear(),
		now.getMonth() - 2,
		1
	);
	let dateTo = now;
</script>

<StatisticBusinessNav />
<section
	class="flex flex-col border rounded p-5 mt-5"
>
	<div class="flex items-center">
		<span class="w-28">조회기간</span>
		<div class="mx-3" />
		<div class="flex items-center">
			<InputDate bind:value={dateFrom} />
			<div class="mx-2">~</div>
			<InputDate bind:value={dateTo} />
			<div class="mx-2" />
		</div>
	</div>
</section>

<main class="mt-5 border rounded">
	<table class="w-full">
		<thead>
			<tr>
				<Th rowspan="1" colspan="4">총 매출액</Th>
				<Th rowspan="2">결제총액<br />(A)</Th>
				<Th rowspan="2">반품<br />(B)</Th>
				<Th rowspan="2"
					>총 결제금액<br />(C = A - B)</Th
				>
				<Th rowspan="2">이리스 매출 이익</Th>
			</tr>
			<tr>
				<Th rowspan="1">무통장입금</Th>
				<Th rowspan="1">카드</Th>
				<Th rowspan="1">계좌이체</Th>
				<Th rowspan="1">스마터머니</Th>
			</tr>
		</thead>
	</table>
</main>

<section class="mt-40 border rounded">
	<table class="w-full">
		<thead>
			<tr>
				<Th>상품금액<br />(A)</Th>
				<Th>작업비<br />(B)</Th>
				<Th>작업용역비</Th>
				<Th>주문금액<br />(C = A + B)</Th>
				<Th>배송비<br />(D)</Th>
				<Th>총 매출액<br />(F = C + D)</Th>
			</tr>
		</thead>
	</table>
</section>
