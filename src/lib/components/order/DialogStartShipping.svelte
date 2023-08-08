<script>
	import DropdownSelect from '../DropdownSelect.svelte';
	import {
		checkedOrderDetails,
		checkedOrderMaster,
		checkedOrderMasters,
		closeStartShippingDialog,
		isStartShippingDialogOpen,
		selectedOrder,
		selectedOrderDetail,
		startShipping
	} from '../../../stores/order.js';
	import UploadImage from '../UploadImage.svelte';
	import Button from '../Button.svelte';
	import { onMount } from 'svelte';
	import { getDeliveryAgencies } from '../../../stores/common.js';
	import Th from '../Th.svelte';
	import Td from '../Td.svelte';
	import InfoCard from '../InfoCard.svelte';
	import Tr from '../Tr.svelte';

	let trackingNumber;
	let photo;
	let photoFile;
	let selectedDeliveryAgency;
	let deliveryAgencies = [];
	let orderDetails = [];
	let orderMaster = $selectedOrder;
	if (!orderMaster) {
		orderMaster = $checkedOrderMaster;
	}
	if ($selectedOrderDetail) {
		orderDetails.push($selectedOrderDetail);
	}
	$checkedOrderDetails.forEach((o) => {
		if (!orderDetails.includes(o))
			orderDetails.push(o);
	});
	onMount(async () => {
		deliveryAgencies =
			await getDeliveryAgencies();
		selectedDeliveryAgency = deliveryAgencies[0];
	});

	let dataList = [
		{
			title: '주문도장',
			data: orderMaster.user.gym.name
		},
		{
			title: '주문자',
			data: orderMaster.user.name
		},
		{
			title: '받는사람',
			data: orderMaster.receiver
		},
		{
			title: '연락처',
			data: orderMaster.user.phone
		},
		{
			title: '우편번호',
			data: orderMaster.zipCode
		},
		{
			title: '주소',
			data: orderMaster.address
		},
		{
			title: '상세주소',
			data: orderMaster.detailAddress
		},
		{
			title: '요청사항',
			data: orderMaster.deliveryRequest
		}
	];
</script>

<dialog
	class="p-8 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded flex  z-40 min-w-[900px] {$isStartShippingDialogOpen
		? 'visible'
		: 'invisible'}"
>
	<div class="flex-1 flex flex-col">
		<div class="mb-5">
			<InfoCard {dataList} title="주문정보" />
		</div>
		<div class="max-h-[200px] overflow-y-scroll">
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
					{#each orderDetails as detail}
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
	</div>
	<div class="mx-5" />
	<div
		class="flex flex-col flex-1 justify-between"
	>
		<div class="flex flex-col">
			<span class="text-sm">배송사 선택</span>
			<DropdownSelect
				options={deliveryAgencies}
				classes="mt-2"
				bind:value={selectedDeliveryAgency}
			/>
			<div class="flex mt-5">
				<span class="text-sm">운송장번호</span>
				<span class="text-red-500">*</span>
			</div>
			<input
				type="text"
				bind:value={trackingNumber}
				class="border rounded py-1 px-2 mt-3"
			/>
			<span class="text-sm mt-5"
				>배송상품 사진</span
			>
			<UploadImage
				classes="mt-3 mx-auto"
				size="72"
				bind:image={photo}
				bind:file={photoFile}
			/>
		</div>

		<div class="flex mt-5 justify-end">
			<Button
				classes="hover:bg-error hover:text-red-800 hover:border-error w-20"
				onClick={closeStartShippingDialog}
				>취소</Button
			>
			<Button
				classes="ml-1 w-20"
				onClick={async () => {
					if (
						await startShipping(
							orderDetails.map((o) => o.id),
							selectedDeliveryAgency.id,
							trackingNumber,
							photoFile
						)
					) {
						closeStartShippingDialog(
							selectedDeliveryAgency.id
						);
					}
				}}>전송</Button
			>
		</div>
	</div>
</dialog>
