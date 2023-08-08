<script lang="ts">
	import InputDate from '$lib/components/InputDateSearchParam.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { page } from '$app/stores';
	import Tr from '$lib/components/Tr.svelte';
	import Td from '$lib/components/Td.svelte';
	import Th from '$lib/components/Th.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { dateToIsoDateString } from '$lib/utils/dateToIsoDateString';
	import CheckBox from '$lib/components/CheckBox.svelte';
	import {
		completeWorks,
		getWorks
	} from '../../../stores/work.js';
	import SubcontractorNav from '$lib/components/work/SubcontractorNav.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import formatPhone from '../../../utils/format_phone';
	import { getSubcontractorColor } from '$lib/utils/getSubcontractorColor.js';
	import DropdownSelectValue from '$lib/components/DropdownSelectValue.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import mixpanel from 'mixpanel-browser';

	export let data;
	const { me } = data;
	let state = '전체';
	let checked: boolean[] = [];
	let works = [];
	let totalCount = 0;
	let subcontractors = [];
	let checkedWorks = [];
	let stateOptions = [
		'전체',
		'작업중',
		'작업완료'
	];

	$: dateTo =
		$page.url.searchParams.get('dateTo');
	$: selectedSubcontractor =
		$page.url.searchParams.get('subcontractor');
	$: state = $page.url.searchParams.get('state');

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
			isOutWorking: false,
			state,
			keyword:
				$page.url.searchParams.get('keyword')
		}).then((result) => {
			works = result.works;
			totalCount = result.totalCount;
			subcontractors = result.subcontractors;
			/*
			dailyCumulativeWorks =
				result.subcontractors.map(
					(s) => s.dailyCumulativeWork
				);
*/
		});
	}
</script>

<nav class="flex flex-col">
	<SubcontractorNav
		subcontractors={me.subcontractor
			? [me.subcontractor.name]
			: [
					'전체',
					...subcontractors.map((s) => s.name)
			  ]}
	/>
	<div class="flex justify-between mt-5">
		<div class="flex items-center">
			<InputDate param="dateFrom" max={dateTo} />
			<span class="mx-3 text-3xl"> ~ </span>
			<InputDate param="dateTo" />
			<SearchBar classes="ml-5" />
			<DropdownSelectValue
				classes="min-w-[100px] ml-5 h-10 shadow border-none"
				placeholder="상태"
				options={stateOptions}
				onSelect={async (option) => {
					let query = new URLSearchParams(
						$page.url.searchParams.toString()
					);
					query.set('state', option);
					query.set('page', '1');
					await goto(`?${query.toString()}`);
				}}
				value={state}
			/>
		</div>
		<div class="flex space-x-4">
			{#if selectedSubcontractor !== '전체'}
				<Button
					onClick={() => {
						window.open(
							`${
								$page.url.origin
							}/print/direction/${checked.join(
								','
							)}`,
							'_blank',
							'height=800, width=1400'
						);
					}}>리스트 인쇄</Button
				>
			{/if}
			{#if !['전체', '전처리작업실'].includes(selectedSubcontractor)}
				<Button
					onClick={async () => {
						if (checked.length === 0) {
							return alert(
								'적어도 하나의 작업을 선택해주세요.'
							);
						}
						if (
							confirm(
								'선택하신 작업을 완료하시겠습니까?'
							)
						) {
							if (await completeWorks(checked)) {
								console.log(checked);
								checkedWorks.forEach((c) => {
									mixpanel.track('작업 완료', c);
								});
								alert(
									'선택하신 작업이 완료되었습니다.'
								);
								return location.reload();
							}
							alert('실패');
						}
					}}
				>
					<span>작업완료</span>
				</Button>
			{/if}
		</div>
	</div>
</nav>

<div class="bg-white border mt-8">
	<LoadingIndicator>
		<main class="">
			<table class="w-full">
				<thead>
					<tr>
						<Th classes="w-20">주문번호</Th>
						<Th classes="w-32">작업실</Th>
						<Th classes="w-40">주문도장</Th>
						<Th classes="w-32">전화번호</Th>
						<Th>주문상품</Th>
						<Th classes="w-24">상태</Th>
						<Th classes="w-32">작업시작날짜</Th>
						{#if selectedSubcontractor !== '전처리작업실' && selectedSubcontractor !== '전체'}
							<Th
								><CheckBox
									parent
									group="work"
									onChange={(check) => {
										if (check) {
											works.forEach((work) => {
												checked.push(work.workId);
												checkedWorks.push(work);
											});
										} else {
											checked = [];
											checkedWorks = [];
										}
									}}
								/></Th
							>
						{/if}
					</tr>
				</thead>
				<tbody>
					{#each works as work}
						<Tr
							classes="cursor-pointer"
							onClick={() => {
								goto(`work/direction/${work.id}`);
							}}
						>
							<Td whitespaceNoWrap>
								<button
									class="pl-1 text-blue-500 hover:text-blue-700 "
									on:click={(e) => {
										e.stopPropagation();
										goto(
											'/order/detail/' +
												work.orderMaster.id
										);
									}}
								>
									{work.orderMaster.orderMasterId}
								</button>
							</Td>
							<Td>
								<div
									class="rounded p-2 whitespace-nowrap text-xs w-fit {getSubcontractorColor(
										work.subcontractor.name
									)}"
								>
									{work.subcontractor.name}
								</div>
							</Td>
							<Td>
								{work.orderMaster.user.gym.name}
							</Td>
							<Td>
								{formatPhone(
									work.orderMaster.user.phone
								)}
							</Td>
							<Td>
								{work.productNames}
							</Td>
							<Td>
								{#if work.state === '작업중'}
									<div
										class="bg-error border-error text-red-800 !p-2 rounded w-fit"
									>
										작업중
									</div>
								{:else}
									<div
										class="border p-2 rounded bg-green-100 border-green-200 text-green-700 w-fit"
									>
										작업완료
									</div>
								{/if}
								<div class="mt-1 text-gray-500">
									{#if work.dateFinished}
										{new Date(
											work.dateFinished
										).toLocaleString()}
									{/if}
								</div>
							</Td>
							<Td>
								{dateToIsoDateString(
									work.dateCreated
								)}
							</Td>
							{#if selectedSubcontractor !== '전처리작업실' && selectedSubcontractor !== '전체'}
								<Td>
									<CheckBox
										onChange={(check) => {
											if (check) {
												checked.push(work.workId);
											} else {
												checked = checked.filter(
													(c) => c !== work.workId
												);
											}
										}}
										group="work"
										disabled={work.state ===
											'작업완료'}
									/>
								</Td>
							{/if}
						</Tr>
					{/each}
				</tbody>
			</table>
		</main>
	</LoadingIndicator>
</div>
<Pagination {totalCount} classes="my-8" />
