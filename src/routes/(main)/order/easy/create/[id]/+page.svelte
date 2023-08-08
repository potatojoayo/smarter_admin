<script lang="ts">
	import SelectDraft from '$lib/components/user/SelectDraft.svelte';
	import Button from '$lib/components/Button.svelte';
	import AddedProductTable from '$lib/components/order/AddedProductTable.svelte';
	import ErrorButton from '$lib/components/ErrorButton.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Th from '$lib/components/Th.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import Td from '$lib/components/Td.svelte';
	import { getProductMastersEasyOrder } from '../../../../../../stores/product.js';
	import Pagination from '$lib/components/Pagination.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { completeEasyOrder } from '../../../../../../stores/order.js';
	import CategoryBrandDropdown from '$lib/components/product/CategoryBrandDropdown.svelte';
	import formatMoney from '$lib/utils/formatMoney';
	import { formatPhone } from '$lib/utils/formatPhone.js';
	import DraftDetailModal from '$lib/components/modal/DraftDetailModal.svelte';
	import InputDate from '$lib/components/input/InputDate.svelte';
	import TextButton from '$lib/components/buttons/TextButton.svelte';
	import MdBlack from '$lib/components/base/MdBlack.svelte';
	import ChangeAdressModal from '$lib/components/modal/ChangeAdressModal.svelte';
	import mixpanel from 'mixpanel-browser';
	import ProductMemoModal from '$lib/components/modal/ProductMemoModal.svelte';

	let id = 0;
	export let data;
	let easyOrder = data.easyOrder;
	let userId = easyOrder.user.userId;
	let defaultAddress = easyOrder.defaultAddress;
	let deliveryOpen = false;
	let addresses = easyOrder.user.addresses;
	let easyOrderIsVisit = easyOrder.isVisit;
	let address = {
		id: defaultAddress.id,
		address: defaultAddress.address,
		detailAddress: defaultAddress.detailAddress,
		name: defaultAddress.name,
		phone: defaultAddress.phone,
		receiver: defaultAddress.receiver,
		zipCode: defaultAddress.zipCode
	};

	let productMasters = [];
	let addedProducts = [];
	let selectedProductMaster;
	let selectedDraft;
	let category;
	let subCategory;
	let brand;
	let orderDetailMemo = '';
	let orderMasterMemo = '';
	let checked = false;

	let useDraft = false;
	let productMemoOpen = false;
	let productName = '';
	let productMemo = '';

	function toggleUseDraft(e) {
		if (!useDraft) {
			selectedDraft = null;
		} else {
			if (
				selectedProductMaster.drafts.length > 0
			) {
				selectedDraft =
					selectedProductMaster.drafts[0];
			} else {
				selectedDraft = null;
			}
		}
	}
	$: {
		if (addedProducts) {
			checked = false;
		}
	}

	let open = false;

	let totalCount = 0;

	$: {
		getProductMastersEasyOrder(
			$page.url.searchParams.get('page'),
			$page.url.searchParams.get('keyword'),
			easyOrder.user.userId,
			category,
			subCategory,
			brand
		).then((r) => {
			productMasters = r.productMasters;
			totalCount = r.totalCount;
		});
	}

	function onSuccessAddDraft() {
		getProductMastersEasyOrder(
			$page.url.searchParams.get('page'),
			$page.url.searchParams.get('keyword'),
			easyOrder.user.userId,
			category,
			subCategory,
			brand
		).then((r) => {
			productMasters = r.productMasters;
			totalCount = r.totalCount;
			selectedProductMaster = productMasters.find(
				(p) => p.id === selectedProductMaster.id
			);
		});
	}

	function addProduct() {
		selectedProductMaster.products.forEach(
			(p) => {
				if (p.quantity > 0 || p.names) {
					if (p.names) {
						p.quantity =
							p.names.split(',').length;
					}
					addedProducts.push({
						id: id,
						productMaster: selectedProductMaster,
						product: { ...p },
						draft: selectedDraft,
						names: p.names,
						count: p.quantity,
						memo: orderDetailMemo
					});
					id += 1;
				}
			}
		);
		addedProducts = addedProducts;
		for (
			let i = 0;
			i < selectedProductMaster.products.length;
			i++
		) {
			selectedProductMaster.products[i].quantity =
				null;
			selectedProductMaster.products[i].names =
				null;
			selectedProductMaster.products[
				i
			].dateToBeShipped = undefined;
			selectedProductMaster.products[
				i
			].isDirectDelivery = undefined;
		}
		document
			.querySelectorAll('input[type="date"]')
			.forEach((i) => {
				i.value = undefined;
			});
	}

	async function order() {
		if (addedProducts.length === 0) {
			return alert('주문할 상품을 추가해주세요.');
		}
		if (!checked) {
			localStorage.setItem(
				'addedOrders',
				JSON.stringify(addedProducts)
			);
			localStorage.setItem(
				'easyOrder',
				JSON.stringify(easyOrder)
			);
			localStorage.setItem(
				'address',
				JSON.stringify(address)
			);
			localStorage.setItem(
				'easyOrderIsVisit',
				JSON.stringify(easyOrderIsVisit)
			);
			window.open(
				'/print/easyOrder/',
				'_blank',
				'height=800, width=1400'
			);
			checked = true;
		} else {
			checked = false;
			if (!confirm('주문하시겠습니까?')) return;

			let productInputList = addedProducts.map(
				(p) => {
					return {
						productMasterId:
							p.productMaster.productMasterId,
						productId: p.product.id,
						quantity: p.count,
						draftId: p.draft ? p.draft.id : null,
						studentNames: p.names
							? p.names
									.split(',')
									.map((n) => n.trim())
							: [],
						userRequest: p.memo
					};
				}
			);

			let placement = {
				easyOrderId: easyOrder.easyOrderId,
				productInputList: productInputList
			};

			if (
				await completeEasyOrder(
					placement.easyOrderId,
					placement.productInputList,
					orderMasterMemo,
					address.id,
					easyOrderIsVisit
				)
			) {
				alert('주문이 완료되었습니다.');
				return goto('/order/easy');
			}
		}
	}

	function downloadImage(url, name) {
		fetch(url)
			.then((resp) => resp.blob())
			.then((blob) => {
				const url =
					window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.style.display = 'none';
				a.href = url;
				a.target = '_blank';
				// the filename you want
				a.download = name;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
			})
			.catch(() => alert('An error sorry'));
	}

	function handleSelectProduct(product) {
		useDraft = false;
		selectedDraft = null;
		selectedProductMaster = product;
	}
</script>

<section class="flex">
	<div
		class="flex border p-5 rounded min-w-[350px] bg-white"
	>
		<div class="flex flex-col relative">
			<div class="flex flex-col">
				<span class="text-sm text-gray-500"
					>요청날짜</span
				>
				<div class="text-lg">
					{new Date(
						easyOrder.dateCreated
					).toLocaleDateString()}
				</div>
			</div>
			<div class="flex mt-5">
				<div class="flex flex-col">
					<span class="text-sm text-gray-500"
						>주문자</span
					>
					<div class="text-lg">
						{easyOrder.user.name}
					</div>
				</div>
				<div class="mx-5" />
				<div class="flex flex-col">
					<span class="text-sm text-gray-500"
						>연락처</span
					>
					<div class="text-lg">
						{formatPhone(easyOrder.user.phone)}
					</div>
				</div>
			</div>
			<div
				class="flex mt-5 flex-col items-start space-y-2"
			>
				<div class="flex flex-col">
					<span class="text-sm text-gray-500"
						>체육관</span
					>
					<div class="text-lg">
						{easyOrder.user.gym.name}
					</div>
				</div>
				<div class="mx-5" />
				<div class="flex flex-col">
					<span class="text-sm text-gray-500"
						>체육사</span
					>
					<div class="text-lg">
						{easyOrder.user.gym.agency
							? easyOrder.user.gym.agency.name
							: '-'}
					</div>
				</div>
				<div class="mx-5" />
				<!-- <div class="flex flex-col items-center">
					<span class="text-sm text-gray-500"
						>방문수령</span
					>
					<div>
						{easyOrder.isVisit ? 'O' : 'X'}
					</div>
				</div> -->
				<div class="mx-5" />
				<div class="flex flex-col items-center">
					<span class="text-sm text-gray-500"
						>추가주문</span
					>
					<div>
						{easyOrder.isOrderMore ? 'O' : 'X'}
					</div>
				</div>
				<div class="flex flex-col b">
					<span class="text-sm text-gray-500"
						>배송정보</span
					>
					<table class="w-[300px] mt-2 border ">
						<Tr>
							<Th classes="border">
								<MdBlack text={'방문수령'} />
							</Th>
							<Th
								classes="border-none flex justify-center items-center"
							>
								<input
									type="checkbox"
									bind:checked={easyOrderIsVisit}
								/>
							</Th>
						</Tr>
						{#if !easyOrderIsVisit}
							<Tr classes="hover:not">
								<Th classes="border">이름</Th>
								<Th>{address.receiver}</Th>
							</Tr>
							<Tr classes="hover:not">
								<Th classes="border">주소</Th>
								<Th classes="whitespace-pre-wrap">
									{#if address.address !== ''}
										{`${address.address} ${address.detailAddress} (우:${easyOrder.defaultAddress.zipCode})`}
									{:else}
										주소가 없습니다.
									{/if}
								</Th>
							</Tr>
							<Tr classes="hover:not">
								<Th classes="border">연락처</Th>
								<Th
									>{formatPhone(
										address.phone
									)}</Th
								>
							</Tr>
							<Tr classes="hover:not">
								<Th
									classes="text-center "
									colspan="2"
								>
									<TextButton
										on:click={() =>
											(deliveryOpen = true)}
										text={'배송지변경'}
									/>
								</Th>
							</Tr>
						{/if}
					</table>
				</div>
			</div>

			{#if easyOrder.files}
				<div class="flex flex-col mt-5">
					<div class="flex justify-between">
						<span
							class="text-lg flex items-center"
							><i
								class="fa fa-file text-gray-800 mr-2"
							/>
							첨부파일</span
						>

						<Button
							onClick={() => {
								for (
									let i = 0;
									i < easyOrder.files.length;
									i++
								) {
									downloadImage(
										easyOrder.files[i].file,
										easyOrder.user.gym.name +
											'간편주문로고' +
											i +
											Date.now() +
											easyOrder.files[i].file
												.split('.')
												.pop()
									);
								}
							}}
						>
							<i class="fa fa-download mr-1" />
							다운로드
						</Button>
					</div>
					<div class="flex flex-col mt-2">
						{#each easyOrder.files as file, i}
							<a
								class="rounded ml-3 cursor-pointer border rounded mt-2 p-2"
								href={file.file}
								target="_blank"
								download
							>
								파일 {i + 1}
							</a>
						{/each}
					</div>
				</div>
			{/if}
			<div
				class="flex flex-col justify-center mb-10 fixed bottom-[40px] bg-white "
			>
				<textarea
					readonly
					class="min-h-[150px] w-[320px]  rounded max-h-[450px]"
					>{easyOrder.contents}</textarea
				>
				<div />
			</div>
		</div>
	</div>
	<div class="mx-2" />
	<div class="flex flex-col ml-5 flex-1">
		<div class="flex">
			<SearchBar />
			<div class="mx-1" />
			<CategoryBrandDropdown
				bind:category
				bind:subCategory
				bind:brand
			/>
		</div>
		<table
			class="table-auto border-collapse w-full parent w-full mt-3 bg-white border"
		>
			<thead class="">
				<tr>
					<Th>상품번호</Th>
					<Th>브랜드</Th>
					<Th>카테고리</Th>
					<Th>상품메모</Th>
					<Th>상품명</Th>
					<Th>체육관 판매가</Th>
				</tr>
			</thead>
			<tbody>
				{#each productMasters as product}
					<Tr
						classes="cursor-pointer h-16 {selectedProductMaster &&
						selectedProductMaster.id ===
							product.id
							? '!bg-primary !text-white hover:!bg-primary'
							: ''}"
						onClick={() =>
							handleSelectProduct(product)}
					>
						<Td>{product.productNumber}</Td>
						<Td>{product.brand.name}</Td>
						<Td whitespaceNoWrap
							>{product.category.name} > {product
								.subCategory.name}</Td
						>

						<!-- 상품메모 -->
						<Td>
							{#if product.memo}
								<span
									class="ml-2 text-xl flex justify-start items-center"
									on:click|stopPropagation={() => {
										productName = product.name;
										productMemo = product.memo;
										productMemoOpen = true;
									}}
								>
									<TextButton text={'상품메모'} />
								</span>
							{/if}
						</Td>

						<!-- 상품메모 -->

						<Td whitespaceNoWrap
							>{product.name}</Td
						>
						<Td
							>{formatMoney({
								money: product.priceGym
							})}
						</Td>
					</Tr>
				{/each}
			</tbody>
		</table>
		<Pagination
			{totalCount}
			count={10}
			classes="mt-5"
		/>

		{#if selectedProductMaster}
			<section
				class="flex flex-col shadow rounded p-5 mt-5 bg-white border"
			>
				<div class="flex justify-center ">
					<div class="flex flex-col ml-10">
						<div
							class="flex justify-between space-x-20"
						>
							<div class="flex flex-col">
								<div class="flex">
									<div class="flex flex-col">
										<div class="text-gray-500">
											{selectedProductMaster.brand
												.name}
										</div>
										<div class="text-xl">
											{selectedProductMaster.name}
										</div>
										<div
											class="text-gray-500 text-lg"
										>
											{selectedProductMaster
												.category.name}
										</div>
									</div>
								</div>
								<div class="mt-5">가격</div>
								<div class="text-xl">
									{formatMoney({
										money:
											selectedProductMaster.priceGym
									})}
								</div>
							</div>
						</div>

						<div class="flex flex-col">
							{#if selectedProductMaster.drafts.length > 0}
								<label>
									<input
										class="my-8"
										type="checkbox"
										bind:checked={useDraft}
										on:change={toggleUseDraft}
									/>
									로고시안 사용</label
								>
								{#if useDraft}
									<SelectDraft
										drafts={selectedProductMaster.drafts}
										onUpdateDraft={onSuccessAddDraft}
										bind:selected={selectedDraft}
									/>
								{/if}

								<div class="mt-10">요청사항</div>
								<textarea
									bind:value={orderDetailMemo}
									class="mt-2 resize-none rounded"
								/>
							{/if}
						</div>

						<Button
							classes="mt-5 p-3"
							onClick={() => {
								open = true;
							}}
							>로고시안 등록
						</Button>
						<table
							class="table-auto border-collapse w-full parent w-full mt-5 border"
						>
							<thead class="">
								<tr>
									<Th>색상</Th>
									<Th>사이즈</Th>
									<Th>추가금액</Th>
									<Th>재고수량</Th>
									<Th>수량</Th>
									<Th>이름</Th>
									<Th>입고예정일</Th>
									<Th>직송</Th>
								</tr>
							</thead>
							<tbody>
								{#each selectedProductMaster.products as product}
									<Tr>
										<Td whitespaceNoWrap
											>{product.color}</Td
										>
										<Td>{product.size}</Td>
										<Td
											>{formatMoney({
												money:
													product.priceAdditional
											})}
										</Td>
										<Td
											>{product.inventoryQuantity}</Td
										>
										<Td>
											<input
												type="number"
												class="rounded w-20"
												bind:value={product.quantity}
											/>
										</Td>
										<Td>
											<input
												type="text"
												class="rounded"
												value={product.names
													? product.names
													: ''}
												on:input={(e) => {
													product.names =
														e.target.value;
													product.quantity =
														product.names
															? product.names
																	.split(',')
																	.filter(
																		(name) =>
																			name.trim()
																	).length
															: 0;
												}}
											/>
										</Td>
										<Td>
											<InputDate
												onChange={(date) => {
													product.dateToBeShipped =
														date;
												}}
											/>
										</Td>
										<Td>
											<input
												type="checkbox"
												bind:checked={product.isDirectDelivery}
											/>
										</Td>
									</Tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
				<div class="flex justify-end">
					<Button
						classes="p-3 w-20 mt-5"
						onClick={addProduct}
						>추가
					</Button>
				</div>
			</section>
		{/if}

		<AddedProductTable bind:addedProducts />
		<div
			class="flex flex-col border rounded bg-white p-4 space-y-4"
		>
			<div>메모</div>
			<textarea
				cols="30"
				bind:value={orderMasterMemo}
				placeholder="주문 메모를 입력해주세요."
			/>
		</div>
	</div>
</section>

<div class="flex justify-end my-8">
	<ErrorButton
		classes="p-3 w-20"
		onClick={() => {
			goto('/order/easy');
		}}
		>취소
	</ErrorButton>
	<div class="mx-1" />
	<Button classes="p-3 w-20" onClick={order}
		>주문하기
	</Button>
</div>

{#if open}
	<DraftDetailModal
		bind:open
		userId={easyOrder.user.userId}
		add
		editable
		onSuccess={onSuccessAddDraft}
		category={selectedProductMaster.category.name}
		subCategory={selectedProductMaster.subCategory
			.name}
	/>
{/if}

{#if deliveryOpen}
	<ChangeAdressModal
		bind:open={deliveryOpen}
		{addresses}
		{userId}
		bind:address
	/>
{/if}

{#if productMemoOpen}
	<ProductMemoModal
		bind:open={productMemoOpen}
		{productName}
		{productMemo}
	/>
{/if}
