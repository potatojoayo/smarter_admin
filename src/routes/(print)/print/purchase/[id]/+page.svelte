<script>
	import Td from '$lib/components/TdForPrint.svelte';
	import { admin } from '../../../../../stores/admin.js';
	import formatMoney from '../../../../../utils/format_money.js';
	import { onMount } from 'svelte';
	export let data;
	let order = data.order;
	let details = order.details.edges.map(
		(e) => e.node
	);
	onMount(() => setTimeout(() => print(), 1000));
</script>

<main class="flex flex-col p-5" id="purchase">
	<div class="text-3xl mx-auto">발 주 서</div>
	<div class="flex mt-2">
		<div>
			작성일 :
			{new Date(
				order.dateCreated
			).toLocaleDateString()}
		</div>
	</div>

	<table
		class="w-full mt-14 border-collapse table-fixed"
	>
		<tr>
			<Td colspan="2">수주처</Td>
			<td class="w-5" />
			<Td colspan="2">발주처</Td>
		</tr>
		<tr>
			<Td>상호</Td>
			<Td>{$admin.businessName}</Td>
			<td />
			<Td>상호</Td>
			<Td>{order.supplier.name}</Td>
		</tr>
		<tr>
			<Td>담당자</Td>
			<Td>{$admin.manager}</Td>
			<td />
			<Td>담당자</Td>
			<Td>{order.supplier.manager}</Td>
		</tr>
		<tr>
			<Td>전화</Td>
			<Td>{$admin.manager}</Td>
			<td />
			<Td>전화</Td>
			<Td>{order.supplier.phone}</Td>
		</tr>
		<tr>
			<Td>이메일</Td>
			<Td>{$admin.email}</Td>
			<td />
			<Td>이메일</Td>
			<Td>{order.supplier.email}</Td>
		</tr>
		<tr>
			<Td>팩스</Td>
			<Td>{$admin.fax}</Td>
			<td />
			<Td>팩스</Td>
			<Td>{order.supplier.fax}</Td>
		</tr>
		<tr>
			<Td colspan="5">
				<div
					class="flex flex-col items-start p-5"
				>
					<div>
						<span>납기일자 : </span>
						<span>
							{new Date(
								order.dateScheduledReceiving
							).toLocaleDateString()}
						</span>
					</div>
					<div class="mt-3">
						<span>납품장소 : </span>
						<span>
							{$admin.receiveAddress}
						</span>
					</div>
					<div class="mt-3">
						<span>합계금액 : </span>
						<span>
							{formatMoney(order.priceTotal)}
						</span>
					</div>
				</div>
			</Td>
		</tr>
	</table>

	<table class="mt-10 border-collapse w-full">
		<thead>
			<tr>
				<Td>상품명</Td>
				<Td>색상</Td>
				<Td>사이즈</Td>
				<Td>단가</Td>
				<Td>발주수량</Td>
				<Td>총 금액</Td>
				<Td>비고</Td>
			</tr>
		</thead>
		<tbody>
			{#each order.details.edges.map((e) => e.node) as detail}
				<tr>
					<Td>{detail.name}</Td>
					<Td>{detail.color}</Td>
					<Td>{detail.size}</Td>
					<Td
						>{formatMoney(detail.priceVendor)}</Td
					>
					<Td>{detail.quantityOrdered}</Td>
					<Td
						>{formatMoney(
							detail.priceVendorTotal
						)}</Td
					>
					<Td />
				</tr>
			{/each}
			<tr>
				<Td colspan="4">합계</Td>
				<Td
					>{details.reduce(
						(a, b) => a + b.quantityOrdered,
						0
					)}</Td
				>
				<Td
					>{formatMoney(
						details.reduce(
							(a, b) => a + b.priceTotal,
							0
						)
					)}</Td
				>
				<Td />
			</tr>
		</tbody>
	</table>
</main>
