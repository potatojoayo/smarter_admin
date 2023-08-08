<script>
	import InputDate from '../../../../../../lib/components/InputDate.svelte';
	import {
		addInventoryOrderDetails,
		openAddProductDialog,
		saveInventoryOrder,
		selectedOrder,
		startInventoryOrder,
		updateInventoryOrder
	} from '../../../../../../stores/inventory.js';
	import DropdownSelect from '../../../../../../lib/components/DropdownSelect.svelte';
	import Th from '../../../../../../lib/components/Th.svelte';
	import CheckBox from '../../../../../../lib/components/CheckBox.svelte';
	import Tr from '../../../../../../lib/components/Tr.svelte';
	import Td from '../../../../../../lib/components/Td.svelte';
	import formatMoney from '../../../../../../utils/format_money';
	import ErrorButton from '../../../../../../lib/components/ErrorButton.svelte';
	import Button from '../../../../../../lib/components/Button.svelte';
	import { dateToIsoDateString } from '../../../../../../lib/utils/dateToIsoDateString';
	import DialogAddProduct from '../../../../../../lib/components/inventory/purchase/DialogAddProduct.svelte';
	import InputNumber from '../../../../../../lib/components/InputNumber.svelte';
	import { page } from '$app/stores';
	import formatPhone from '../../../../../../utils/format_phone';
	import { goto } from '$app/navigation';
	import { deleteInventoryOrderDetails } from '../../../../../../stores/inventory';

	export let data;
	let order = data.order;
	let suppliers = data.suppliers;
	let details = [];
	$: details = order.details.edges.map(
		(e) => e.node
	);
	let disabled = order.state !== '발주대기';

	let selected = [];
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
			<div class="text-sm">발주일자</div>
			<div class="mt-3">
				{new Date(
					order.dateCreated
				).toLocaleDateString()}
			</div>
		</div>
		<div class="flex flex-col">
			<label class="text-sm">입고예정일자</label>
			<div class="mt-3">
				<InputDate
					{disabled}
					max={null}
					value={dateToIsoDateString(
						order.dateScheduledReceiving
					)}
					onInput={(e) => {
						order.dateScheduledReceiving =
							new Date(
								e.target.value
							).toISOString();
					}}
				/>
			</div>
		</div>
		<div class="flex flex-col">
			<label class="text-sm">수정일자</label>
			<div class="mt-3">
				{dateToIsoDateString(order.dateUpdated)}
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
				<DropdownSelect
					{disabled}
					options={suppliers}
					bind:value={order.supplier}
					placeholder="거래처를 선택해주세요"
				/>
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
	{#if !disabled}
		<div class="flex justify-end">
			<Button
				classes="w-20 p-3"
				onClick={async () => {
					if (
						confirm(
							'업데이트를 진행하시겠습니까?'
						)
					) {
						if (
							await updateInventoryOrder(
								order.orderId
							)
						) {
							alert('업데이트가 완료되었습니다.');
							return location.reload();
						}
						alert('실패');
					}
				}}>업데이트</Button
			>
			<div class="mx-1" />
			<ErrorButton
				classes="w-20 p-3"
				onClick={async () => {
					if (selected.length === 0) {
						return alert(
							'삭제하실 상품을 선택해주세요.'
						);
					}
					if (
						confirm(
							'선택하신 상품을 삭제하시겠습니까?'
						)
					) {
						if (
							await deleteInventoryOrderDetails(
								selected
							)
						) {
							alert(
								'선택하신 상품이 삭제되었습니다.'
							);
							return location.reload();
						}
					}
				}}>삭제</ErrorButton
			>
			<div class="mx-1" />
			<Button
				classes="w-20 p-3"
				onClick={openAddProductDialog}
			>
				<span> 상품추가 </span>
			</Button>
		</div>
	{/if}
	<div
		class="flex flex-col rounded border mt-3 overflow-hidden"
	>
		<div
			class="bg-primary py-2 px-5 text-lg text-white"
		>
			발주내용
		</div>
		<div class="">
			<table class="w-full">
				<thead>
					<tr class="">
						<Th>기준일</Th>
						<Th>상품</Th>
						<Th>색상</Th>
						<Th>사이즈</Th>
						<Th>단가</Th>
						<Th>재고수량</Th>
						<Th>입고예정수량</Th>
						<Th>목표재고수량</Th>
						<Th>발주수량</Th>
						<Th>총 금액</Th>
						{#if !disabled}
							<Th
								><CheckBox
									group="product"
									parent
									onChange={(checked) => {
										if (checked) {
											selected = details.map(
												(d) => d.detailId
											);
										} else {
											selected = [];
										}
									}}
								/></Th
							>
						{/if}
					</tr>
				</thead>
				<tbody>
					{#each details as detail}
						<Tr>
							<Td>
								{dateToIsoDateString(
									order.dateUpdated
								)}
							</Td>
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
								<div class="flex flex-col">
									<span>
										{detail.inventoryQuantity}
									</span>
									<span
										class="text-xs text-gray-500"
									/>
								</div>
							</Td>
							<Td>
								{detail.expectedInventoryQuantity}
							</Td>
							<Td>
								{detail.goalInventoryQuantity}
							</Td>
							<Td>
								<InputNumber
									{disabled}
									classes="text-sm text-center w-16"
									bind:value={detail.quantityOrdered}
									onInput={() => {
										detail.priceVendorTotal =
											detail.quantityOrdered *
											detail.priceVendor;
									}}
								/>
							</Td>
							<Td>
								{formatMoney(
									detail.priceVendorTotal
								)}
							</Td>
							{#if !disabled}
								<Td>
									<CheckBox
										group="product"
										onChange={(checked) => {
											if (checked) {
												selected.push(
													detail.detailId
												);
											} else {
												selected =
													selected.filter(
														(s) =>
															s !==
															detail.detailId
													);
											}
										}}
									/>
								</Td>
							{/if}
						</Tr>
					{/each}
					<Tr>
						<Td classes="text-lg" colspan="8"
							>합계</Td
						>
						<Td classes="text-lg">
							{details.reduce(
								(a, b) => a + b.quantityOrdered,
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
							)}
						</Td>
						{#if !disabled}
							<Td />
						{/if}
					</Tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="flex justify-end mt-5">
		{#if !disabled}
			<Button
				classes="w-20 p-3"
				onClick={() => {
					goto('/inventory/purchase');
				}}>목록</Button
			>
			<div class="mx-2" />
			<Button
				classes="w-20 p-3"
				onClick={async () => {
					if (confirm('저장하시겠습니까?')) {
						if (await saveInventoryOrder(order)) {
							alert('저장되었습니다.');
							return location.reload();
						}
						alert('실패');
					}
				}}>저장</Button
			>
			<div class="mx-2" />
			<Button
				classes="w-20 p-3"
				onClick={async () => {
					if (!order.dateScheduledReceiving) {
						return alert(
							'입고 예정일자를 입력해주세요.'
						);
					}
					if (
						confirm(
							'발주 진행상태가 되면 수정을 할 수 없습니다. 발주를 진행하시겠습니까?'
						)
					) {
						if (
							(await saveInventoryOrder(order)) &&
							(await startInventoryOrder(
								order.orderId
							))
						) {
							alert('발주가 진행되었습니다.');
							return location.reload();
						}
					}
				}}>발주진행</Button
			>
		{:else}
			<Button
				classes="p-3"
				onClick={() => {
					$selectedOrder = order;
					open(
						`${$page.url.origin}/print/purchase/${order.id}`,
						'_blank',
						'height=800, width=800'
					);
				}}>발주서 출력</Button
			>
		{/if}
	</div>
</main>

<div class="my-10" />

<DialogAddProduct orderId={order.orderId} />
