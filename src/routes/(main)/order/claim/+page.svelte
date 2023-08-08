<script>
	import InputDate from '$lib/components/InputDateSearchParam.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { page } from '$app/stores';
	import Tr from '$lib/components/Tr.svelte';
	import Td from '$lib/components/Td.svelte';
	import formatMoney from '../../../../utils/format_money';
	import Th from '$lib/components/Th.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import ClaimStateNav from '$lib/components/order/claim/ClaimStateNav.svelte';
	import CheckBox from '$lib/components/CheckBox.svelte';
	import ErrorButton from '$lib/components/ErrorButton.svelte';
	import {
		completeClaims,
		declineClaims,
		getClaims,
		todayClaimCountByState
	} from '../../../../stores/order.js';
	import formatPhone from '../../../../utils/format_phone';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { getColor } from '$lib/utils/getColor.js';
	import DialogReturn from '$lib/components/order/claim/DialogReturn.svelte';
	import StateNav from '$lib/components/StateNav.svelte';

	$: dateFrom =
		$page.url.searchParams.get('dateFrom');
	$: dateTo =
		$page.url.searchParams.get('dateTo');

	let states = [
		'전체',
		'교환요청',
		'교환완료',
		'교환반려',
		'반품요청',
		'반품완료',
		'반품반려'
	];

	let claims = [];
	let totalCount = 0;
	let returnDialogOpen = false;
	let selectedClaim;

	let checkedClaimIds = [];

	$: {
		getClaims(
			$page.url.searchParams.get('page'),
			$page.url.searchParams.get('dateFrom'),
			$page.url.searchParams.get('dateTo'),
			$page.url.searchParams.get('state'),
			$page.url.searchParams.get('keyword')
		).then((result) => {
			claims = result.claims;
			totalCount = result.totalCount;
		});
	}
</script>

<nav class="flex flex-col">
	<StateNav
		{states}
		getCount={todayClaimCountByState}
	/>
	<div class="flex justify-between mt-5">
		<div class="flex items-center">
			<InputDate param="dateFrom" max={dateTo} />
			<span class="mx-3 text-3xl"> ~ </span>
			<InputDate param="dateTo" />
			<SearchBar classes="ml-5" />
		</div>
		<div class="flex">
			<ErrorButton
				onClick={async () => {
					if (checkedClaimIds.length === 0) {
						return alert(
							'적어도 하나 이상의 항목을 선택해주세요.'
						);
					}
					if (
						await declineClaims(checkedClaimIds)
					) {
						alert(
							'선택하신 항목이 반려되었습니다.'
						);
						return location.reload();
					}
					alert('실패');
				}}
			>
				<span>교환 반려</span>
			</ErrorButton>
			<div class="mx-1" />
			<Button
				onClick={async () => {
					if (checkedClaimIds.length === 0) {
						return alert(
							'적어도 하나 이상의 항목을 선택해주세요.'
						);
					}
					if (
						await completeClaims(checkedClaimIds)
					) {
						alert(
							'선택하신 항목이 완료되었습니다.'
						);
						return location.reload();
					}
					alert('실패');
				}}
			>
				<span>교환 완료</span>
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
					<Th>주문자</Th>
					<Th>주문상품</Th>
					<Th>색상</Th>
					<Th>사이즈</Th>
					<Th>수량</Th>
					<Th>총 작업용역비</Th>
					<Th>총 금액</Th>
					<!--				<Th>배송정보</Th>-->
					<Th>상태</Th>
					<Th>사유</Th>
					<Th>요청일</Th>
					<Th>수정일</Th>
					<Th
						><CheckBox
							parent
							group="claim"
							onChange={(checked) => {
								if (checked)
									checkedClaimIds = claims.map(
										(c) => c.claimId
									);
								else {
									checkedClaimIds = [];
								}
							}}
						/></Th
					>
				</tr>
			</thead>
			<tbody>
				{#each claims as claim}
					<Tr>
						<Td whitespaceNoWrap>
							<div class="flex flex-col">
								<Button
									classes="!px-1"
									onClick={() =>
										goto(
											'/order/detail/' +
												claim.orderDetail
													.orderMaster.id
										)}
								>
									{claim.orderDetail.orderMaster
										.orderNumber}
								</Button>
							</div>
						</Td>
						<Td>
							{claim.user.gym.name}
							<br />
							{claim.user.name}
							<br />
							{formatPhone(claim.user.phone)}
						</Td>
						<Td>
							{claim.orderDetail.product.name}
						</Td>
						<Td>
							{claim.orderDetail.product.color}
						</Td>
						<Td>
							{claim.orderDetail.product.size}
						</Td>
						<Td>
							{claim.quantity}
						</Td>
						<Td>
							{formatMoney(
								claim.priceTotalWorkLabor
							)}
						</Td>
						<Td>
							{formatMoney(claim.priceTotal)}
						</Td>
						<!--					<Td classes="max-w-[150px]">-->
						<!--						{`${claim.orderDetail.orderMaster.address} ${claim.orderDetail.orderMaster.detailAddress}`}-->
						<!--						<br />-->
						<!--						{`우) ${claim.orderDetail.orderMaster.zipCode}`}-->
						<!--					</Td>-->
						<Td whitespaceNoWrap>
							<div
								class="p-2 rounded  cursor-pointer {getColor(
									claim.state
								)}"
								on:click={() => {
									if (
										claim.state === '반품요청'
									) {
										selectedClaim = claim;
										returnDialogOpen = true;
									}
								}}
							>
								<div>
									{claim.state}
								</div>
							</div>
							{#if claim.refundPrice}
								<div
									class="whitespace-nowrap mt-1"
								>
									{formatMoney(claim.refundPrice)}
									원
								</div>
							{/if}
							<div class="mt-1 text-gray-500">
								{#if claim.dateFinished}
									{new Date(
										claim.dateFinished
									).toLocaleDateString()}
								{/if}
							</div>
						</Td>
						<Td>
							{claim.reason}
						</Td>
						<Td>
							{new Date(
								claim.dateCreated
							).toLocaleDateString()}
						</Td>
						<Td>
							{new Date(
								claim.dateUpdated
							).toLocaleDateString()}
						</Td>
						<Td>
							<CheckBox
								group="claim"
								onChange={(checked) => {
									if (checked)
										checkedClaimIds.push(
											claim.claimId
										);
									else {
										checkedClaimIds =
											checkedClaimIds.filter(
												(c) => c !== claim.claimId
											);
									}
								}}
								disabled={claim.state.indexOf(
									'요청'
								) < 0 ||
									claim.state.includes('반품')}
							/>
						</Td>
					</Tr>
				{/each}
			</tbody>
		</table>
	</main>

	<Pagination {totalCount} classes="my-10" />
</LoadingIndicator>

{#if returnDialogOpen}
	<div
		class="fixed w-screen h-screen
	bg-zinc-900 top-0 left-0 opacity-50 z-30
	transition-opacity duration-500"
		on:click={() => {
			returnDialogOpen = false;
		}}
	/>
{/if}

{#if returnDialogOpen}
	<DialogReturn
		claim={selectedClaim}
		bind:returnDialogOpen
	/>
{/if}
