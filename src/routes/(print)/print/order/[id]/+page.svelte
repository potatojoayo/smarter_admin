<script>
	import Td from '$lib/components/Td.svelte';
	import formatMoney from '$lib/utils/formatMoney';
	import { formatPhone } from '$lib/utils/formatPhone';
	import { onMount } from 'svelte';

	export let data;
	const { orders } = data;
	onMount(() => setTimeout(() => print(), 1000));
	function getRowSpan(detail, order) {
		return order.details.filter(
			(d) =>
				d.product.name === detail.product.name
		).length;
	}
</script>

<main class="p-8">
	{#each orders as order (order.id)}
		<div class="mb-8 inline-block">
			<section
				class="flex justify-between items-center w-full"
			>
				<div
					class="flex border-t border-l border-r p-5 border-black w-full"
				>
					<div class="flex flex-col">
						<div class="text-sm">주문일자</div>
						<div class="text-lg">
							{new Date(
								order.dateCreated
							).toLocaleString()}
						</div>
					</div>
					<div class="flex flex-col ml-10">
						<div class="text-sm">주문도장</div>
						<div class="text-lg">
							{order.user.gym.name}
						</div>
					</div>
					<div class="flex flex-col ml-10">
						<div class="text-sm">주소</div>
						<div class="text-lg">
							{order.address}
							{order.detailAddress}
							(우:{order.zipCode})
						</div>
					</div>
					<div class="flex flex-col ml-10">
						<div class="text-sm">받는사람</div>
						<div class="text-lg">
							{order.receiver}
						</div>
					</div>
					<div class="flex flex-col ml-10">
						<div class="text-sm">연락처</div>
						<div
							class="text-lg whitespace-nowrap"
						>
							{formatPhone(order.user.phone)}
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
								>주문수량</th
							>
							<th
								class="p-3 text-sm border border-black"
								>주문금액</th
							>
						</tr>
					</thead>
					<tbody>
						{#each order.details as detail, index}
							<tr>
								{#if index === 0 || order.details[index - 1].product.name !== detail.product.name}
									<Td
										classes=" border border-black"
										rowspan={getRowSpan(
											detail,
											order
										)}
									>
										{detail.product.name}
									</Td>
								{/if}
								<Td
									classes=" border border-black"
								>
									{detail.product.color}
								</Td>
								<Td
									classes=" border border-black"
								>
									{detail.product.size}
								</Td>
								<Td
									classes=" border border-black"
								>
									{detail.quantity}
								</Td>
								<Td
									classes=" border border-black"
								>
									{formatMoney({
										money:
											detail.priceProducts +
											detail.priceWork
									})}
								</Td>
							</tr>
						{/each}
						<tr>
							<Td
								colspan="2"
								classes="!py-2 border-black text-right"
							/>
							<Td
								classes="!py-2 border-black border"
								>합계</Td
							>
							<Td classes=" border border-black">
								{order.details.reduce(
									(a, b) => a + b.quantity,
									0
								)}
							</Td>
							<Td classes=" border border-black">
								{formatMoney({
									money: order.details.reduce(
										(a, b) =>
											a +
											b.priceProducts +
											b.priceWork,
										0
									)
								})}
							</Td>
						</tr>
						<tr>
							<Td colspan="3" classes="!py-2" />
							<Td
								classes="!py-2 border border-black"
							>
								배송비
							</Td>
							<Td classes=" border border-black">
								{formatMoney({
									money: order.priceDelivery
								})}
							</Td>
						</tr>
						<tr>
							<Td colspan="3" classes="!py-2" />
							<Td
								classes="!py-2 border border-black"
							>
								스마터머니사용
							</Td>
							<Td classes=" border border-black">
								{#if order.smarterMoney}
									-{formatMoney({
										money: order.smarterMoney
									})}
								{:else}
									- 0 원
								{/if}
							</Td>
						</tr>
						<tr>
							<Td colspan="3" classes="!py-2" />
							<Td
								classes="!py-2 border border-black"
							>
								쿠폰사용
							</Td>
							<Td classes=" border border-black">
								{#if order.coupon.price}
									-{formatMoney({
										money: order.coupon.price
									})}
								{:else}
									- 0 원
								{/if}
							</Td>
						</tr>
						<tr>
							<Td colspan="3" classes="!py-2" />
							<Td
								classes="!py-2 border border-black"
							>
								총금액
							</Td>
							<Td classes=" border border-black">
								{formatMoney({
									money: order.priceToPay
								})}
							</Td>
						</tr>
					</tbody>
				</table>
			</section>
		</div>
	{/each}
</main>

<div class="my-10" />
