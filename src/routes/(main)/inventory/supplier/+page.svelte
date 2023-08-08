<script>
	import { getSuppliers } from '../../../../stores/inventory.js';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Th from '$lib/components/Th.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import Td from '$lib/components/Td.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import { onMount } from 'svelte';
	import { isLoading } from '../../../../stores/global_setting.js';
	import formatPhone from '../../../../utils/format_phone.js';
	import { formatBusinessRegistrationNumber } from '$lib/utils/formatBusinessRegistrationNumber';

	let suppliers = [];

	onMount(async () => {
		$isLoading = true;
		suppliers = await getSuppliers();
		$isLoading = false;
	});
</script>

<nav class="flex justify-between items-center">
	<SearchBar />
	<Button
		classes="p-3 w-20"
		onClick={() => {
			goto('supplier/edit/-1');
		}}>새 거래처</Button
	>
</nav>

<main class=" mt-5 border rounded">
	<table class="w-full">
		<thead>
			<tr>
				<Th>거래처</Th>
				<Th>매니저</Th>
				<Th>전화번호</Th>
				<Th>팩스번호</Th>
				<Th>이메일</Th>
				<Th>주소</Th>
				<Th>사업자 등록번호</Th>
			</tr>
		</thead>
		<tbody>
			<LoadingIndicator>
				{#each suppliers as supplier}
					<Tr>
						<Td>
							<Button
								classes="bg-primary border-primary text-white"
								onClick={() => {
									goto(
										'supplier/edit/' + supplier.id
									);
								}}
							>
								{supplier.name}
							</Button>
						</Td>
						<Td>{supplier.manager ?? ''}</Td>
						<Td>{formatPhone(supplier.phone)}</Td>
						<Td>{formatPhone(supplier.fax)}</Td>
						<Td>{supplier.email ?? ''}</Td>
						<Td>{supplier.address ?? ''}</Td>
						<Td>
							{formatBusinessRegistrationNumber(
								supplier.businessRegistrationNumber
							)}
						</Td>
					</Tr>
				{/each}</LoadingIndicator
			>
		</tbody>
	</table>
</main>

<div class="my-10" />
