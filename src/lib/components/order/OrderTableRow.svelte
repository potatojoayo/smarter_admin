<script>
	import Tr from '../Tr.svelte';
	import Td from '../Td.svelte';
	import formatMoney from '../../utils/formatMoney';
	import CheckBox from '../CheckBox.svelte';
	import { goto } from '$app/navigation';
	import OrderDetailListTable from './OrderDetailListTable.svelte';
	import { page } from '$app/stores';
	import { getColor } from '../../utils/getColor.js';
	import {
		checkedOrderDetails,
		checkedOrderMasters
	} from '../../../stores/order.js';
	import { formatPhone } from '../../utils/formatPhone';

	let selected = false;
	export let order;

	function getUrl(state) {
		let queryParam = new URLSearchParams(
			$page.url.searchParams.toString()
		);

		queryParam.set('page', 1);
		queryParam.set('state', state);
		queryParam.set('keyword', '');
		return '?' + queryParam.toString();
	}

	let needCheckBox;
	$: {
		let state =
			$page.url.searchParams.get('state');
		switch (state) {
			case '무통장입금':
			case '간편주문':
			case '':
			case '결제완료':
				needCheckBox = true;
				break;
			case '작업중':
			case '작업완료':
			case '전체':
			case '출고준비':
			case '추후배송':
			case '배송중':
			case '배송완료':
				needCheckBox = false;
				break;
			default:
				needCheckBox = false;
		}

		if (
			$page.url.pathname.includes('/delivery') &&
			state === '전체'
		) {
			needCheckBox = true;
		}
	}
</script>

<Tr
	classes="cursor-pointer "
	onClick={() => {
		selected = !selected;
		$checkedOrderDetails =
			$checkedOrderDetails.filter(
				(o) => !order.details.includes(o)
			);
	}}
>
	<!-- 주문번호	 -->
	<Td>
		<button
			class="text-blue-500 hover:text-blue-700"
			on:click={(e) => {
				e.stopPropagation();
				goto('/order/detail/' + order.id);
			}}
		>
			{order.orderMasterId}
		</button>
	</Td>
	<!-- 도장 -->
	<Td classes="text-start">
		<button
			class="text-blue-500 hover:text-blue-700 text-start w-full text-clip"
			on:click={(e) => {
				e.stopPropagation();
				let queryParam = new URLSearchParams(
					$page.url.searchParams.toString()
				);

				queryParam.set('page', 1);
				queryParam.set(
					'keyword',
					order.user.gym.name
				);

				goto('?' + queryParam);
			}}
		>
			{order.user.gym.name}
		</button>
	</Td>
	<!-- 주문금액 -->
	<Td whitespaceNoWrap>
		{formatMoney({ money: order.priceTotal })}
	</Td>
	<!-- 배송비 -->
	<Td whitespaceNoWrap>
		{formatMoney({
			money: order.priceDelivery
		})}
	</Td>
	<!-- 스마터머니 -->
	{#if order.smarterMoneyHistory && order.smarterMoneyHistory.transactionType === '사용'}
		<Td whitespaceNoWrap>
			{formatMoney({
				money: order.smarterMoneyHistory.amount
			})}
		</Td>
	{:else}
		<Td whitespaceNoWrap>0원</Td>
	{/if}
	<!-- 쿠폰 -->
	<Td whitespaceNoWrap>
		{formatMoney({ money: order.coupon?.price })}
	</Td>
	<!-- 결제금액 -->
	<Td whitespaceNoWrap>
		<div class="text-red-500">
			{formatMoney({
				money: order.priceToPay
			})}
		</div>
	</Td>
	<!-- 주문상태 -->
	<Td whitespaceNoWrap>
		<div class="flex flex-col space-y-1">
			{#each order.states as state}
				<button
					on:click={() => {
						goto(getUrl(state));
					}}
					class="p-1 rounded border mb-1 text-xs text-center {getColor(
						state
					)}">{state}</button
				>
			{/each}
			{#if !order.isActive}
				<div
					class="bg-red-300 text-red-800 p-1 rounded"
				>
					주문홀딩
				</div>
			{/if}
		</div>
	</Td>

	<!-- 주문일자 -->
	<Td>
		{new Date(order.dateCreated).toLocaleString()}
	</Td>
	<!-- 관리자 메모 -->
	<Td>{order.memoByAdmin ?? '-'}</Td>
	<!-- 방문수령 -->
	<Td>{order.isPickUp ? 'O' : 'X'}</Td>
	<!-- 요구사항 -->
	<Td>{order.hasUserRequest ? 'O' : 'X'}</Td>

	{#if needCheckBox}
		<Td>
			<CheckBox
				group="orders"
				disabled={!order.isActive}
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
	{/if}
</Tr>

{#if selected}
	<tr class="p-0">
		<Td
			colspan={needCheckBox ? '13' : '12'}
			classes="!p-0"
		>
			<OrderDetailListTable {order} />
		</Td>
	</tr>
{/if}
