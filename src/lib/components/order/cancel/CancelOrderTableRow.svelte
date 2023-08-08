<script>
	import Tr from '../../Tr.svelte';
	import Td from '../../Td.svelte';
	import formatMoney from '../../../utils/formatMoney';
	import CheckBox from '../../CheckBox.svelte';
	import Button from '../../Button.svelte';
	import { goto } from '$app/navigation';
	import {
		changeState,
		checkedOrderMasters
	} from '../../../../stores/order.js';
	import CancelOrderDetailListTable from './CancelOrderDetailListTable.svelte';
	import ErrorButton from '../../ErrorButton.svelte';

	let selected = false;
	export let order;
</script>

<Tr
	classes="cursor-pointer "
	onClick={() => {
		selected = !selected;
	}}
>
	<Td whitespaceNoWrap classes="w-48">
		<div class="flex flex-col w-44">
			<Button
				classes="!px-0 w-44"
				onClick={() =>
					goto('/order/detail/' + order.id)}
			>
				{order.orderNumber}
			</Button>
			<span class="text-gray-500 mt-1" />
		</div>
	</Td>
	<Td whitespaceNoWrap>
		{order.user.gym.name}
	</Td>
	<Td whitespaceNoWrap>
		{order.user.gym.agency
			? order.user.gym.agency.name
			: '-'}
	</Td>
	<Td whitespaceNoWrap>
		{formatMoney({ money: order.priceTotal })}
	</Td>
	<Td whitespaceNoWrap>
		{formatMoney({
			money: order.priceTotalWorkLabor
		})}
	</Td>
	<Td whitespaceNoWrap>
		{formatMoney({
			money: order.priceDelivery
		})}
	</Td>
	<Td whitespaceNoWrap classes="w-20">
		<div class="flex flex-col">
			{#each order.states as state}
				{#if state === '취소요청'}
					<ErrorButton
						classes="bg-error border-error text-red-800"
						onClick={async () => {
							if (
								!confirm(
									'선택하신 주문의 취소를 완료하시겠습니까?'
								)
							) {
								return;
							}
							let orderDetailNumbers = [];
							order.details.forEach((d) => {
								orderDetailNumbers.push(
									d.orderDetailNumber
								);
							});
							if (
								await changeState(
									orderDetailNumbers,
									'취소완료'
								)
							) {
								alert(
									'선택하신 주문의 취소가 완료되었습니다.'
								);
								location.reload();
							}
						}}>취소요청</ErrorButton
					>
				{:else}
					<div
						class="border p-2 rounded bg-green-200 border-green-200 text-green-800"
					>
						취소완료
					</div>
				{/if}
			{/each}
		</div>
	</Td>
	<Td>
		{new Date(order.dateCreated).toLocaleString()}
	</Td>

	<Td>
		<CheckBox
			group="cancel"
			disabled={!order.states.includes(
				'취소요청'
			)}
			onChange={(checked) => {
				if (checked) {
					$checkedOrderMasters.push(order);
				} else {
					$checkedOrderMasters =
						$checkedOrderMasters.filter(
							(o) =>
								o.orderNumber !==
								order.orderNumber
						);
				}
			}}
		/>
	</Td>
</Tr>

{#if selected}
	<tr class="p-0">
		<Td colspan="1" classes="!p-0" />
		<Td colspan="9" classes="!p-0">
			<CancelOrderDetailListTable
				{order}
				bind:orderDetails={order.details}
			/>
		</Td>
	</tr>
{/if}
