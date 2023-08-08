<script>
	import {
		closeDraftDialog,
		isDraftDialogOpen,
		selectedOrder,
		selectedOrderDetail
	} from '../../../stores/order.js';
	import Tr from '../Tr.svelte';
	import Td from '../Td.svelte';
	import Button from '../Button.svelte';
	import InfoCard from '../InfoCard.svelte';
	import { formatPhone } from '../../utils/formatPhone';

	let memo;

	let dataList = [
		{
			title: '주문도장',
			data: $selectedOrder.user.gym.name
		},
		{
			title: '주문자',
			data: $selectedOrder.user.name
		},
		{
			title: '연락처',
			data: formatPhone($selectedOrder.user.phone)
		},
		{
			title: '이름 리스트',
			data: $selectedOrderDetail.studentNames.join(
				', '
			)
		}
	];
</script>

<dialog
	class="p-8 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded flex flex-col z-40 max-h-screen overflow-y-scroll  {$isDraftDialogOpen
		? 'visible'
		: 'invisible'}"
>
	<div class="mb-5 text-lg flex items-end">
		<span>로고 시안</span>
	</div>
	<div
		class="flex md:min-w-[1200px] min-w-[1100px] flex-wrap"
	>
		<div class="flex flex-col">
			<div class="h-fit">
				<InfoCard
					title="주문정보"
					{dataList}
					classes="min-w-[500px]"
				/>
			</div>
			<div
				class="shadow mt-5 rounded overflow-hidden"
			>
				<table class=" w-full">
					<thead>
						<th class="py-2 text-sm ">
							상품명
						</th>
						<th class="py-2 text-sm "> 색상 </th>
						<th class="py-2 px-2 text-sm ">
							사이즈
						</th>
						<th class="py-2 px-2 text-sm ">
							개수
						</th>
					</thead>
					<tbody>
						<Tr>
							<Td>
								{$selectedOrderDetail.product
									.name}
							</Td>
							<Td>
								{$selectedOrderDetail.product
									.color}
							</Td>
							<Td>
								{$selectedOrderDetail.product
									.size}
							</Td>
							<Td>
								{$selectedOrderDetail.quantity}
							</Td>
						</Tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="mx-2" />
		<div class="flex-1 h-full">
			<div
				class="flex flex-col items-center justify-center"
			>
				<img
					class="mt-5 max-w-[500px]"
					src={$selectedOrderDetail &&
					$selectedOrderDetail.draft !== null
						? $selectedOrderDetail.draft.image
						: null}
					alt=""
				/>
				<div class="flex flex-col w-full px-10">
					<span class="my-3">구매자 요청사항</span
					>
					<div>
						<textarea
							class="border rounded w-full p-3 focus:border-primary resize-none"
							disabled
							value={$selectedOrderDetail
								? $selectedOrderDetail.userRequest
								: '-'}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex mt-5 justify-end">
		<Button
			classes="w-20 ml-2"
			onClick={() => {
				closeDraftDialog();
			}}>확인</Button
		>
	</div>
</dialog>
