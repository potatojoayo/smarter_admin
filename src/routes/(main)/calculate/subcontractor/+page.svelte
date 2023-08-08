<script>
	import DropdownSelectSelf from '$lib/components/DropdownSelectSelf.svelte';
	import CheckBox from '$lib/components/CheckBox.svelte';
	import Button from '$lib/components/Button.svelte';
	import { page } from '$app/stores';
	import Th from '$lib/components/Th.svelte';
	import {
		completeSubcontractorCalculation,
		getSubcontractorCalculations
	} from '../../../../stores/calculate.js';
	import formatMoney from '$lib/utils/formatMoney';
	import Td from '$lib/components/Td.svelte';
	import Tr from '$lib/components/Tr.svelte';

	export let data;

	let subcontractors = [
		'전체',
		...data.subcontractors
	];
	let selectedSubcontractor = '전체';

	const now = new Date();
	let years = [];
	let earliestYear = 2021;
	let currentYear = now.getFullYear();
	let selectedYear = currentYear;
	let periods = ['전체', '월초', '월말'];
	let period = '전체';
	let totalCount = 0;
	let currentPage = 0;

	let calculations = [];
	let totalPriceWork = 0;
	let totalWorkAmount = 0;
	let totalPriceWorkLabor = 0;

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
		getSubcontractorCalculations(
			selectedYear,
			selectedMonth,
			period,
			selectedSubcontractor,
			currentPage
		).then((result) => {
			calculations = result.calculations;
			totalPriceWork = result.totalPriceWork;
			totalPriceWorkLabor =
				result.totalPriceWorkLabor;
			totalWorkAmount = result.totalWorkAmount;
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

<section class="mt-5 rounded border bg-white">
	<table class="w-full">
		<thead>
			<tr>
				<Th>합계</Th>
				<Th>정산기간</Th>
				<Th>총 작업량</Th>
				<Th>총 작업비</Th>
				<Th>총 정산금액 (총 작업용역비)</Th>
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
						: selectedYear}.{selectedMonth === 12
						? 1
						: selectedMonth + 1}.{period ===
					'월초'
						? 16
						: 1}
				</Td>
				<Td>
					{totalWorkAmount}
				</Td>
				<Td>
					{formatMoney({
						money: totalPriceWork
					})}
				</Td>
				<Td>
					{formatMoney({
						money: totalPriceWorkLabor
					})}
				</Td>
			</tr>
		</tbody>
	</table>
</section>

<section class="flex mt-5">
	<Button
		classes="ml-auto"
		onClick={() => {
			open(
				`${$page.url.origin}/print/calculate/subcontractor?year=${selectedYear}&month=${selectedMonth}&subcontractor=${selectedSubcontractor}`,
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
					'선택하신 작업실의 정산을 완료하시겠습니까?'
				)
			) {
				let calculationIds = [];
				calculations.forEach((c) => {
					if (c.checked) {
						calculationIds.push(c.calculationId);
					}
				});
				if (
					await completeSubcontractorCalculation(
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

<main class="mt-5 border rounded bg-white">
	<table class="w-full">
		<thead>
			<tr>
				<Th>작업실</Th>
				<Th>정산기간</Th>
				<Th>작업량</Th>
				<Th>총 작업비</Th>
				<Th>정산금액 (작업용역비)</Th>
				<Th>정산상태</Th>
				<Th>
					<CheckBox
						group="calculate"
						parent
						onChange={(checked) => {
							calculations.forEach(
								(cal) => (cal.checked = checked)
							);
						}}
					/>
				</Th>
			</tr>
		</thead>
		<tbody>
			{#each calculations as calc}
				<Tr>
					<Td>
						{calc.subcontractor.name}
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
						{calc.workAmount}
					</Td>
					<Td>
						{formatMoney({
							money: calc.totalPriceWork
						})}
					</Td>
					<Td>
						{formatMoney({
							money: calc.totalPriceWorkLabor
						})}
					</Td>
					<Td>
						<div
							class="border rounded {calc.state ===
							'정산전'
								? 'bg-red-200 text-red-800 border-red-200'
								: 'bg-green-200 text-green-800 border-green-200'}"
						>
							{calc.state}
						</div>
					</Td>
					<Td>
						<CheckBox
							disabled={calc.state === '정산완료'}
							group="calculate"
							onChange={(checked) => {
								calc.checked = checked;
							}}
						/>
					</Td>
				</Tr>
			{/each}
		</tbody>
	</table>
</main>
