<script>
	import DropdownSelect from '../DropdownSelect.svelte';
	import Button from '../Button.svelte';
	import Th from '../Th.svelte';
	import Td from '../Td.svelte';
	import InfoCard from '../InfoCard.svelte';
	import Tr from '../Tr.svelte';
	import {
		closeDeliveryDialog,
		delivery,
		isDeliveryDialogOpen
	} from '../../../stores/order.js';

	let dataList = [
		{
			title: '주문도장',
			data: $delivery.orderMaster.user.gym.name
		},
		{
			title: '주문자',
			data: $delivery.orderMaster.user.name
		},
		{
			title: '받는사람',
			data: $delivery.orderMaster.receiver
		},
		{
			title: '연락처',
			data: $delivery.orderMaster.phone
		},
		{
			title: '요청사항',
			data: $delivery.orderMaster.deliveryRequest
		}
	];
</script>

<dialog
	class="p-8 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded flex  z-40 min-w-[900px] {$isDeliveryDialogOpen
		? 'visible'
		: 'invisible'}"
>
	<div class="flex-1 flex flex-col">
		<div class="mb-5">
			<InfoCard {dataList} title="주문정보" />
		</div>
		<table class="w-full">
			<thead>
				<tr>
					<Th>상품명</Th>
					<Th>색상</Th>
					<Th>사이즈</Th>
					<Th>개수</Th>
				</tr>
			</thead>
			<tbody>
				{#each $delivery.orderDetails as detail}
					<Tr>
						<Td>
							{detail.product.name}
						</Td>
						<Td>
							{detail.product.color}
						</Td>
						<Td>
							{detail.product.size}
						</Td>
						<Td>
							{detail.quantity}
						</Td>
					</Tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="mx-5" />
	<div class="flex flex-col flex-1">
		<span class="text-sm">배송사</span>
		<DropdownSelect
			disabled
			classes="mt-2"
			options={[$delivery.deliveryAgency]}
			value={$delivery.deliveryAgency}
		/>
		<div class="flex mt-5">
			<span class="text-sm">운송장번호</span>
		</div>
		<input
			type="text"
			disabled
			value={$delivery.trackingNumber}
			class="border rounded py-1 px-2 mt-3"
		/>
		<span class="text-sm mt-5">배송상품 사진</span
		>
		<img
			src={$delivery.photo}
			class="h-72 mt-3 mx-auto"
			alt="iam"
		/>

		<div class="flex mt-5 justify-end">
			<Button
				classes="ml-1 w-20"
				onClick={closeDeliveryDialog}>확인</Button
			>
		</div>
	</div>
</dialog>
