<script>
	import Td from '$lib/components/Td.svelte';
	import { onMount } from 'svelte';
	import formatPhone from '../../../../../utils/format_phone';

	export let data;
	let works = data.works;
	onMount(() => setTimeout(() => print(), 1000));
	function getRowSpan(work, detail) {
		return work.details.filter(
			(d) =>
				d.product.name === detail.product.name
		).length;
	}
</script>

<main class="p-16 flex flex-col space-y-16">
	{#each works as work}
		<div>
			<section
				class="flex justify-between items-center"
			>
				<div
					class="flex border-t border-l border-r p-5 border-black"
				>
					<div class="flex flex-col">
						<div class="text-sm">주문일자</div>
						<div class="text-lg">
							{new Date(
								work.dateCreated
							).toLocaleString()}
						</div>
					</div>
					<div class="flex flex-col ml-10">
						<div class="text-sm">주문도장</div>
						<div class="text-lg">
							{work.orderMaster.user.gym.name}
						</div>
					</div>
					<div class="flex flex-col ml-10">
						<div class="text-sm">연락처</div>
						<div class="text-lg">
							{formatPhone(
								work.orderMaster.user.phone
							)}
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
								>수량</th
							>
							<th
								class="p-3 text-sm border border-black"
								>이름</th
							>
							<th
								class="p-3 text-sm border border-black"
								>작업상태</th
							>
							<th
								class="p-3 text-sm border border-black"
								>주문자 요청사항</th
							>
						</tr>
					</thead>
					<tbody>
						{#each work.details as detail, index}
							<tr>
								{#if index === 0 || work.details[index - 1].product.name !== detail.product.name}
									<Td
										classes=" border border-black"
										rowspan={getRowSpan(
											work,
											detail
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
									{detail.studentNames.join(', ')}
								</Td>
								<Td
									classes=" border border-black"
								>
									{work.state}
								</Td>
								<Td
									classes=" border border-black"
								>
									{detail.userRequest ?? '-'}
								</Td>
							</tr>
						{/each}
						<tr>
							<Td
								colspan="3"
								classes=" border border-black"
								>총 수량</Td
							>
							<Td classes=" border border-black"
								>{work.details.reduce(
									(a, b) => a + b.quantity,
									0
								)}</Td
							>
						</tr>
					</tbody>
				</table>
			</section>
		</div>
	{/each}
</main>

<div class="my-10" />
