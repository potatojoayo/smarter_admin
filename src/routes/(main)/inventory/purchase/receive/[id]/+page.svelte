<script>
	import { receive } from '../../../../../../stores/inventory.js';
	import Th from '../../../../../../lib/components/Th.svelte';
	import Tr from '../../../../../../lib/components/Tr.svelte';
	import Td from '../../../../../../lib/components/Td.svelte';
	import formatMoney from '../../../../../../utils/format_money';
	import ErrorButton from '../../../../../../lib/components/ErrorButton.svelte';
	import Button from '../../../../../../lib/components/Button.svelte';
	import DialogAddProduct from '../../../../../../lib/components/inventory/purchase/DialogAddProduct.svelte';
	import InputNumber from '../../../../../../lib/components/InputNumber.svelte';
	import InputText from '../../../../../../lib/components/InputText.svelte';
	import formatPhone from '../../../../../../utils/format_phone';

	export let data;
	let order = data.order;
	let suppliers = data.suppliers;
	let details = order.details.edges.map(
		(e) => e.node
	);
	let disabled = order.state !== '발주대기';
</script>

<section class="flex flex-col border rounded">
	<div
		class="bg-primary py-2 px-5 text-lg text-white"
	>
		발주정보
	</div>
	<div
		class="flex wrap justify-between items-center px-7 py-5 "
	>
		<div class="flex flex-col">
			<label class="text-sm">상태</label>
			<div class="mt-3">
				{order.state}
			</div>
		</div>
		<div class="flex flex-col">
			<label class="text-sm">발주일자</label>
			<div class="mt-3">
				{new Date(
					order.dateCreated
				).toLocaleDateString()}
			</div>
		</div>
		<div class="flex flex-col">
			<label class="text-sm">입고예정일자</label>
			<div class="mt-3">
				{new Date(
					order.dateScheduledReceiving
				).toLocaleDateString()}
			</div>
		</div>
		<div class="flex flex-col">
			<label class="text-sm">수정일자</label>
			<div class="mt-3">
				{new Date(
					order.dateUpdated
				).toLocaleDateString()}
			</div>
		</div>
	</div>
</section>
<section
	class="flex flex-col border rounded mt-5"
>
	<div
		class="bg-primary py-2 px-5 text-lg text-white"
	>
		거래처 정보
	</div>
	<div
		class="flex wrap justify-between items-center px-7 py-5 "
	>
		<div class="flex flex-col">
			<label class="text-sm">거래처</label>
			<div class="mt-3">
				{order.supplier.name}
			</div>
		</div>
		<div class="flex flex-col">
			<label class="text-sm">담당자</label>
			<div class="mt-3">
				{order.supplier.manager}
			</div>
		</div>
		<div class="flex flex-col">
			<label class="text-sm">전화번호</label>
			<div class="mt-3">
				{formatPhone(order.supplier.phone)}
			</div>
		</div>
		<div class="flex flex-col">
			<label class="text-sm">이메일</label>
			<div class="mt-3">
				{order.supplier.email}
			</div>
		</div>
		<div class="flex flex-col">
			<label class="text-sm">팩스번호</label>
			<div class="mt-3">
				{order.supplier.fax}
			</div>
		</div>
	</div>
</section>

<main class="mt-5 flex flex-col">
	<div
		class="flex flex-col rounded border mt-3 overflow-hidden"
	>
		<div
			class="bg-primary py-2 px-5 text-lg text-white"
		>
			입고내용
		</div>
		<div class="">
			<table class="w-full">
				<thead>
					<tr class="">
						<Th>상품</Th>
						<Th>색상</Th>
						<Th>사이즈</Th>
						<Th>단가</Th>
						<Th>발주수량</Th>
						<Th>입고수량</Th>
						<Th>미입고수량</Th>
						<Th>발주금액</Th>
						<Th>입고금액</Th>
						<Th>미입고사유</Th>
					</tr>
				</thead>
				<tbody>
					{#each details as detail}
						<Tr>
							<Td>
								{detail.name}
							</Td>
							<Td>
								{detail.color}
							</Td>
							<Td>
								{detail.size}
							</Td>
							<Td>
								{formatMoney(detail.priceVendor)}
							</Td>
							<Td>
								{detail.quantityOrdered}
							</Td>
							<Td>
								{detail.receivedQuantity}
							</Td>
							<Td>
								<InputNumber
									classes="w-16 text-right"
									bind:value={detail.notReceivedQuantity}
									onInput={() => {
										detail.receivedQuantity =
											detail.quantityOrdered -
											detail.notReceivedQuantity;
										detail.priceReceived =
											detail.priceVendor *
											detail.receivedQuantity;
									}}
								/>
							</Td>
							<Td>
								{formatMoney(
									detail.priceVendorTotal
								)}
							</Td>
							<Td>
								{formatMoney(
									detail.priceReceived
								)}
							</Td>
							<Td>
								{#if detail.notReceivedQuantity > 0}
									<InputText
										classes="w-30"
										onInput={() => {
											//TODO
										}}
										bind:value={detail.reasonNotReceived}
									/>
								{:else}
									<span>-</span>
								{/if}
							</Td>
						</Tr>
					{/each}
					<Tr>
						<Td classes="text-lg" colspan="4"
							>합계</Td
						>
						<Td classes="text-lg">
							{details.reduce(
								(a, b) => a + b.quantityOrdered,
								0
							)}
						</Td>
						<Td classes="text-lg">
							{details.reduce(
								(a, b) => a + b.receivedQuantity,
								0
							) ?? 0}
						</Td>
						<Td classes="text-lg">
							{details.reduce(
								(a, b) =>
									a + b.notReceivedQuantity,
								0
							)}
						</Td>
						<Td classes="text-lg">
							{formatMoney(
								details.reduce(
									(a, b) =>
										a + b.priceVendorTotal,
									0
								)
							) ?? 0}
						</Td>
						<Td classes="text-lg">
							{formatMoney(
								details.reduce(
									(a, b) =>
										a + b.priceReceived ?? 0,
									0
								)
							) ?? 0}
						</Td>
						<Td />
					</Tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="flex justify-end mt-5">
		{#if order.state === '발주진행중'}
			<ErrorButton
				classes="w-20 p-3"
				onClick={() => {
					history.back();
				}}>취소</ErrorButton
			>
		{:else}
			<Button
				classes="w-20 p-3"
				onClick={() => {
					history.back();
				}}>확인</Button
			>
		{/if}
		<div class="mx-1" />
		{#if order.state === '발주진행중'}
			<Button
				classes="w-20 p-3"
				onClick={async () => {
					if (
						confirm('입고를 진행하시겠습니까?')
					) {
						if (await receive(order)) {
							alert('입고가 완료되었습니다.');
							return history.back();
						}
						alert('실패');
					}
				}}>입고완료</Button
			>
		{/if}
	</div>
</main>

<div class="my-10" />
