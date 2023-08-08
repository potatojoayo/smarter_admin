<script lang="ts">
	import LgBlack from '$lib/components/base/LgBlack.svelte';
	import type OrderMaster from '$data/classes/OrderMaster';
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
	import { deleteSearchParams } from '$lib/utils/deleteSearchParams';
	import DraftDetailModal from '$lib/components/modal/DraftDetailModal.svelte';
	import { changeSearchParam } from '$lib/utils/changeSearchParam';
	import type CsRequest from '$data/classes/CsRequest';
	import InputNumber from '$lib/components/input/InputNumber.svelte';
	import type OrderDetail from '$data/classes/OrderDetail';
	import { gql } from 'graphql-request';
	import HttpClient from '$data/graphql/client';
	import Button from '$lib/components/buttons/Button.svelte';
	import MdGray from '../base/MdGray.svelte';
	import MdBlue from '../base/MdBlue.svelte';

	export let orderMaster: OrderMaster,
		editable = false,
		back = false,
		csRequest: CsRequest,
		isDifferent = false,
		changingCategory = false,
		changeModalOpen = false;

	let draftId: number,
		draftDialogOpen = false,
		quantities: number[],
		returnModalOpen = false;

	$: {
		if (csRequest) {
			isDifferent =
				orderMaster.id != csRequest.orderMasterId;
		}
		quantities =
			orderMaster.details?.map(
				(d) => d.quantity
			) ?? [];
	}

	function handleBackButtonClick() {
		deleteSearchParams({
			deleteParams: ['orderMasterId']
		});
	}

	function openDraftModal(
		selectedDraftId: number
	) {
		draftId = selectedDraftId;
		draftDialogOpen = true;
	}

	function changeSelectedOrderMaster() {
		changeSearchParam({
			param: 'mode',
			value: 'Order',
			invalidateAll: true,
			deleteParams: ['orderMasterId']
		});
	}

	async function cancelOrder() {
		if (!confirm('주문을 취소하시겠습니까?'))
			return;
		const { success, message } =
			await csRequest.cancelOrder();
		alert(message);
		if (success) {
			await changeSearchParam({
				param: '',
				value: '',
				invalidateAll: true
			});
		}
	}

	async function selectOrderMaster() {
		if (
			!confirm(
				'문의에 대한 주문을 변경하시겠습니까?'
			)
		)
			return;
		if (
			await csRequest.update({
				orderMasterId: orderMaster.id
			})
		) {
			alert(`주문이 변경되었습니다.`);
			await changeSearchParam({
				param: 'mode',
				value: 'Default',
				deleteParams: [
					'orderMasterId',
					'changingCategory'
				],
				invalidateAll: true
			});
		} else {
			alert('주문 변경이 실패하였습니다.');
		}
	}

	async function reduceQuantity({
		orderDetail,
		newQuantity
	}: {
		orderDetail: OrderDetail;
		newQuantity: number;
	}) {
		if (
			!confirm(
				`${orderDetail.productName}의 주문수량을 변경하시겠습니까?`
			)
		)
			return;

		const ChangeOrderDetailQuantity = gql`
			mutation ChangeOrderDetailQuantity(
				$csRequestId: Int
				$orderDetailId: Int
				$newQuantity: Int
			) {
				changeOrderDetailQuantity(
					csRequestId: $csRequestId
					orderDetailId: $orderDetailId
					newQuantity: $newQuantity
				) {
					success
					message
				}
			}
		`;
		const client = HttpClient.getInstance();
		const result = (await client.request(
			ChangeOrderDetailQuantity,
			{
				csRequestId: csRequest.id,
				orderDetailId: orderDetail.id,
				newQuantity: newQuantity
			}
		)) as {
			changeOrderDetailQuantity: {
				success: boolean;
				message: string;
			};
		};
		const { message, success } =
			result.changeOrderDetailQuantity;
		alert(message);
		if (success) {
			await changeSearchParam({
				param: '',
				value: '',
				invalidateAll: true,
				noScroll: true
			});
		}
	}

	function additionalOrder() {
		changeSearchParam({
			param: 'mode',
			value: 'AdditionalOrder',
			noScroll: true
		});
	}

	async function partialCancel() {
		if (
			!confirm(
				'선택하신 주문들을 취소하시겠습니까?'
			)
		)
			return;
		if (!orderMaster || !orderMaster.details)
			return alert('주문이 없습니다.');
		const orderDetailIds = orderMaster.details
			.filter((d) => d.checked)
			.map((d) => d.id);
		if (orderDetailIds.length === 0)
			return alert(
				'취소하실 주문을 선택해주세요.'
			);
		const { success, message } =
			await csRequest.partialCancelOrders({
				orderDetailIds
			});
		alert(message);
		if (success) {
			await changeSearchParam({
				param: '',
				value: '',
				invalidateAll: true,
				noScroll: true
			});
		}
	}

	function changeOrders() {
		if (!orderMaster || !orderMaster.details)
			return alert('주문이 없습니다.');
		if (
			orderMaster.details.filter((d) => d.checked)
				.length === 0
		)
			return alert(
				'교환하실 주문을 선택해주세요.'
			);
		changeModalOpen = true;
	}

	function returnOrders() {
		if (!orderMaster || !orderMaster.details)
			return alert('주문이 없습니다.');
		if (
			orderMaster.details.filter((d) => d.checked)
				.length === 0
		)
			return alert(
				'반품하실 주문을 선택해주세요.'
			);
		returnModalOpen = true;
	}
</script>

<div
	class="flex flex-col p-8 border rounded bg-white"
>
	<div class="flex justify-between">
		{#if back}
			<button
				on:click={handleBackButtonClick}
				class="flex space-x-2 items-center"
			>
				<i
					class="fa-regular fa-arrow-left text-gray-700 text-2xl"
				/>
				<LgBlack>주문상세</LgBlack>
			</button>
		{:else}
			<LgBlack>주문상세</LgBlack>
		{/if}
		<div class="flex space-x-8">
			{#if !changingCategory}
				{#if isDifferent}
					<TextButton
						on:click={selectOrderMaster}
						text="주문선택"
					/>
				{:else}
					<TextButton
						on:click={changeSelectedOrderMaster}
						text="다른 주문 선택"
					/>
				{/if}
			{/if}
			{#if editable && csRequest.orderState !== '주문취소'}
				<TextButton
					red
					on:click={cancelOrder}
					text="주문취소"
				/>
				<TextButton
					on:click={additionalOrder}
					text="추가주문"
				/>
			{/if}
		</div>
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
			<DataColumn title="결제할 금액">
				<MdBlack>
					{formatMoney({
						money: orderMaster.priceToPay
					})}
				</MdBlack>
			</DataColumn>
			<DataColumn title="결제방법">
				<MdBlack>
					{orderMaster.paymentMethod ?? '미정'}
				</MdBlack>
			</DataColumn>
			<DataColumn title="결제금액">
				<MdBlack>
					{orderMaster.paidAmount
						? formatMoney({
								money: orderMaster.paidAmount
						  })
						: '0 원'}
				</MdBlack>
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
			<DataColumn title="메모">
				<MdBlack>
					{orderMaster.memo ?? ''}
				</MdBlack>
			</DataColumn>
		</div>
	</div>
	<div class="my-4">
		<div class="flex justify-between">
			<LgBlack>주문상품</LgBlack>
			{#if editable}
				<div class="flex space-x-2">
					<Button
						text="부분취소"
						red
						on:click={partialCancel}
					/>
					<Button
						text="교환"
						on:click={changeOrders}
					/>
					<Button
						text="반품"
						on:click={returnOrders}
					/>
				</div>
			{/if}
		</div>
	</div>
	<div>
		<Table classes="w-full">
			<Thead classes="sticky top-16 ">
				{#if editable}
					<Th classes="w-10" />
				{/if}
				<Th>상품명</Th>
				<Th classes="w-28">색상</Th>
				<Th classes="w-20">사이즈</Th>
				<Th classes="w-32">개당단가</Th>
				<Th classes="w-32">작업비</Th>
				<Th classes="w-32">주문수량</Th>
				<Th classes="w-32">총금액</Th>
				<Th classes="w-32">주문상태</Th>
				<Th classes="w-20" />
				<Th classes="w-20" />
				<Th classes="w-10" />
			</Thead>
			<Tbody>
				{#if orderMaster.details}
					{#each orderMaster.details as detail, index}
						<Tr
							onClick={editable
								? () => {
										if (
											![
												'주문취소',
												'반품요청',
												'교환요청',
												'교환완료',
												'반품완료'
											].includes(detail.state)
										) {
											detail.checked =
												!detail.checked;
										}
								  }
								: null}
						>
							{#if editable}
								<Td>
									<div>
										<input
											type="checkbox"
											class="w-4 h-4"
											bind:checked={detail.checked}
											disabled={[
												'주문취소',
												'반품요청',
												'교환요청',
												'교환완료',
												'반품완료'
											].includes(detail.state)}
										/>
									</div>
								</Td>
							{/if}
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
								{#if editable && !['주문취소', '반품요청', '교환요청'].includes(detail.state)}
									<div
										class="flex space-x-2 items-center"
									>
										<button
											class="z-20"
											class:invisible={quantities[
												index
											] <= 1}
											on:click={(e) => {
												e.stopPropagation();
												quantities[index] -= 1;
											}}
										>
											<i
												class="fa-regular fa-chevron-left"
											/>
										</button>
										<InputNumber
											bind:value={quantities[
												index
											]}
											classes="w-12 text-center"
											onInput={(value) => {
												if (
													quantities[index] >
													detail.quantity
												) {
													quantities[index] =
														detail.quantity;
												} else {
													quantities[index] =
														value;
												}
											}}
										/>
										<button
											class:invisible={quantities[
												index
											] === detail.quantity}
											on:click={(e) => {
												e.stopPropagation();
												quantities[index] += 1;
											}}
										>
											<i
												class="fa-regular fa-chevron-right"
											/>
										</button>
									</div>
								{:else}
									{detail.quantity}
								{/if}
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
								{#if detail.draftId}
									<TextButton
										text="로고시안"
										on:click={() => {
											if (detail.draftId) {
												openDraftModal(
													detail.draftId
												);
											}
										}}
									/>
								{/if}
							</Td>
							<Td>
								{#if detail.workId}
									<TextButton text="작업지시서" />
								{/if}
							</Td>
							<Td>
								<TextButton
									on:click={() =>
										reduceQuantity({
											orderDetail: detail,
											newQuantity:
												quantities[index]
										})}
									classes="{quantities[index] !==
										detail.quantity &&
									quantities[index] > 0
										? ''
										: 'hidden'} "
									text="저장"
								/>
							</Td>
						</Tr>
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
			<DataColumn title="결제할 금액"
				>{formatMoney({
					money: additionalOrder.priceToPay
				})}</DataColumn
			>
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
				<Th classes="w-32">주문수량</Th>
				<Th classes="w-32">총금액</Th>
				<Th classes="w-32">주문상태</Th>
				<Th classes="w-20" />
				<Th classes="w-20" />
			</Thead>
			<Tbody>
				{#each additionalOrder.details as detail, index}
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
							{#if detail.draftId}
								<TextButton
									text="로고시안"
									on:click={() => {
										if (detail.draftId) {
											openDraftModal(
												detail.draftId
											);
										}
									}}
								/>
							{/if}
						</Td>
						<Td>
							{#if detail.workId}
								<TextButton text="작업지시서" />
							{/if}
						</Td>
					</Tr>
				{/each}
			</Tbody>
		</Table>
	</div>
{/each}

{#if draftDialogOpen}
	<DraftDetailModal
		bind:open={draftDialogOpen}
		{draftId}
		editable
	/>
{/if}
