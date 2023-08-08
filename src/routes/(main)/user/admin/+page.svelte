<script>
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Button from '$lib/components/Button.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import Th from '$lib/components/Th.svelte';
	import Td from '$lib/components/Td.svelte';
	import { goto } from '$app/navigation';
	import { getAdmins } from '../../../../stores/user.js';
	import { page } from '$app/stores';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import formatPhone from '../../../../utils/format_phone';

	let admins = [];
	let totalCount = 0;

	$: {
		getAdmins(
			$page.url.searchParams.get('page'),
			$page.url.searchParams.get('keyword')
		).then((result) => {
			admins = result.admins;
			totalCount = result.totalCount;
		});
	}
</script>

<nav>
	<div class="flex justify-between items-center">
		<SearchBar classes="mt-5" />
		<div class="flex">
			<Button
				classes="w-28 p-3"
				onClick={() => {
					goto('admin/edit/new');
				}}
			>
				<span>관리자 추가</span>
			</Button>
		</div>
	</div>
</nav>

<LoadingIndicator>
	<main
		class="overflow-x-scroll mt-3 rounded border bg-white"
	>
		<table class="w-full">
			<thead>
				<tr>
					<Th>아이디</Th>
					<Th>관리자명</Th>
					<Th>직책</Th>
					<Th>휴대폰</Th>
					<Th>가입일</Th>
				</tr>
			</thead>
			<tbody>
				{#each admins as admin}
					<Tr
						classes="cursor-pointer"
						onClick={() => {
							goto('admin/edit/' + admin.id);
						}}
					>
						<Td whitespaceNoWrap
							>{admin.identification}</Td
						>
						<Td whitespaceNoWrap>{admin.name}</Td>
						<Td>{admin.group ?? '-'}</Td>
						<Td whitespaceNoWrap
							>{formatPhone(admin.phone)}</Td
						>
						<Td whitespaceNoWrap
							>{new Date(
								admin.dateCreated
							).toLocaleDateString()}</Td
						>
					</Tr>
				{/each}
			</tbody>
		</table>
	</main>
	<Pagination classes="my-10" {totalCount} />
</LoadingIndicator>
