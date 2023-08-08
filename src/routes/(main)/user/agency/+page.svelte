<script>
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Button from '$lib/components/Button.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import Th from '$lib/components/Th.svelte';
	import Td from '$lib/components/Td.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getAgencies } from '../../../../stores/user.js';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { formatBusinessRegistrationNumber } from '$lib/utils/formatBusinessRegistrationNumber';
	import formatPhone from '../../../../utils/format_phone';

	let agencies = [];

	$: dateFrom =
		$page.url.searchParams.get('dateFrom');
	$: dateTo =
		$page.url.searchParams.get('dateTo');

	let totalCount = 0;

	$: {
		getAgencies(
			$page.url.searchParams.get('page'),
			null,
			null,
			$page.url.searchParams.get('keyword'),
			20
		).then((result) => {
			agencies = result.agencies;
			totalCount = result.totalCount;
		});
	}
</script>

<nav>
	<div class="flex justify-between items-center">
		<SearchBar classes="mt-5" />
		<div class="flex">
			<Button
				classes="p-3"
				onClick={() => {
					goto('agency/edit/new');
				}}
			>
				<span>지사 추가</span>
			</Button>
			<div class="mx-2" />
		</div>
	</div>
</nav>

<LoadingIndicator>
	<main
		class="overflow-x-scroll mt-5 border rounded bg-white"
	>
		<table class="w-full">
			<thead>
				<tr>
					<Th>아이디</Th>
					<Th>지사명</Th>
					<Th>대표</Th>
					<Th>지역</Th>
					<Th>사업자등록번호</Th>
					<Th>가입일</Th>
				</tr>
			</thead>
			<tbody>
				{#each agencies as agency}
					<Tr
						classes="cursor-pointer"
						onClick={() => {
							goto('agency/edit/' + agency.id);
						}}
					>
						<Td whitespaceNoWrap
							>{agency.user.identification}</Td
						>
						<Td whitespaceNoWrap>{agency.name}</Td
						>
						<Td>{agency.user.name}</Td>
						<Td whitespaceNoWrap
							>{agency.region}</Td
						>
						<Td
							>{formatBusinessRegistrationNumber(
								agency.businessRegistrationNumber
							)}</Td
						>
						<Td whitespaceNoWrap
							>{new Date(
								agency.dateCreated
							).toLocaleDateString()}</Td
						>
					</Tr>
				{/each}
			</tbody>
		</table>
	</main>
	<Pagination {totalCount} classes="my-10" />
</LoadingIndicator>
