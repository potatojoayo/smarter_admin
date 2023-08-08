<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import Th from '$lib/components/Th.svelte';
	import Td from '$lib/components/Td.svelte';
	import { goto } from '$app/navigation';
	import { todayDraftRequestCountByState } from '../../../../stores/user.js';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import { isLoading } from '../../../../stores/global_setting.js';
	import { onMount } from 'svelte';
	import { getDraftRequests } from '../../../../stores/product.js';
	import { page } from '$app/stores';
	import formatPhone from '../../../../utils/format_phone.js';
	import { dateToIsoDateString } from '$lib/utils/dateToIsoDateString';
	import Pagination from '$lib/components/Pagination.svelte';
	import { getColor } from '$lib/utils/getColor.js';
	import StateNav from '$lib/components/StateNav.svelte';
	import DraftService from '$data/services/DraftService';
	import { changeSearchParam } from '$lib/utils/changeSearchParam.js';

	$isLoading = true;
	let totalCount = 0;

	let requests = [];

	onMount(async () => {
		let state =
			$page.url.searchParams.get('state');
		let currentPage =
			$page.url.searchParams.get('page');
		await loadRequests(
			state === '전체' ? null : state,
			currentPage
		);
		console.log(requests);
	});

	$: {
		let state =
			$page.url.searchParams.get('state');
		let currentPage =
			$page.url.searchParams.get('page');
		let keyword =
			$page.url.searchParams.get('keyword');
		loadRequests(
			state === '전체' ? null : state,
			currentPage,
			keyword
		);
	}

	let states = ['전체', '요청', '완료'];

	async function loadRequests(
		state,
		page,
		keyword
	) {
		let result = await getDraftRequests(
			state,
			page,
			keyword
		);
		requests = result.draftRequests;
		totalCount = result.totalCount;

		$isLoading = false;
	}

	async function completeRequest(request) {
		if (!confirm('시안 요청을 완료하시겠습니까?'))
			return;
		const { success, message } =
			await DraftService.finishDraftRequest({
				draftRequestId: request.draftRequestId
			});
		alert(message);
		if (success) {
			changeSearchParam({
				param: '',
				value: '',
				invalidateAll: true,
				noScroll: true
			});
		}
	}
</script>

<nav>
	<div class="flex items-center">
		<StateNav
			{states}
			getCount={todayDraftRequestCountByState}
		/>
	</div>
	<div class="flex justify-between">
		<SearchBar classes="mt-5" />
		<div class="flex" />
	</div>
</nav>

<main
	class="overflow-x-scroll relative mt-5 border rounded bg-white"
>
	<table class="w-full">
		<thead>
			<tr>
				<Th>아이디</Th>
				<Th>지사</Th>
				<Th>체육관</Th>
				<Th>대표자</Th>
				<Th>휴대폰</Th>
				<Th>상태</Th>
				<Th>요청날짜</Th>
				<Th>완료날짜</Th>
			</tr>
		</thead>
		<tbody>
			<LoadingIndicator>
				{#each requests as request}
					<Tr
						onClick={() => {
							goto(
								`/user/edit/${request.user.gymNode.id}/logo?userId=${request.user.userId}`
							);
						}}
					>
						<Td whitespaceNoWrap
							>{request.user.identification}</Td
						>
						<Td
							>{request.agency
								? request.agency.name
								: '-'}</Td
						>
						<Td whitespaceNoWrap
							>{request.user.gym.name}</Td
						>
						<Td>{request.user.name}</Td>
						<Td whitespaceNoWrap
							>{formatPhone(
								request.user.phone
							)}</Td
						>
						<Td>
							<button
								class="p-2 border rounded {getColor(
									request.state
								)} cursor-pointer"
								on:click={(e) => {
									e.stopPropagation();
									completeRequest(request);
								}}
							>
								{request.state}
							</button>
						</Td>
						<Td whitespaceNoWrap
							>{dateToIsoDateString(
								request.dateCreated
							)}</Td
						>
						<Td whitespaceNoWrap
							>{dateToIsoDateString(
								request.dateFinished
							)}</Td
						>
					</Tr>
				{/each}
			</LoadingIndicator>
		</tbody>
	</table>
</main>
<Pagination {totalCount} classes="my-10" />
