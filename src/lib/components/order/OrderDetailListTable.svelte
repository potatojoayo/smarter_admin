<script>
	import Tr from '../Tr.svelte';
	import Td from '../Td.svelte';
	import formatMoney from '../../utils/formatMoney';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import CheckBox from '../CheckBox.svelte';
	import {
		checkedOrderDetails,
		checkedOrderMaster,
		getOrderDetails
	} from '../../../stores/order.js';
	import { getColor } from '../../utils/getColor.js';
	import Dialog from '../Dialog.svelte';
	import Th from '../Th.svelte';
	import { formatDate } from '$lib/utils/formatDate';
	import { onMount } from 'svelte';
	import TextButton from '../buttons/TextButton.svelte';
	import MdBlack from '../base/MdBlack.svelte';
	import LgBlack from '../base/LgBlack.svelte';
	let needCheckBox;
	let state = $page.url.searchParams.get('state');
	let exclusive = false;
	let open = false;
	let selectedImage;
	let names = [];
	function getUrl(state) {
		let queryParam = new URLSearchParams(
			$page.url.searchParams.toString()
		);

		queryParam.set('page', 1);
		queryParam.set('state', state);
		queryParam.set('keyword', '');
		return '?' + queryParam.toString();
	}

	$: {
		switch (state) {
			case '':
			case '전체':
			case '무통장입금':
			case '배송완료':
			case '전처리작업중':
			case '후작업중':
				needCheckBox = false;
				break;
			case '출고준비':
				needCheckBox = true;
				exclusive = true;
				break;
			case '결제완료':
			case '후작업완료':
			case '전처리작업완료':
			case '추후배송':
			case '배송중':
			case '묶음배송':
				needCheckBox = true;
				break;
		}
	}
	export let order;
	let orderDetails = [];
	onMount(() => {
		getOrderDetails(order.orderMasterId).then(
			(ods) => {
				orderDetails = ods.orderDetails;

				ods.addedOrderMasters.forEach(
					(orderMaster) => {
						orderMaster.details.forEach(
							(detail) => {
								detail.parentOrderNumber =
									orderMaster.orderNumber;
								detail.parentOrderId =
									orderMaster.id;
								orderDetails.push(detail);
							}
						);
					}
				);
			}
		);
	});

	function handleWorkDirectionClick(id) {
		window.open(
			'/work/direction/' + id,
			'_blank',
			'width=1500, height=1024'
		);
	}

	function handleAddedOrdernumberClick(id) {
		goto(`order/detail/${id}`);
	}
</script>

<div class="">
	<table class="w-full border-y">
		<thead>
			<tr class="h-12 bg-gray-300">
				<Th classes="w-32">주문상품</Th>
				<Th classes="w-24">색상</Th>
				<Th>사이즈</Th>
				<Th>개당단가</Th>
				<Th>주문수량</Th>
				<Th>작업비 합계</Th>
				<Th>결제할금액</Th>
				<Th>주문상태</Th>
				<Th>재고수량</Th>
				<Th>로고시안</Th>
				<Th>작업지시서</Th>
				<Th>입고예정일</Th>
				<Th>직송요청</Th>
				<Th>배송정보</Th>
				{#if needCheckBox}
					<Th
						><CheckBox
							parent
							{exclusive}
							group={order.orderNumber}
							onChange={(checked) => {
								if (checked) {
									if (exclusive) {
										$checkedOrderDetails = [];
									}
									orderDetails.forEach((o) => {
										if (
											!$checkedOrderDetails.includes(
												o
											) &&
											o.state === state
										) {
											$checkedOrderDetails.push(
												o
											);
											$checkedOrderMaster = order;
										}
									});
								} else {
									$checkedOrderDetails =
										$checkedOrderDetails.filter(
											(o) =>
												!orderDetails.includes(o)
										);
									if (exclusive) {
										$checkedOrderDetails = [];
									}
									$checkedOrderMaster = null;
								}
							}}
						/></Th
					>
				{/if}
			</tr>
		</thead>

		<tbody>
			{#each orderDetails as detail}
				<Tr classes="cursor-default bg-gray-100">
					{#if detail.parentOrderNumber}
						<Td classes="flex flex-col">
							<TextButton
								on:click={() => {
									handleAddedOrdernumberClick(
										detail.parentOrderId
									);
								}}
							>
								[추가주문]
								{detail.parentOrderNumber}
							</TextButton>
							<div>
								{detail.product.name}
							</div>
						</Td>
					{:else}
						<Td
							rowspan={detail.userRequest ? 2 : 1}
							classes={detail.userRequest
								? 'bg-white border-r-2'
								: ''}
						>
							{detail.product.name}
						</Td>
					{/if}
					<Td>
						{detail.product.color}
					</Td>
					<Td>
						{detail.product.size}
					</Td>
					<Td>
						{formatMoney({
							money: detail.productMaster.priceGym
						})}
					</Td>
					<Td>
						{detail.quantity}
					</Td>
					<Td>
						{formatMoney({
							money: detail.priceWork
						})}
					</Td>
					<Td classes="text-red-600">
						{formatMoney({
							money: detail.priceTotal
						})}
					</Td>
					<Td whitespaceNoWrap>
						<div
							class="flex flex-col items-center"
						>
							<button
								on:click={() => {
									goto(getUrl(detail.state));
								}}
								class="p-1 rounded border mb-1 text-xs w-full  {getColor(
									detail.state
								)} cursor-pointer"
							>
								{detail.state}
							</button>

							{detail.state.indexOf('작업') >=
								0 && detail.work
								? detail.work.subcontractor.name
								: ''}
						</div>
					</Td>
					<Td>
						{detail.product.inventoryQuantity}
					</Td>
					<Td classes="w-20">
						{#if detail.draft}
							<button
								class="cursor-pointer text-blue-500 whitespace-nowrap"
								on:click={() => {
									selectedImage =
										detail.draft.image;
									names = detail.studentNames;
									open = true;
								}}
							>
								미리보기
							</button>
						{:else}
							<div>X</div>
						{/if}
					</Td>
					<Td classes="w-20">
						{#if detail.work}
							<button
								class="cursor-pointer text-blue-500 whitespace-nowrap"
								on:click={() =>
									handleWorkDirectionClick(
										detail.work.id
									)}
							>
								작업지시서
							</button>
						{/if}
					</Td>
					<Td>
						{formatDate(detail.dateToBeShipped)}
					</Td>
					<Td>
						{detail.isDirectDelivery ? 'O' : 'X'}
					</Td>
					<Td>
						{#if detail.delivery}
							<div
								class="flex flex-col items-center"
							>
								{#if detail.delivery.photo}
									<img
										class="max-w-[100px] cursor-pointer"
										on:click={() => {
											selectedImage =
												detail.delivery.photo;
											open = true;
										}}
										src={detail.delivery.photo}
										alt=""
									/>
								{/if}
								<div class="mt-2 text-md">
									{detail.delivery.deliveryAgency
										.name}: {detail.delivery
										.trackingNumber}
								</div>
							</div>
						{:else}
							-
						{/if}
					</Td>
					{#if needCheckBox}
						<Td
							><CheckBox
								group={order.orderNumber}
								{exclusive}
								disabled={detail.state !==
									state || !order.isActive}
								onChange={(checked) => {
									if (checked) {
										if (exclusive) {
											$checkedOrderDetails =
												$checkedOrderDetails.filter(
													(o) =>
														$checkedOrderMaster.orderMasterId ===
														o.orderMaster.id
												);
										}
										$checkedOrderDetails.push(
											detail
										);
										$checkedOrderMaster = order;
									} else {
										$checkedOrderDetails =
											$checkedOrderDetails.filter(
												(o) => o !== detail
											);
										$checkedOrderMaster = null;
									}
								}}
							/></Td
						>
					{/if}
				</Tr>
				{#if detail.userRequest}
					<Tr>
						<Td colspan={13}
							>{detail.userRequest}
						</Td>
					</Tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>

{#if selectedImage}
	<Dialog {open}>
		<img src={selectedImage} alt="" />
		<div
			class="mt-5 mr-auto flex flex-col items-start"
		>
			<div class="text-lg">학생이름</div>
			<div
				class="flex p-3 bg-gray-100 rounded mt-2"
			>
				{#each names as name, index}
					<div>
						{index > 0 ? ',' : ''}
						{name}
					</div>
				{/each}
			</div>
		</div>
	</Dialog>
{/if}

<button
	on:click|preventDefault={() => {
		names = [];
		selectedImage = null;
		open = false;
	}}
	class="fixed w-screen h-screen
	bg-zinc-900 top-0 left-0 opacity-50 z-30
	transition-opacity duration-500
{open ? 'fixed' : 'invisible'}
"
/>
