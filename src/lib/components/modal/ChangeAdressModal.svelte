<script lang="ts">
	import AddressSearch from 'svelte-daum-postcode';
	import ModalButton from '$data/classes/ModalButton';
	import { ButtonColor } from '$data/enums/ButtonColor';
	import { selectAddress } from '../../../stores/order';
	import ModalDialog from './ModalDialog.svelte';
	import Table from '../table/Table.svelte';
	import Thead from '../table/Thead.svelte';
	import Th from '../table/Th.svelte';
	import Tbody from '../table/Tbody.svelte';
	import Tr from '../table/Tr.svelte';
	import Td from '../table/Td.svelte';
	import { formatPhone } from '$lib/utils/formatPhone';
	import InputText from '../input/InputText.svelte';
	import InputPhone from '../input/InputPhone.svelte';
	import TextButton from '../buttons/TextButton.svelte';
	import { onMount } from 'svelte';
	import { receive } from '$stores/inventory';
	import AddressSearchModal from './AddressSearchModal.svelte';
	export let open, addresses, address, userId;
	let searchingAddress = false;
	let selectedAddress = address;

	onMount(() => {
		if (
			!addresses.find(
				(a) => a.name === '직접입력'
			)
		) {
			addresses.push({
				address: '',
				detailAddress: '',
				id: null,
				isDefault: false,
				name: '직접입력',
				phone: '',
				receiver: '',
				zipCode: ''
			});
			addresses = addresses;
		}
	});

	async function handleSaveButtonClick() {
		address = selectedAddress;

		if (address.id === null) {
			const success = await selectAddress({
				userId: userId,
				name: address.name,
				receiver: address.receiver,
				phone: address.phone,
				address: address.address,
				detailAddress: address.detailAddress,
				zipCode: address.zipCode
			});
			if (success) {
				address.id = success.selectedAddress.id;
			}
		}
		open = false;
	}

	function searchAddress() {
		selectedAddress =
			addresses[addresses.length - 1];
		searchingAddress = true;
	}

	function handleComplete({
		detail: { data }
	}: {
		detail: {
			data: {
				address: string;
				zonecode: string;
			};
		};
	}) {
		if (searchingAddress) {
			selectedAddress.address = data.address;
			selectedAddress.zipCode = data.zonecode;
			searchingAddress = false;
		}
	}
</script>

<ModalDialog
	classes="{searchingAddress
		? 'min-w-[500px] flex justify-center items-center'
		: 'min-w-[1200px]'} "
	title="배송지 변경"
	bind:open
	buttons={searchingAddress
		? [
				new ModalButton({
					title: '취소',
					color: ButtonColor.red,
					onClick: () => {
						searchingAddress = false;
					}
				}),
				new ModalButton({
					title: '저장',
					color: ButtonColor.blue,
					onClick: () => {
						searchingAddress = false;
					}
				})
		  ]
		: [
				new ModalButton({
					title: '취소',
					color: ButtonColor.red,
					onClick: () => {
						open = false;
					}
				}),
				new ModalButton({
					title: '저장',
					color: ButtonColor.blue,
					onClick: handleSaveButtonClick
				})
		  ]}
>
	{#if searchingAddress}
		<AddressSearch on:complete={handleComplete} />
	{:else}
		<Table classes="w-full">
			<Thead>
				<Th classes="w-16">선택</Th>
				<Th classes="w-40">배송지</Th>
				<Th classes="w-24">수령인</Th>
				<Th classes="w-40">연락처</Th>
				<Th classes="w-24">우편번호</Th>
				<Th>주소</Th>
				<Th classes="w-24">상세주소</Th>
				<Th classes="w-24" />
			</Thead>
			<Tbody>
				{#each addresses as add}
					{#if add.name !== '직접입력'}
						<Tr>
							<Td>
								<div
									class="flex justify-center items-center"
								>
									<input
										type="radio"
										class="h-4 w-4"
										name="address"
										value={add}
										bind:group={selectedAddress}
									/>
								</div>
							</Td>
							<Td>
								{add.name}
							</Td>
							<Td>
								{add.receiver}
							</Td>
							<Td>
								{formatPhone(add.phone)}
							</Td>
							<Td>
								{add.zipCode}
							</Td>
							<Td>
								{add.address}
							</Td>
							<Td>
								{add.detailAddress}
							</Td>
						</Tr>
					{:else}
						<Tr>
							<Td>
								<input
									type="radio"
									class="h-4 w-4"
									name="address"
									value={add}
									bind:group={selectedAddress}
								/>
							</Td>
							<Td>
								{add.name}
							</Td>
							<Td>
								<InputText
									bind:value={add.receiver}
									classes="w-20"
								/>
							</Td>
							<Td>
								<InputPhone
									bind:phone={add.phone}
									classes="w-40"
								/>
							</Td>
							<Td>
								{add.zipCode}
							</Td>
							<Td>
								{add.address}
							</Td>
							<Td>
								<InputText
									classes="w-20"
									bind:value={add.detailAddress}
								/>
							</Td>
							<Td>
								<TextButton
									text="주소검색"
									on:click={searchAddress}
								/>
							</Td>
						</Tr>
					{/if}
				{/each}
			</Tbody>
		</Table>
	{/if}
</ModalDialog>
