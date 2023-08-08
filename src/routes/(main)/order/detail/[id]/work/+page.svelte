<script>
	import { groupBy } from '../../../../../../lib/utils/groupBy.js';
	import Tr from '../../../../../../lib/components/Tr.svelte';
	import Td from '../../../../../../lib/components/Td.svelte';

	export let data;
	let order = data.order;

	let detailsBySubcontractor = groupBy(
		order.orderDetails,
		'subcontractorName'
	);
</script>

<section class="flex border p-5 w-fit rounded">
	<div class="flex flex-col">
		<div class="text-sm">주문일자</div>
		<div>
			{order.dateCreated}
		</div>
	</div>
	<div class="flex flex-col ml-10">
		<div class="text-sm">주문도장</div>
		<div>
			{order.gymName}
		</div>
	</div>
	<div class="flex flex-col ml-10">
		<div class="text-sm">연락처</div>
		<div>
			{order.ordererPhone}
		</div>
	</div>
</section>

<section class="flex flex-col">
	{#each Object.entries(detailsBySubcontractor) as [subcontractorName, _]}
		<div class="text-lg mt-5">
			{subcontractorName}
		</div>
		<div class="border rounded mt-2 p-5">
			{#each Object.entries(groupBy(detailsBySubcontractor[subcontractorName], 'draftImage')) as [draftImage, _]}
				<div
					class="flex mt-5 flex-col items-center"
				>
					<div class="">
						<img
							src={draftImage}
							alt=""
							class="object-contain"
						/>
					</div>
					<div
						class="flex flex-col w-full mt-5 min-w-[500px] flex-1"
					>
						<div class="border rounded">
							<table class="w-full">
								<thead>
									<tr class="bg-primaryLight">
										<th class="p-3 text-sm"
											>상품이름</th
										>
										<th class="p-3 text-sm"
											>색깔</th
										>
										<th class="p-3 text-sm"
											>사이즈</th
										>
										<th class="p-3 text-sm"
											>개수</th
										>
										<th class="p-3 text-sm"
											>이름</th
										>
										<th class="p-3 text-sm"
											>상태</th
										>
										<th
											class="p-3 text-sm whitespace-nowrap"
											>관리자메모</th
										>
										<th
											class="p-3 text-sm whitespace-nowrap"
											>작업자메모</th
										>
									</tr>
								</thead>
								<tbody>
									{#each groupBy(detailsBySubcontractor[subcontractorName], 'draftImage')[draftImage] as item}
										<Tr>
											<Td>
												{item.name}
											</Td>
											<Td>
												{item.color}
											</Td>
											<Td>
												{item.size}
											</Td>
											<Td>
												{item.quantity}
											</Td>
											<Td>
												{item.names.join(', ')}
											</Td>
											<Td>
												{item.workType +
													' ' +
													item.workState}
											</Td>
											<Td>
												{item.memoByAdmin}
											</Td>
											<Td>
												{item.memoBySubcontractor}
											</Td>
										</Tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/each}
</section>

<div class="my-10" />
