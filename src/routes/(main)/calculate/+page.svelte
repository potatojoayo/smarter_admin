<script>
	import DropdownSelectSelf from '$lib/components/DropdownSelectSelf.svelte';
	import CheckBox from '$lib/components/CheckBox.svelte';
	import Button from '$lib/components/Button.svelte';
	import { page } from '$app/stores';
	import Th from '$lib/components/Th.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import {
		completeAgencyCalculation,
		getAgencyCalculations
	} from '../../../stores/calculate.js';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import Td from '$lib/components/Td.svelte';
	import formatMoney from '../../../utils/format_money';
	import Tr from '$lib/components/Tr.svelte';

	export let data;

	let agencies = ['전체', ...data.agencies];
	let selectedAgency = '전체';
	let currentPage = 1;
	let totalCount = 0;
	let totalNetProfit = 0;
	let totalPricePlatform = 0;
	let totalProfit = 0,
		user = data.me;

	$: user = data.me;

	const now = new Date();
	let years = [];
	let earliestYear = 2021;
	let currentYear = now.getFullYear();
	let selectedYear = currentYear;
	let periods = ['전체', '월초', '월말'];
	let period = '전체';

	for (
		let i = 0;
		earliestYear + i <= currentYear;
		i++
	) {
		years.push(currentYear - i);
	}
	let months = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
	];
	let selectedMonth = now.getMonth();
	if (now.getDate() > 15) {
		if (selectedMonth === 11) {
			selectedMonth = 0;
		} else {
			selectedMonth += 1;
		}
	}

	let calculations = [];
	let totalSell = 0;

	$: if (user) {
		if (user.agency) {
			agencies = [user.agency.name];
			selectedAgency = user.agency.name;
		}
	}

	$: {
		const now = new Date();
		if (selectedYear === now.getFullYear()) {
			months = months.filter(
				(m) => m <= now.getMonth() + 1
			);
		} else {
			months = [
				1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
			];
		}
	}

	$: {
		getAgencyCalculations(
			selectedYear,
			selectedMonth,
			period,
			selectedAgency,
			currentPage
		).then((result) => {
			calculations = result.calculations;
			totalSell = result.totalSell;
			totalNetProfit = result.totalNetProfit;
			totalPricePlatform =
				result.totalPricePlatform;
			totalProfit = result.totalProfit;
			totalCount = result.totalCount;
		});
	}
</script>

<section
	class="flex flex-col border rounded p-5 bg-white"
>
	<div class="flex items-center">
		<span class="w-28">날짜</span>
		<div class="mx-3" />
		<DropdownSelectSelf
			classes="min-w-[80px]"
			options={years}
			bind:value={selectedYear}
		/>
		<div class="mx-3" />
		<DropdownSelectSelf
			classes="min-w-[60px]"
			options={months}
			bind:value={selectedMonth}
		/>
	</div>
	<div class="my-2" />
	<div class="flex items-center">
		<span class="w-28">지사(체육사)</span>
		<div class="mx-3" />
		<DropdownSelectSelf
			disabled={agencies.length === 1}
			options={agencies}
			bind:value={selectedAgency}
		/>
	</div>
	<div class="my-2" />
	<div class="flex items-center">
		<span class="w-28">정산기간</span>
		<div class="mx-3" />
		{#each periods as p}
			<label>
				<input
					type="radio"
					bind:group={period}
					name="periods"
					value={p}
				/>
				{p}
			</label>
			<div class="mx-3" />
		{/each}
	</div>
</section>

<LoadingIndicator>
	{#if !user.agency}
		<section class="mt-5 border rounded bg-white">
			<table class="w-full">
				<thead>
					<tr>
						<Th>합계</Th>
						<Th>정산기간</Th>
						<Th>체육관 총 매출</Th>
						<Th>정산대상금액</Th>
						<Th>플랫폼사용료</Th>
						<Th>정산금액</Th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<Td />
						<Td
							>{selectedYear}.{selectedMonth}.{period ===
							'월말'
								? 16
								: 1} ~ {selectedMonth === 12
								? selectedYear + 1
								: selectedYear}.{selectedMonth ===
							12
								? 1
								: selectedMonth + 1}.{period ===
							'월초'
								? 16
								: 1}
						</Td>
						<Td>
							{formatMoney(totalSell)}
						</Td>
						<Td>
							{formatMoney(totalProfit)}
						</Td>
						<Td>
							{formatMoney(totalPricePlatform)}
						</Td>
						<Td>
							{formatMoney(totalNetProfit)}
						</Td>
					</tr>
				</tbody>
			</table>
		</section>
	{/if}

	{#if !user.agency}
		<section class="flex mt-5">
			<Button
				classes="ml-auto"
				onClick={() => {
					open(
						`${$page.url.origin}/print/calculate?year=${selectedYear}&month=${selectedMonth}&agency=${selectedAgency}`,
						'_blank',
						'height=800, width=1200'
					);
				}}
			>
				<i class="fa fa-download mr-1" />
				<span>내보내기</span>
			</Button>
			<Button
				classes="ml-3 p-3"
				onClick={async () => {
					if (
						confirm(
							'선택하신 지사의 정산을 완료하시겠습니까?'
						)
					) {
						let calculationIds = [];
						calculations.forEach((c) => {
							if (c.checked) {
								calculationIds.push(
									c.calculationId
								);
							}
						});
						if (
							await completeAgencyCalculation(
								calculationIds
							)
						) {
							alert('정산이 완료되었습니다.');
							return location.reload();
						}
						alert('실패');
					}
				}}>정산하기</Button
			>
		</section>
	{/if}

	<main class="mt-5 border rounded bg-white">
		<table class="w-full">
			<thead>
				<tr>
					<Th>지사(체육사)</Th>
					<Th>정산기간</Th>
					<Th>소속체육관 매출합계</Th>
					<Th>정산대상금액</Th>
					{#if !user.agency}
						<Th>플랫폼사용료</Th>
					{/if}
					<Th>최종정산금액</Th>
					<Th>정산상태</Th>
					{#if !user.agency}
						<Th
							><CheckBox
								group="calculate"
								parent
								onChange={(checked) => {
									calculations.forEach(
										(cal) =>
											(cal.checked = checked)
									);
								}}
							/></Th
						>
					{/if}
				</tr>
			</thead>
			<tbody>
				{#each calculations as calc, index}
					<Tr>
						<Td>
							{calc.agency.name}
						</Td>
						<Td>
							{new Date(
								calc.dateFrom
							).toLocaleDateString()} ~
							{new Date(
								calc.dateTo
							).toLocaleDateString()}
						</Td>
						<Td>
							{formatMoney(calc.agencyTotalSell)}
						</Td>
						<Td>
							{formatMoney(calc.priceProfit)}
						</Td>
						{#if !user.agency}
							<Td>
								{formatMoney(calc.pricePlatform)}
							</Td>
						{/if}
						<Td>
							{formatMoney(calc.netProfit)}
						</Td>
						<Td>
							<div
								class="text-center border rounded {calc.state ===
								'정산전'
									? 'bg-red-200 text-red-800 border-red-200'
									: 'bg-green-200 text-green-800 border-green-200'}"
							>
								{calc.state}
							</div>
						</Td>

						{#if !user.agency}
							<Td>
								<CheckBox
									disabled={calc.state ===
										'정산완료'}
									group="calculate"
									onChange={(checked) => {
										calc.checked = checked;
									}}
								/>
							</Td>
						{/if}
					</Tr>
				{/each}
			</tbody>
		</table>
	</main>
	<Pagination
		classes="my-10"
		{totalCount}
		current={currentPage}
		onChange={(p) => (currentPage = p)}
	/>
</LoadingIndicator>
