<script>
	import Td from '$lib/components/Td.svelte';
	import formatMoney from '$lib/utils/formatMoney';
	import { formatPhone } from '$lib/utils/formatPhone';
	import { receive } from '$stores/inventory';
	import { onMount } from 'svelte';

	export let data;
	const addedOrders = JSON.parse(
		localStorage.getItem('addedOrders')
	);
	const easyOrder = JSON.parse(
		localStorage.getItem('easyOrder')
	);
	const address = JSON.parse(
		localStorage.getItem('address')
	);
	const easyOrderIsVisit = JSON.parse(
		localStorage.getItem('easyOrderIsVisit')
	);

	function getRowSpan(detail) {
		return addedOrders.filter(
			(d) =>
				d.productMaster.name ===
				detail.productMaster.name
		).length;
	}
</script>

<main class="p-16">
	<section
		class="flex justify-between items-center"
	>
		<div
			class="flex border-t border-l border-r p-5 border-black"
		>
			<div class="flex flex-col">
				<div class="text-sm">주문일자</div>
				<div class="text-lg">
					{new Date().toLocaleString()}
				</div>
			</div>
			<div class="flex flex-col ml-10">
				<div class="text-sm">주문도장</div>
				<div class="text-lg">
					{easyOrder.user.gym.name}
				</div>
			</div>
			<div class="flex flex-col ml-10">
				<div class="text-sm">주소</div>
				<div class="text-lg">
					{#if easyOrderIsVisit}
						직접수령
					{:else}
						{`${address.address} ${address.detailAddress} (우:${address.zipCode})`}
					{/if}
				</div>
			</div>
			<div class="flex flex-col ml-10">
				<div class="text-sm">받는사람</div>
				<div class="text-lg">
					{#if easyOrderIsVisit}
						""
					{:else}
						{address.receiver}
					{/if}
				</div>
			</div>
			<div class="flex flex-col ml-10">
				<div class="text-sm">연락처</div>
				<div class="text-lg whitespace-nowrap">
					{#if easyOrderIsVisit}
						""
					{:else}
						{address.phone}
					{/if}
				</div>
			</div>
		</div>
	</section>

	<section class="flex flex-col">
		<table class="w-full border-collapse">
			<thead>
				<tr>
					<th
						class="p-3 text-sm border border-black"
						>상품명</th
					>
					<th
						class="p-3 text-sm border border-black"
						>색상</th
					>
					<th
						class="p-3 text-sm border border-black"
						>사이즈</th
					>
					<th
						class="p-3 text-sm border border-black"
						>개당단가</th
					>
					<th
						class="p-3 text-sm border border-black"
						>주문수량</th
					>
					<th
						class="p-3 text-sm border border-black"
						>주문금액</th
					>
				</tr>
			</thead>
			<tbody>
				{#each addedOrders as detail, index}
					<tr>
						{#if index === 0 || addedOrders[index - 1].product.name !== detail.product.name}
							<Td
								classes=" border border-black"
								rowspan={getRowSpan(detail)}
							>
								{detail.productMaster.name}
							</Td>
						{/if}
						<Td classes=" border border-black">
							{detail.product.color}
						</Td>
						<Td classes=" border border-black">
							{detail.product.size}
						</Td>
						<Td classes=" border border-black">
							{formatMoney({
								money:
									detail.product.priceAdditional +
									detail.productMaster.priceGym +
									(detail.draft
										? detail.draft.priceWork
										: 0)
							})}
						</Td>
						<Td classes=" border border-black">
							{detail.product.quantity}
						</Td>
						<Td classes=" border border-black">
							{formatMoney({
								money:
									(detail.product
										.priceAdditional +
										detail.productMaster
											.priceGym +
										(detail.draft
											? detail.draft.priceWork
											: 0)) *
									detail.product.quantity
							})}
						</Td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</main>

<div class="my-10" />
