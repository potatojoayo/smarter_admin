<script>
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import Th from '$lib/components/Th.svelte';
	import Td from '$lib/components/Td.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import InputDate from '$lib/components/InputDateSearchParam.svelte';
	import { page } from '$app/stores';
	import {
		deleteEasyOrderRequests,
		getEasyOrders,
		todayEasyOrderCountByState
	} from '../../../../stores/order.js';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import formatPhone from '../../../../utils/format_phone';
	import ErrorButton from '$lib/components/ErrorButton.svelte';
	import { getColor } from '$lib/utils/getColor.js';
	import StateNav from '$lib/components/StateNav.svelte';
	import CheckBox from '$lib/components/CheckBox.svelte';
	import Dialog from '$lib/components/Dialog.svelte';

	$: dateTo =
		$page.url.searchParams.get('dateTo');

	let easyOrders = [];
	let totalCount = 0;
	let easyOrderIds = [];

	let open = false;
	let selected;

	function downloadImage(url, name) {
		fetch(url)
			.then((resp) => resp.blob())
			.then((blob) => {
				const url =
					window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.style.display = 'none';
				a.href = url;
				// the filename you want
				a.download = name;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
			})
			.catch(() => alert('An error sorry'));
	}
	$: {
		getEasyOrders(
			$page.url.searchParams.get('page'),
			$page.url.searchParams.get('dateFrom'),
			$page.url.searchParams.get('dateTo'),
			$page.url.searchParams.get('state'),
			$page.url.searchParams.get('keyword')
		).then((result) => {
			easyOrders = result.easyOrders;
			totalCount = result.totalCount;
		});
	}

	let states = ['전체', '주문요청', '주문완료'];
</script>

<section>
	<StateNav
		{states}
		getCount={todayEasyOrderCountByState}
	/>
	<div class="flex items-center mt-2">
		<InputDate param="dateFrom" max={dateTo} />
		<span class="mx-3 text-3xl"> ~ </span>
		<InputDate param="dateTo" />
		<span class="mx-2" />
		<SearchBar />
		<div class="ml-auto p-3">
			<Button classes="w-20">
				<a
					href="https://easy.ksmarter.shop/"
					target="_blank"
					rel="noreferrer"
					>주문요청
				</a>
			</Button>
			<ErrorButton
				classes="w-20"
				onClick={async () => {
					if (
						!confirm(
							'선택한 간편주문 요청을 삭제하시겠습니까?'
						)
					) {
						return;
					}
					if (
						await deleteEasyOrderRequests(
							easyOrderIds
						)
					) {
						alert('삭제되었습니다.');
						return location.reload();
					}
					alert('실패');
				}}>삭제</ErrorButton
			>
		</div>
	</div>
</section>

<LoadingIndicator>
	<main
		class="mt-4 border rounded bg-white border"
	>
		<table class="w-full">
			<thead>
				<tr>
					<Th>도장</Th>
					<Th>연락처</Th>
					<Th>체육사</Th>
					<Th>상태</Th>
					<Th>요청날짜</Th>
					<Th>완료날짜</Th>
					<Th>주문번호</Th>
					<Th
						><CheckBox
							group="easy"
							parent
							onChange={(checked) => {
								if (checked) {
									easyOrderIds = [];
									for (let e of easyOrders) {
										if (e.state === '주문요청') {
											easyOrderIds.push(
												e.easyOrderId
											);
										}
									}
								} else {
									easyOrderIds = [];
								}
							}}
						/></Th
					>
				</tr>
			</thead>
			<tbody>
				{#each easyOrders as e}
					<Tr>
						<Td whitespaceNoWrap
							>{e.user.gym.name}</Td
						>
						<Td whitespaceNoWrap
							>{formatPhone(e.user.phone)}</Td
						>
						<Td
							>{e.user.gym.agency
								? e.user.gym.agency.name
								: '-'}</Td
						>
						<Td>
							<button
								class="{getColor(e.state)}
								p-2
								rounded
								whitespace-nowrap cursor-pointer
								text-xs
								"
								on:click={() => {
									open = true;
									selected = e;
								}}
							>
								{e.state}
							</button>
						</Td>
						<Td whitespaceNoWrap>
							{new Date(
								e.dateCreated
							).toLocaleString()}</Td
						>
						<Td whitespaceNoWrap>
							{#if e.dateCompleted}
								{new Date(
									e.dateCompleted
								).toLocaleString()}
							{:else}
								-
							{/if}
						</Td>
						<Td whitespaceNoWrap>
							{#if e.state === '주문완료'}
								<button
									class="text-blue-500 hover:text-blue-700"
									on:click={() => {
										goto(`detail/${e.order.id}`);
									}}
								>
									{e.order.orderNumber}
								</button>
							{:else if e.state === '주문요청'}
								<button
									class="text-red-500 hover:text-red-700"
									on:click={() => {
										goto(`easy/create/${e.id}`);
									}}>주문생성</button
								>
							{/if}
						</Td>
						<Td>
							<CheckBox
								group="easy"
								disabled={e.state !== '주문요청'}
								onChange={(checked) => {
									if (checked) {
										easyOrderIds.push(
											e.easyOrderId
										);
									} else {
										easyOrderIds =
											easyOrderIds.filter(
												(i) => i !== e.easyOrderId
											);
									}
								}}
							/>
						</Td>
					</Tr>
				{/each}
			</tbody>
		</table>
	</main>
	<Pagination {totalCount} classes="my-10" />
</LoadingIndicator>

{#if selected}
	<Dialog bind:open>
		<div class="flex border rounded p-5">
			<div class="flex flex-col">
				<div class=" text-sm">체육관</div>
				<div class="text-lg">
					{selected.user.gym.name}
				</div>
			</div>
			<div class="flex flex-col ml-5">
				<div class=" text-sm">연락처</div>
				<div class="text-lg">
					{formatPhone(selected.user.phone)}
				</div>
			</div>
		</div>
		<div class="mt-5 text-sm">요청사항</div>
		<div class=" border rounded p-5 mt-2">
			{selected.contents}
		</div>
		{#if selected.files.length > 0}
			<div class="flex justify-between mt-5">
				<span class="text-lg flex items-center"
					><i
						class="fa fa-file text-gray-800 mr-2"
					/>
					첨부파일</span
				>

				<Button
					onClick={() => {
						for (
							let i = 0;
							i < selected.files.length;
							i++
						) {
							downloadImage(
								selected.files[i].file,
								selected.user.gym.name +
									'간편주문로고' +
									i +
									Date.now() +
									selected.files[i].file
										.split('.')
										.pop()
							);
						}
					}}
				>
					<i class="fa fa-download mr-1" />
					다운로드</Button
				>
			</div>
		{/if}
		<button
			class="mt-5 ml-auto p-3 rounded bg-primary text-white cursor-pointer border-primary"
			on:click={() => {
				open = false;
			}}
		>
			확인
		</button>
	</Dialog>
{/if}

<button
	on:click|preventDefault={() => {
		open = false;
	}}
	class="fixed w-screen h-screen
	bg-zinc-900 top-0 left-0 opacity-50 z-30
	transition-opacity duration-500
{open ? 'fixed' : 'invisible'}
"
/>
