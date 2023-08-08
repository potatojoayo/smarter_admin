<script>
	import InputDate from '$lib/components/InputDateSearchParam.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { page } from '$app/stores';
	import Tr from '$lib/components/Tr.svelte';
	import Td from '$lib/components/Td.svelte';
	import Th from '$lib/components/Th.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { dateToIsoDateString } from '$lib/utils/dateToIsoDateString';
	import { getWorks } from '../../../../stores/work.js';
	import Pagination from '$lib/components/Pagination.svelte';
	import formatPhone from '../../../../utils/format_phone';
	import CheckBox from '$lib/components/CheckBox.svelte';
	import { getSubcontractorColor } from '$lib/utils/getSubcontractorColor.js';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';

	$: state = $page.url.searchParams.get('state');
	$: dateFrom =
		$page.url.searchParams.get('dateFrom');
	$: dateTo =
		$page.url.searchParams.get('dateTo');

	let checked = [];
	let works = [];
	let totalCount = 0;
	let subcontractors = [];

	$: {
		getWorks({
			page: $page.url.searchParams.get('page'),
			dateFrom:
				$page.url.searchParams.get('dateFrom'),
			dateTo:
				$page.url.searchParams.get('dateTo'),
			subcontractor: $page.url.searchParams.get(
				'subcontractor'
			),
			isOutWorking: true,
			keyword:
				$page.url.searchParams.get('keyword')
		}).then((result) => {
			works = result.works;
			totalCount = result.totalCount;
			subcontractors = [
				'전체',
				...result.subcontractors.map(
					(s) => s.name
				)
			];
		});
	}
</script>

<nav class="flex flex-col">
	<!--	<SubcontractorNav {subcontractors} />-->
	<div class="flex justify-between mt-5">
		<div class="flex items-center">
			<InputDate param="dateFrom" max={dateTo} />
			<span class="mx-3 text-3xl"> ~ </span>
			<InputDate param="dateTo" />
			<SearchBar classes="ml-5" />
		</div>
		<div class="flex">
			<Button>
				<i class="fa fa-download mr-1" />
				<span>내보내기</span>
			</Button>
		</div>
	</div>
</nav>

<LoadingIndicator>
	<main class="mt-3 rounded border">
		<table class="w-full">
			<thead>
				<tr>
					<Th>주문번호</Th>
					<Th>작업실</Th>
					<Th>주문자</Th>
					<Th>주문상품</Th>
					<Th>작업시작날짜</Th>
					<Th>작업지시서</Th>
				</tr>
			</thead>
			<tbody>
				{#each works as work}
					<Tr>
						<Td whitespaceNoWrap>
							<div class="flex flex-col">
								<Button
									classes="!px-1"
									onClick={() =>
										goto(
											'/order/detail/' +
												work.orderMaster.id
										)}
								>
									{work.orderMaster.orderNumber}
								</Button>
							</div>
						</Td>
						<Td>
							<div
								class="rounded p-2 {getSubcontractorColor(
									work.subcontractor.name
								)}"
							>
								{work.subcontractor.name}
							</div>
						</Td>
						<Td>
							{work.orderMaster.user.gym.name}
							<br />
							{work.orderMaster.user.name}
							<br />
							{formatPhone(
								work.orderMaster.user.phone
							)}
						</Td>
						<Td>
							{work.productNames}
						</Td>
						<Td>
							{dateToIsoDateString(
								work.dateCreated
							)}
						</Td>
						<Td>
							<Button
								onClick={() => {
									goto(`direction/${work.id}`);
								}}>작업지시서</Button
							>
						</Td>
					</Tr>
				{/each}
			</tbody>
		</table>
	</main>
	<Pagination {totalCount} classes="my-5" />
</LoadingIndicator>
