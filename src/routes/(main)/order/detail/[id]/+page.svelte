<script lang="ts">
	import LgBlack from '$lib/components/base/LgBlack.svelte';
	import DataColumn from '$lib/components/DataColumn.svelte';
	import { formatDate } from '$lib/utils/formatDate.js';
	import MdBlack from '$lib/components/base/MdBlack.svelte';
	import { formatPhone } from '$lib/utils/formatPhone.js';
	import formatMoney from '$lib/utils/formatMoney';
	import Table from '$lib/components/table/Table.svelte';
	import Thead from '$lib/components/table/Thead.svelte';
	import Th from '$lib/components/table/Th.svelte';
	import Tbody from '$lib/components/table/Tbody.svelte';
	import Tr from '$lib/components/table/Tr.svelte';
	import Td from '$lib/components/table/Td.svelte';
	import TextButton from '$lib/components/buttons/TextButton.svelte';
	import DraftDetailModal from '$lib/components/modal/DraftDetailModal.svelte';
	import MdBlue from '$lib/components/base/MdBlue.svelte';
	import MdGray from '$lib/components/base/MdGray.svelte';
	import type { PageData } from './$types';
	import MdRed from '$lib/components/base/MdRed.svelte';
	import TextArea from '$lib/components/input/TextArea.svelte';
	import type OrderDetail from '$data/classes/OrderDetail';
	import CsRequestHistory from '$lib/components/order/CsRequestHistory.svelte';
	import GymService from '$data/services/GymService';

	export let data: PageData;
	const { orderMaster } = data;

	let draftId: number,
		draftDialogOpen = false,
		csRequests = data.csRequests,
		totalCount = data.totalCount,
		gymMemo = data.gymMemo ?? '',
		gymId = data.gymId;

	$: ({ csRequests, totalCount } = data);

	function openDraftModal(
		selectedDraftId: number
	) {
		draftId = selectedDraftId;
		draftDialogOpen = true;
	}

	function handleOrderHistoryClick() {
		window.open(
			'/print/order/' + orderMaster.id,
			'_blank',
			'width=1500, height=860, top=0, left=0'
		);
	}

	function handleDraftClick(detail: OrderDetail) {
		if (detail.draftId) {
			openDraftModal(detail.draftId);
		}
	}

	function handleWorkDirectionClick(
		detail: OrderDetail
	) {
		window.open(
			'/work/direction/' + detail.workId,
			'_blank',
			'width=1500, height=1024'
		);
	}

	async function handleSaveOrderMemo() {
		if (!confirm('주문메모를 저장하시겠습니까?'))
			return;
		if (await orderMaster.saveMemo()) {
			return alert('메모가 저장되었습니다.');
		}
		alert('저장 실패');
	}
	async function handleSaveGymMemo() {
		if (
			!confirm('체육관메모를 저장하시겠습니까?')
		)
			return;
		const { success, message } =
			await GymService.updateGymMemo({
				gymId,
				memo: gymMemo
			});
		alert(message);
		if (success) {
			location.reload();
		}
	}
</script>

<div
	class="flex flex-col p-8 border rounded bg-white"
>
	<div class="w-full flex justify-between">
		<LgBlack>주문상세</LgBlack>
		<TextButton on:click={handleOrderHistoryClick}
			>주문 내역서</TextButton
		>
	</div>

	<div
		class="mt-4 flex justify-between space-x-16"
	>
		<div class="flex flex-col flex-1">
			<DataColumn title="주문번호">
				<MdBlack>
					{orderMaster.orderNumber}
				</MdBlack>
			</DataColumn>
			<DataColumn title="주문날짜">
				<MdBlack>
					{formatDate(orderMaster.dateCreated)}
				</MdBlack>
			</DataColumn>
			<DataColumn title="체육관">
				<MdBlack>
					{orderMaster.gymName}
				</MdBlack>
			</DataColumn>
			<DataColumn title="체육사">
				<MdBlack>
					{orderMaster.agencyName ?? '-'}
				</MdBlack>
			</DataColumn>
			<DataColumn title="주문자">
				<MdBlack>
					{orderMaster.orderer}
				</MdBlack>
			</DataColumn>
			<DataColumn title="전화번호">
				<MdBlack>
					{formatPhone(orderMaster.phone)}
				</MdBlack>
			</DataColumn>
		</div>

		<div class="flex flex-col flex-1">
			<DataColumn title="주문금액 합계">
				<MdBlack>
					{formatMoney({
						money: orderMaster.priceTotal
					})}
				</MdBlack>
			</DataColumn>
			<DataColumn title="배송비">
				<MdBlack>
					{formatMoney({
						money: orderMaster.priceDelivery
					})}
				</MdBlack>
			</DataColumn>
			<DataColumn title="스마터머니">
				<MdBlack>
					{formatMoney({
						money: orderMaster.smarterMoney
					})}
				</MdBlack>
			</DataColumn>
			<DataColumn title="쿠폰">
				<div class="flex space-x-4">
					<MdBlack>
						{orderMaster.coupon
							? orderMaster.coupon.couponName
							: '-'}
					</MdBlack>
					<MdBlack>
						{formatMoney({
							money: orderMaster.coupon?.price
						})}
					</MdBlack>
				</div>
			</DataColumn>
			<DataColumn title="결제할 금액">
				<MdRed>
					{formatMoney({
						money: orderMaster.priceToPay
					})}
				</MdRed>
			</DataColumn>
			<DataColumn title="결제방법">
				<MdBlack>
					{orderMaster.paymentMethod ?? '미정'}
				</MdBlack>
			</DataColumn>
			<DataColumn title="결제금액">
				<MdBlue>
					{orderMaster.paidAmount
						? formatMoney({
								money: orderMaster.paidAmount
						  })
						: '0 원'}
				</MdBlue>
			</DataColumn>
			<DataColumn title="결제확인일">
				<MdBlack>
					{orderMaster.datePaid
						? formatDate(orderMaster.datePaid)
						: '-'}
				</MdBlack>
			</DataColumn>
		</div>

		<div class="flex flex-col flex-1">
			<DataColumn title="받는사람">
				<MdBlack>
					{orderMaster.receiver}
				</MdBlack>
			</DataColumn>
			<DataColumn title="주소">
				<MdBlack>
					{`${orderMaster.address} ${orderMaster.detailAddress} (우: ${orderMaster.zipCode})`}
				</MdBlack>
			</DataColumn>
			<DataColumn title="배송요구사항">
				<MdBlack>
					{orderMaster.deliveryRequest ?? ''}
				</MdBlack>
			</DataColumn>
			<DataColumn title="방문수령">
				<MdBlack>
					{orderMaster.isPickUp ? 'O' : 'X'}
				</MdBlack>
			</DataColumn>
			<DataColumn title="주문메모">
				<TextArea
					bind:value={orderMaster.memoByAdmin}
					classes="w-full"
				/>
				<TextButton
					classes="mt-auto"
					on:click={handleSaveOrderMemo}
					>저장</TextButton
				>
			</DataColumn>
			<DataColumn title="체육관 메모">
				<TextArea
					bind:value={gymMemo}
					classes="w-full"
				/>
				<TextButton
					classes="mt-auto"
					on:click={handleSaveGymMemo}
					>저장</TextButton
				>
			</DataColumn>
		</div>
	</div>
	<div class="my-4">
		<LgBlack>주문상품</LgBlack>
	</div>
	<div>
		<Table classes="w-full">
			<Thead classes="sticky top-16 ">
				<Th>상품명</Th>
				<Th>상품사진</Th>
				<Th classes="w-28">색상</Th>
				<Th classes="w-20">사이즈</Th>
				<Th classes="w-24">개당단가</Th>
				<Th classes="w-16">주문수량</Th>
				<Th classes="w-24">작업비 합계</Th>
				<Th classes="w-24">결제할 금액</Th>
				<Th classes="w-24">주문상태</Th>
				<Th classes="w-32">입고예정일</Th>
				<Th classes="w-20">직송요청</Th>
				<Th classes="w-20" />
				<Th classes="w-20" />
			</Thead>
			<Tbody>
				{#if orderMaster.details}
					{#each orderMaster.details as detail (detail.id)}
						<Tr>
							<Td>
								{detail.productName}
							</Td>
							<Td>
								<img
									src={detail.thumbnail}
									alt={detail.id.toString()}
								/>
							</Td>
							<Td>
								{detail.color}
							</Td>
							<Td>
								{detail.size}
							</Td>
							<Td>
								{formatMoney({
									money: detail.priceProduct
								})}
							</Td>
							<Td>
								{detail.quantity}
							</Td>
							<Td>
								{formatMoney({
									money:
										detail.priceWork *
										detail.quantity
								})}
							</Td>
							<Td classes="text-red-500">
								{formatMoney({
									money: detail.priceTotal
								})}
							</Td>
							<Td>
								{detail.state}
							</Td>
							<Td>
								{formatDate(
									detail.dateToBeShipped
								)}
							</Td>
							<Td>
								{detail.isDirectDelivery
									? 'O'
									: 'X'}
							</Td>
							<Td>
								{#if detail.draftId}
									<TextButton
										text="로고시안"
										on:click={() =>
											handleDraftClick(detail)}
									/>
								{/if}
							</Td>
							<Td>
								{#if detail.workId}
									<TextButton
										text="작업지시서"
										on:click={() =>
											handleWorkDirectionClick(
												detail
											)}
									/>
								{/if}
							</Td>
						</Tr>

						{#if detail.userRequest}
							<Tr>
								<Td>요구사항</Td>
								<Td colspan="12">
									{detail.userRequest}
								</Td>
							</Tr>
						{/if}
					{/each}
				{/if}
			</Tbody>
		</Table>
	</div>
</div>

{#each orderMaster.additionalOrders as additionalOrder}
	<div
		class="flex flex-col p-8 border rounded bg-white"
	>
		<div class="flex space-x-4 items-end">
			<LgBlack classes="whitespace-nowrap"
				>추가주문</LgBlack
			>
			<MdBlue
				>{additionalOrder.orderNumber}</MdBlue
			>
			<MdGray
				>{formatDate(
					additionalOrder.dateCreated
				)}</MdGray
			>
		</div>
		<div class="flex flex-col my-4">
			<DataColumn title="주문금액 합계"
				>{formatMoney({
					money: additionalOrder.priceTotal
				})}</DataColumn
			>
			<DataColumn title="결제할 금액">
				<div class="text-red-500">
					{formatMoney({
						money: additionalOrder.priceToPay
					})}
				</div>
			</DataColumn>
			<DataColumn title="결제방법"
				>{additionalOrder.paymentMethod}</DataColumn
			>
			<DataColumn title="결제금액"
				>{formatMoney({
					money: additionalOrder.paidAmount
				})}</DataColumn
			>
			<DataColumn title="결제 확인일"
				>{formatDate(
					additionalOrder.datePaid
				)}</DataColumn
			>
		</div>

		<div class="my-4">
			<LgBlack>주문상품</LgBlack>
		</div>

		<Table classes="w-full mt-8">
			<Thead classes="sticky top-16 ">
				<Th>상품명</Th>
				<Th classes="w-28">색상</Th>
				<Th classes="w-20">사이즈</Th>
				<Th classes="w-32">개당단가</Th>
				<Th classes="w-32">작업비</Th>
				<Th classes="w-20">주문수량</Th>
				<Th classes="w-32">총금액</Th>
				<Th classes="w-32">주문상태</Th>
				<Th classes="w-32">입고예정일</Th>
				<Th classes="w-20">직송요청</Th>
				<Th classes="w-20" />
				<Th classes="w-20" />
			</Thead>
			<Tbody>
				{#each additionalOrder.details as detail (detail.id)}
					<Tr>
						<Td>
							{detail.productName}
						</Td>
						<Td>
							{detail.color}
						</Td>
						<Td>
							{detail.size}
						</Td>
						<Td>
							{formatMoney({
								money: detail.priceProduct
							})}
						</Td>
						<Td>
							{formatMoney({
								money: detail.priceWork
							})}
						</Td>
						<Td>
							{detail.quantity}
						</Td>
						<Td>
							{formatMoney({
								money: detail.priceTotal
							})}
						</Td>
						<Td>
							{detail.state}
						</Td>
						<Td>
							{formatDate(detail.dateToBeShipped)}
						</Td>
						<Td>
							{detail.isDirectDelivery
								? 'O'
								: 'X'}
						</Td>
						<Td />
						<Td>
							{#if detail.draftId}
								<TextButton
									text="로고시안"
									on:click={() =>
										handleDraftClick(detail)}
								/>
							{/if}
						</Td>
						<Td>
							{#if detail.workId}
								<TextButton
									text="작업지시서"
									on:click={() =>
										handleWorkDirectionClick(
											detail
										)}
								/>
							{/if}
						</Td>
					</Tr>
					{#if detail.userRequest}
						<Tr>
							<Td>요구사항</Td>
							<Td colspan="12">
								{detail.userRequest}
							</Td>
						</Tr>
					{/if}
				{/each}
			</Tbody>
		</Table>
	</div>
{/each}

<div class="my-8" />
<CsRequestHistory {csRequests} {totalCount} />

{#if draftDialogOpen}
	<DraftDetailModal
		bind:open={draftDialogOpen}
		{draftId}
	/>
{/if}
